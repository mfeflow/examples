#!/usr/bin/env bash
# Builds the shell and the remotes for production and lays them out as one static site:
# the shell at the root, each remote under <remote>/<version>/, the registry at envs/prod/index.json.
# The remotes go through `mfeflow deploy` with a file: host, so the site is a real registry.
#
#   scripts/build-pages.sh <base-url> <out-dir>
#   scripts/build-pages.sh https://mfeflow.github.io/examples site
set -euo pipefail

base_url="${1:?usage: build-pages.sh <base-url> <out-dir>}"
out="${2:?usage: build-pages.sh <base-url> <out-dir>}"
base_url="${base_url%/}"

cd "$(dirname "$0")/.."
export MFE_BASE_PATH
MFE_BASE_PATH="$(node -e 'console.log(new URL(process.argv[1]).pathname.replace(/\/$/, ""))' "$base_url")"

rm -rf "$out"
mkdir -p "$out"
out="$(cd "$out" && pwd)"

pnpm build

cp -R apps/shell/dist/. "$out"
mkdir -p "$out/envs/prod/shell"
cp apps/shell/dist/mf-manifest.json "$out/envs/prod/shell/mf-manifest.json"

for remote in catalog cart checkout; do
  pnpm exec mfeflow deploy "$remote" --env prod --host "file:$out" --base-url "$base_url" --yes
done

# Pages answers an unknown path with 404.html, so a deep link like /examples/cart loads the shell.
cp "$out/index.html" "$out/404.html"

# deploy rewrites registry/envs/prod/<remote>.json with the pages URLs; keep the committed ones.
git checkout -- registry 2>/dev/null || true
