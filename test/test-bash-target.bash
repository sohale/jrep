#!/usr/bin/env bash
set -eux

export ERR_EXCEPTIONS=1
export DEBUG_ARGS=1

find ./src | \
    node -e "$(curl -L https://raw.githubusercontent.com/sohale/jrep/main/src/jrep.js | tail -n +2)" \
       - \
       '/\/([^\/]*\.js)$/.exec(x)[1]'
