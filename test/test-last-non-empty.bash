#!/usr/bin/env bash
set -eu

# Checks for cases where the lst line is nono-emmpty aand does not have a newline `\n`
# i.e. input from `./fixture/short.txt`

REPOROOT=$(git rev-parse --show-toplevel)
cd $REPOROOT/test

cat ./fixture/short.txt
echo

cat ./fixture/short.txt | ../src/jrep.js '  "🌟"+x  ' || :
echo

#export ERR_EXCEPTIONS=1
export DEBUG_ARGS=1
export DEBUG_CANDLE=1

echo '>>> ------------ <<<'
echo "Lines with candles:"
cat ./fixture/short.txt | ../src/jrep.js '  "🌟"+x  ' \
  | grep "🕯"

echo "ERROR-CODE:   $?"
