#!/usr/bin/env bash
set -eu

find ./src | \
    node -e "$(curl -L https://raw.githubusercontent.com/sohale/jrep/main/src/jrep.js)" \
       - \
       '/\/([^\/]*\.js)$/.exec(x)[1]'
