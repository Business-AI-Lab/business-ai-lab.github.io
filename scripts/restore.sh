#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH="$PWD/.runtime/node/bin:$PATH"
export PM2_HOME="$HOME/.pm2"
exec "$PWD/node_modules/.bin/pm2" resurrect
