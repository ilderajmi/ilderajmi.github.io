+++
date = '2026-04-06T09:05:00+08:00'
draft = false
pageLang = 'en'
title = 'Stop Mixing Up Agent Frameworks: 6 Harness / Runtime Paths, Explained'
description = 'A source-backed map of Microsoft Agent Framework, OpenHarness, Goose, oh-my-codex, compound-engineering-plugin, and claw-code, plus a practical guide to when each one makes sense.'
tags = ['AI Agents', 'Developer Tools', 'Harness', 'Runtime']

[[alternates]]
  lang = 'en'
  url = '/posts/6-layers-of-harness-en/'
[[alternates]]
  lang = 'zh-CN'
  url = '/posts/6-layers-of-harness-zh/'
[[alternates]]
  lang = 'x-default'
  url = '/posts/6-layers-of-harness-en/'
+++

The biggest mistake in agent land is not picking the wrong model. It is comparing tools that sit at completely different layers.

Some projects are enterprise frameworks. Some are composable harness SDKs. Some are productized runtimes you can use today. Some wrap Codex CLI with a workflow layer. Some turn prompts and roles into reusable assets. Some are reference implementations that show how the harness itself can be engineered.

One important note: this 6-layer map is my editorial synthesis, not a formal public standard. Each layer is grounded in public docs and repos, but the taxonomy itself is mine.

中文版: [别再把 Agent 框架混为一谈：6 种 Harness / Runtime 路线，一次看懂](/posts/6-layers-of-harness-zh/)

## The six layers at a glance

- `Microsoft Agent Framework`: an enterprise agent application framework focused on orchestration, state, workflows, and governance.
- `OpenHarness`: a code-first, composable harness SDK that exposes the primitives instead of hiding them.
- `Goose`: an extensible open source AI agent that is ready to use, with a local-first/productized feel.
- `oh-my-codex / OMX`: a workflow layer around Codex CLI that turns execution into a repeatable process.
- `compound-engineering-plugin`: a skills / plugin asset layer meant to turn team knowledge into reusable capability.
- `claw-code`: closer to a harness reference implementation than a demo, showing how the harness can be made real in a repository.

## What each layer represents today

### 1. Microsoft Agent Framework

This is the “treat agents like a real application” approach.

The public docs emphasize agents, workflows, state management, middleware, MCP, and integrations. That tells you where the framework lives: not at the model layer, but above it, where orchestration and governance start to matter.

If you are building for an enterprise environment, with multi-agent coordination, clear boundaries, and auditability requirements, this is the layer you start with.

### 2. OpenHarness

OpenHarness takes the opposite stance from a black-box runtime: it breaks the harness into composable primitives.

Its public docs focus on stateless agents, sessions, middleware, subagents, permissions, MCP, skills, and AGENTS.md injection. The point is not to finish the product for you. The point is to give you the pieces so you can build the harness your team actually wants.

If you want control over the execution model instead of inheriting someone else’s product opinion, this is the right kind of layer.

### 3. Goose

Goose represents the “make it useful first” path.

The official project describes it as an extensible open source AI agent that can run as a desktop app or CLI, work with any LLM, and integrate with MCP. It is the sort of thing you can install and put to work without inventing a platform strategy first.

If your priority is shipping quickly, staying local-first, and having something extensible on day one, Goose is the pragmatic choice.

### 4. oh-my-codex / OMX

OMX is not trying to replace Codex CLI. It sits on top of it and gives it a shape.

The workflow is the point: `$deep-interview`, `$plan`, `$team`, `$ralph`, plus durable state under `.omx/`. That makes Codex feel less like a powerful command runner and more like a repeatable development system.

If you already live inside Codex CLI, OMX is the layer that makes day-to-day use less ad hoc and more structured.

### 5. compound-engineering-plugin

This layer is about compounding.

Teams build agents fast, then discover they keep recreating the same prompts, roles, review steps, and commands. A plugin / skills layer turns those repeated patterns into assets. That is the whole game: less one-off prompting, more reusable engineering memory.

Every’s compound engineering material makes the same bet explicit: spend most of the time in planning and review, and let execution be the small final step.

### 6. claw-code

Claw-code is interesting because it makes the harness visible.

Its docs describe a Python rewrite of Claude Code’s agent harness runtime, with tool routing, session management, command orchestration, and parity auditing. That is why it matters. It is not just a flashy repo. It is a concrete example of how a harness can be reconstructed, inspected, and evolved.

When a team lacks a reference implementation, this kind of project is often more useful than another abstract framework diagram.

## How to choose

Do not start by asking which one is “best.” Start with your starting point.

- If you need an enterprise-grade application framework, start with `Microsoft Agent Framework`.
- If you want to build your own harness primitives, start with `OpenHarness`.
- If you want something local-first, extensible, and ready to use, start with `Goose`.
- If you already work in Codex CLI and want a workflow wrapper, start with `OMX`.
- If you need reusable team knowledge in the form of prompts, roles, commands, and skills, start with `compound-engineering-plugin`.
- If you want a repository that shows the harness as an engineered system, start with `claw-code`.

Most real projects will stack these layers instead of choosing only one.

- The framework defines boundaries.
- The harness SDK gives you primitives.
- The workflow layer keeps the process sane.
- The skills / plugin layer captures learning.
- The reference implementation keeps the whole thing honest.

That is what harness engineering looks like when it is not reduced to buzzwords.

## References

### Official sources

- [OpenAI: Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
- [Microsoft Learn: Microsoft Agent Framework overview](https://learn.microsoft.com/en-us/agent-framework/overview/)
- [GitHub: microsoft/agent-framework](https://github.com/microsoft/agent-framework)
- [OpenHarness homepage](https://www.open-harness.dev/)
- [OpenHarness docs](https://docs.open-harness.dev/)
- [GitHub: MaxGfeller/open-harness](https://github.com/MaxGfeller/open-harness)
- [Goose homepage](https://block.github.io/goose/)
- [Goose quickstart](https://block.github.io/goose/docs/quickstart/)
- [GitHub: block/goose](https://github.com/block/goose)
- [oh-my-codex homepage](https://yeachan-heo.github.io/oh-my-codex-website/)
- [GitHub: Yeachan-Heo/oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex)
- [GitHub: EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)
- [GitHub: ultraworkers/claw-code](https://github.com/ultraworkers/claw-code)
- [Claw Code docs introduction](https://www.mintlify.com/instructkr/claw-code/introduction)

### Related reporting / deep dives

- [Every: Compound Engineering Camp: Every Step, From Scratch](https://every.to/source-code/compound-engineering-camp-every-step-from-scratch)
- [Block: Introducing codename goose](https://block.github.io/goose/blog/2025/01/28/introducing-codename-goose)
- [Block: How We Use goose to Maintain goose](https://block.github.io/goose/blog/2025/12/28/goose-maintains-goose/)
- [Repo Explainer: instructkr/claw-code](https://repo-explainer.com/instructkr/claw-code/)
