#!/usr/bin/env bash
set -eu
# Sitemaps are already registered. Search engines periodically refetch them.
# The retired Bing ping endpoint and short-lived GSC token are not used.
printf '%s\n' 'No notification required: registered sitemap is https://blog.paymond.me/sitemap.xml'
