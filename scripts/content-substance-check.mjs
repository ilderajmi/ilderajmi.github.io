#!/usr/bin/env node
// 内容实质门槛：一手来源数、具体事实数、带数字表格、违禁写法。
// 对应 docs/editorial/blog-pilot-20260922/roadmap.md 的「选题与证据门槛」硬门槛。
// 发布日期不早于门槛日（默认 2026-09-26）的稿件按硬门槛判定；更早的稿件只报告，不判定。
//
// 用法：
//   node scripts/content-substance-check.mjs
//   node scripts/content-substance-check.mjs --since 2026-09-26 --json
//   node scripts/content-substance-check.mjs content/posts/some-post.md
//
// 参数（--name value 与 --name=value 都支持）：
//   --since <YYYY-MM-DD>        判定起始日，默认 2026-09-26
//   --min-sources <n>           一手外链下限，默认 6
//   --min-official <n>          官方来源下限，默认 1
//   --min-facts <n>             具体事实下限，默认 5
//   --min-numeric-tables <n>    带数字表格下限，默认 1
//   --json                      输出 JSON
//   位置参数                    只检查指定文件，缺省检查 content/posts 全部
//
// 退出码：0 通过；1 有 enforced 且不合格的稿件；2 读取文件失败。
//
// 本脚本只判可计数的下限。结构与判断质量由白班评分负责，不能由本脚本代替。

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const VALUE_FLAGS = new Set([
  "since",
  "min-sources",
  "min-official",
  "min-facts",
  "min-numeric-tables",
]);
const flags = new Map();
const targets = [];
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i += 1) {
  const arg = argv[i];
  if (!arg.startsWith("--")) {
    targets.push(arg);
    continue;
  }
  const eq = arg.indexOf("=");
  if (eq !== -1) {
    flags.set(arg.slice(2, eq), arg.slice(eq + 1));
    continue;
  }
  const name = arg.slice(2);
  const next = argv[i + 1];
  if (VALUE_FLAGS.has(name) && next !== undefined && !next.startsWith("--")) {
    flags.set(name, next);
    i += 1;
  } else {
    flags.set(name, "true");
  }
}

const since = flags.get("since") ?? "2026-09-26";
const asJson = flags.get("json") === "true";
const thresholds = {
  sources: Number(flags.get("min-sources") ?? 6),
  official: Number(flags.get("min-official") ?? 1),
  facts: Number(flags.get("min-facts") ?? 5),
  numericTables: Number(flags.get("min-numeric-tables") ?? 1),
};

// 内部站点不计入"一手外链"。
const INTERNAL_HOST = /(^|[.])paymond[.]me$/i;
// 卡组织、发卡/收单机构与支付服务商的官方文档。
const OFFICIAL_HOST =
  /(^|[.])((usa|corporate)[.]visa[.]com|visa[.]com|mastercard[.]com|mastercard[.]us|ethoca[.]com|stripe[.]com|paypal[.]com|americanexpress[.]com|discover[.]com)$/i;

const TICK = String.fromCharCode(96);
const FACT_PATTERNS = [
  /[0-9]{1,2} *月 *[0-9]{1,2} *日/g,
  /[0-9]{4}-[0-9]{2}-[0-9]{2}/g,
  /[0-9][0-9,.]* *(USD|美元)/g,
  /[0-9][0-9,.]* *%/g,
  /[0-9][0-9,.]* *(个工作日|工作日|天|小时|分钟|周|个月)/g,
  /TC[0-9]{2}/g,
  /CE ?[0-9]([.][0-9])?/g,
  /Condition ?[0-9]+[.][0-9]+/g,
  /VAMP|RDR|CDRN|SAFE|ARN|AVS|MOTO|3DS/g,
  new RegExp(TICK + "[^" + TICK + "]{2,40}" + TICK, "g"),
];

const BANNED = [
  { id: "kicker", re: /检查点/g, msg: "重复引导词：检查点" },
  {
    id: "selfreflexive-closer",
    re: /今天可以只做一件事|今天可以只做第一步/g,
    msg: "自省式收尾（要求读者反思而不是产出）",
  },
  {
    id: "boilerplate-disclaimer",
    re: /是本文的编辑建议|不是厂商规定|不构成任何模型的排名/g,
    msg: "固定免责段（限制应就近写在主张旁边）",
  },
  {
    id: "numbered-heading",
    re: /^## +[0-9]{1,2}[ .、．]/gm,
    msg: "编号小标题（## 01 / ## 02）",
  },
  { id: "bold-kicker", re: /[*][*]注意[*][*]/gm, msg: "重复引导词：注意" },
];

// 裸名词式分类型标题，例如"三类任务""5 个问题""四层结构"。
const TITLE_TYPE_PATTERN =
  /([0-9]|[一二三四五六七八九十]) *(个|类|种|层|条)(问题|任务|活动|类型|信号|方法|步骤|环节|要素|做法)/;

function splitFrontMatter(raw) {
  const lines = raw.split("\n");
  const fence = lines[0].trim();
  if (fence !== "+++" && fence !== "---") return { fm: "", body: raw };
  let end = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === fence) {
      end = i;
      break;
    }
  }
  if (end === -1) return { fm: "", body: raw };
  return { fm: lines.slice(1, end).join("\n"), body: lines.slice(end + 1).join("\n") };
}

