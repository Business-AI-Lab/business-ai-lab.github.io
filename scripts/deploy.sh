#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH="$PWD/.runtime/ruby/bin:$PWD/.runtime/node/bin:$PATH"
export JEKYLL_ENV=production
mkdir -p deploy/releases .runtime
exec 9>.runtime/deploy.lock
flock -n 9 || { echo 'Another deployment is running'; exit 1; }
release="releases/$(date -u +%Y%m%dT%H%M%SZ)-$$"
bundle exec jekyll build --destination "$PWD/deploy/$release"
test -s "deploy/$release/index.html"
ln -s "$release" deploy/.current-next
mv -Tf deploy/.current-next deploy/current
node_modules/.bin/pm2 startOrRestart ecosystem.config.cjs --update-env
node_modules/.bin/pm2 save
curl --fail --retry 10 --retry-connrefused --retry-delay 1 http://127.0.0.1:8080/ -o /dev/null
echo 'Deployed: http://172.17.17.50:8080/'
