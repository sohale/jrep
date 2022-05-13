#!/usr/bin/env bash
set -eux

echo "Publishes on https://www.npmjs.com/package/jrep1"

# check if logged in, if not, log in
npm whoami || npm login

npm publish