function fmValue(fm, key) {
  const m = new RegExp("^" + key + " *(?:=|:) *(.*)$", "m").exec(fm);
  if (!m) return "";
  return m[1].trim().replace(/^['"]|['"]$/g, "");
}

function collectLinks(body) {
  const found = new Set();
  const re = /https?:[^ )"'>]+/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    found.add(m[0].replace(/[.,，。)）]+$/, ""));
  }
  return [...found];
}

function hostOf(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

function countFacts(body) {
  const facts = new Set();
  for (const re of FACT_PATTERNS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(body)) !== null) facts.add(m[0].trim());
  }
  return facts;
}

function countNumericTables(body) {
  const lines = body.split("\n");
  let count = 0;
  let i = 0;
  while (i < lines.length) {
    if (!lines[i].trimStart().startsWith("|")) {
      i += 1;
      continue;
    }
    const block = [];
    while (i < lines.length && lines[i].trimStart().startsWith("|")) {
      block.push(lines[i]);
      i += 1;
    }
    if (block.length < 3) continue;
    const hasSeparator = block.some((line) => /^[|][ :|-]+[|]$/.test(line.trim()));
    if (!hasSeparator) continue;
    const dataRows = block.filter((line) => !/^[|][ :|-]+[|]$/.test(line.trim()));
    if (dataRows.some((line) => /[0-9]/.test(line))) count += 1;
  }
  return count;
}

function checkBanned(raw, body, title) {
  const hits = [];
  for (const rule of BANNED) {
    rule.re.lastIndex = 0;
    const m = rule.re.exec(body);
    if (m) {
      const line = body.slice(0, m.index).split("\n").length;
      hits.push({ id: rule.id, message: rule.msg, line });
    }
  }
  if (TITLE_TYPE_PATTERN.test(title)) {
    hits.push({ id: "listicle-title", message: "分类式标题：" + title, line: 0 });
  }
  return hits;
}

async function listTargets() {
  if (targets.length > 0) return targets.map((t) => path.resolve(root, t));
  const dir = path.join(root, "content", "posts");
  const entries = await readdir(dir);
  return entries
    .filter((name) => name.endsWith(".md") && name !== "_index.md")
    .sort()
    .map((name) => path.join(dir, name));
}

const results = [];

for (const file of await listTargets()) {
  let raw;
  try {
    raw = await readFile(file, "utf8");
  } catch (err) {
    const code = err && err.code ? err.code : String(err);
    process.stderr.write("无法读取文件：" + path.relative(root, file) + "（" + code + "）\n");
    process.exit(2);
  }
  const { fm, body } = splitFrontMatter(raw);
  const date = fmValue(fm, "date").slice(0, 10);
  const title = fmValue(fm, "title");
  const enforced = date >= since;

  const links = collectLinks(body);
  const external = links.filter((url) => !INTERNAL_HOST.test(hostOf(url)));
  const official = external.filter((url) => OFFICIAL_HOST.test(hostOf(url)));
  const facts = countFacts(body);
  const numericTables = countNumericTables(body);
  const banned = checkBanned(raw, body, title);

  const violations = [];
  if (external.length < thresholds.sources) {
    violations.push("一手外链 " + external.length + " < " + thresholds.sources);
  }
  if (official.length < thresholds.official) {
    violations.push("官方来源 " + official.length + " < " + thresholds.official);
  }
  if (facts.size < thresholds.facts) {
    violations.push("具体事实 " + facts.size + " < " + thresholds.facts);
  }
  if (numericTables < thresholds.numericTables) {
    violations.push("带数字表格 " + numericTables + " < " + thresholds.numericTables);
  }
  for (const hit of banned) {
    violations.push("违禁写法 " + hit.id + "：" + hit.message);
  }

  const warnings = [];
  if (/假设场景|合成|synthetic/.test(body) && facts.size < 8) {
    warnings.push("稿件以假设或合成材料为主，具体事实仅 " + facts.size + " 条，考虑补一手事实");
  }
  if (!date) warnings.push("无法从 front matter 读到 date，按 report-only 处理");

  results.push({
    file: path.relative(root, file),
    date: date || "unknown",
    enforced,
    metrics: {
      externalSources: external.length,
      officialSources: official.length,
      facts: facts.size,
      numericTables,
    },
    violations,
    warnings,
  });
}

if (asJson) {
  process.stdout.write(JSON.stringify({ since, thresholds, results }, null, 2) + "\n");
} else {
  const lines = ["内容实质门槛：since " + since];
  for (const r of results) {
    lines.push("");
    lines.push(r.file + "  " + r.date + "  [" + (r.enforced ? "enforced" : "report-only") + "]");
    lines.push(
      "  一手外链 " +
        r.metrics.externalSources +
        "/" +
        thresholds.sources +
        "  官方来源 " +
        r.metrics.officialSources +
        "/" +
        thresholds.official +
        "  具体事实 " +
        r.metrics.facts +
        "/" +
        thresholds.facts +
        "  带数字表格 " +
        r.metrics.numericTables +
        "/" +
        thresholds.numericTables,
    );
    for (const v of r.violations) lines.push("  × " + v);
    for (const w of r.warnings) lines.push("  ! " + w);
  }
  const failing = results.filter((r) => r.enforced && r.violations.length > 0);
  lines.push("");
  lines.push(
    failing.length === 0
      ? "内容实质门槛通过（判定 " +
        results.filter((r) => r.enforced).length +
        " 篇，报告 " +
        results.filter((r) => !r.enforced).length +
        " 篇）。"
      : "内容实质门槛未通过：" + failing.map((r) => r.file).join("、"),
  );
  lines.push("本脚本只判可计数的下限；结构与判断质量仍由白班评分负责。");
  process.stdout.write(lines.join("\n") + "\n");
}

process.exit(results.some((r) => r.enforced && r.violations.length > 0) ? 1 : 0);
