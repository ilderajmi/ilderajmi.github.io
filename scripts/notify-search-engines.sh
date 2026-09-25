#!/usr/bin/env bash
set -eu

# Submits the canonical URLs on the live sitemap to IndexNow, which reaches
# Bing, Yandex, and the IndexNow partners. Google has no equivalent public
# endpoint: the Indexing API accepts only JobPosting and BroadcastEvent, so
# Google indexation still goes through Search Console.
#
# The key file in static/ proves host ownership and must already be live, and
# the URL list comes from the live sitemap so a submission cannot drift from
# what the site actually serves.

SITE_URL="${INDEXNOW_SITE_URL:-https://blog.paymond.me}"
KEY_FILE="d8a6785503567adc74e629ce73bf3768.txt"
KEY="${KEY_FILE%.txt}"
KEY_LOCATION="${SITE_URL}/${KEY_FILE}"

live_key="$(curl -fsS --max-time 30 "$KEY_LOCATION" 2>/dev/null || true)"
if [ "$live_key" != "$KEY" ]; then
  printf '%s\n' "IndexNow skipped: ${KEY_LOCATION} did not return the key" >&2
  exit 1
fi

sitemap="$(curl -fsS --max-time 30 "${SITE_URL}/sitemap.xml")"
urls="$(printf '%s' "$sitemap" | grep -o '<loc>[^<]*</loc>' | sed -e 's|<loc>||' -e 's|</loc>||' | grep "^${SITE_URL}/" || true)"
count="$(printf '%s\n' "$urls" | grep -c . || true)"
if [ "$count" -eq 0 ]; then
  printf '%s\n' "IndexNow skipped: no canonical URLs on ${SITE_URL} in the sitemap" >&2
  exit 1
fi

payload="$(SITE_URL="$SITE_URL" KEY="$KEY" KEY_LOCATION="$KEY_LOCATION" URLS="$urls" node -e '
const urls = process.env.URLS.split("\n").map((s) => s.trim()).filter(Boolean);
process.stdout.write(JSON.stringify({
  host: new URL(process.env.SITE_URL).host,
  key: process.env.KEY,
  keyLocation: process.env.KEY_LOCATION,
  urlList: urls,
}));
')"

response="$(mktemp)"
status="$(curl -sS -o "$response" -w '%{http_code}' --max-time 30 \
  -H 'content-type: application/json; charset=utf-8' \
  -X POST --data-binary "$payload" https://api.indexnow.org/indexnow)"

case "$status" in
  200|202) printf '%s\n' "IndexNow accepted ${count} canonical URLs from ${SITE_URL}" ;;
  *) printf '%s\n' "IndexNow failed with status ${status}: $(cat "$response")" >&2; exit 1 ;;
esac
