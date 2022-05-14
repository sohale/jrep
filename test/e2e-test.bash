#!/usr/bin/env bash
set -eu
#set -eux # debug

function prerequisites () {
    # To avoid runing from other places to avoid unintended consequences
    REPOROOT=$(git rev-parse --show-toplevel)
    # Makke sure this is not empty
    ERRMSG1="Error. Run this from root of the 'jrep' repo only"
    echo $REPOROOT |grep -e 'jrep$' || { echo "$ERRMSG1 (1)"; exit; }
    if [ "x$REPOROOT" != "x$(pwd)" ]; then
      diff <(echo "$REPOROOT") <(echo "$(pwd)")
      echo "$ERRMSG1 (2)"
      exit
    fi
    test $REPOROOT/.git
}

prerequisites


rm -rf $REPOROOT/e2e-temp
mkdir "$REPOROOT/e2e-temp"
git clone https://github.com/sohale/jrep.git "$REPOROOT/e2e-temp/jrep"

cd "$REPOROOT/e2e-temp/jrep"
ls -alt
ls -alt test
./test/test-bash-target.bash

EXTRACT_BASENAME='/([^\/]*)$/.exec(x)[1]'
find / | jrep $EXTRACT_BASENAME | head
