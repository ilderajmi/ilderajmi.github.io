#!/usr/bin/env bash
set -euo pipefail

# Notify search engines after a successful deploy.
# Note: Google deprecated the old /ping endpoint, so this script uses
# Search Console's sitemaps.submit API when credentials are provided.

SITEMAP_URL="${SITEMAP_URL:-}"
GSC_SITE_URL="${GSC_SITE_URL:-}"
GSC_SITEMAP_URL="${GSC_SITEMAP_URL:-${SITEMAP_URL}}"
GSC_ACCESS_TOKEN="${GSC_ACCESS_TOKEN:-}"
DRY_RUN="${DRY_RUN:-false}"

if [[ -z "$SITEMAP_URL" ]]; then
  echo "ERROR: SITEMAP_URL is required."
  exit 1
fi

url_encode() {
  python3 - "$1" <<'PY'
import sys
from urllib.parse import quote
print(quote(sys.argv[1], safe=""))
PY
}

run_or_echo() {
  if [[ "$DRY_RUN" == "true" ]]; then
    echo "[DRY_RUN] $*"
    return 0
  fi
  "$@"
}

notify_bing() {
  local encoded_sitemap
  encoded_sitemap="$(url_encode "$SITEMAP_URL")"
  local endpoint="https://www.bing.com/ping?sitemap=${encoded_sitemap}"

  echo "Notify Bing: $SITEMAP_URL"
  run_or_echo curl -fsS "$endpoint" >/dev/null
  echo "Bing sitemap ping sent."
}

notify_google_gsc() {
  if [[ -z "$GSC_ACCESS_TOKEN" || -z "$GSC_SITE_URL" ]]; then
    echo "Skip Google Search Console submit: missing GSC_ACCESS_TOKEN or GSC_SITE_URL."
    return 0
  fi

  local encoded_site encoded_sitemap endpoint
  encoded_site="$(url_encode "$GSC_SITE_URL")"
  encoded_sitemap="$(url_encode "$GSC_SITEMAP_URL")"
  endpoint="https://www.googleapis.com/webmasters/v3/sites/${encoded_site}/sitemaps/${encoded_sitemap}"

  echo "Submit sitemap to Google Search Console API: $GSC_SITEMAP_URL"
  run_or_echo curl -fsS -X PUT "$endpoint" \
    -H "Authorization: Bearer ${GSC_ACCESS_TOKEN}" \
    -H "Content-Length: 0" >/dev/null
  echo "Google sitemap submit sent."
}

notify_bing
notify_google_gsc

echo "Search engine notifications completed."
