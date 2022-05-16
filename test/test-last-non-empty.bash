#!/usr/bin/env bash
set -eu

# Checks for cases where the lst line is nono-emmpty aand does not have a newline `\n`
# i.e. input from `./fixture/short.txt`

REPOROOT=$(git rev-parse --show-toplevel)
cd $REPOROOT/test
echo "File contents:"
cat ./fixture/short.txt
echo

echo "🧩 Should run without error (sanity test):"
cat ./fixture/short.txt | ../src/jrep.js '  "🌟"+x  ' || :
echo

echo "🧩 Should not lose last line's content `lastline`:"
cat ./fixture/short.txt | ../src/jrep.js ' x  ' \
  | grep "lastline"

#export ERR_EXCEPTIONS=1
export DEBUG_ARGS=1
export DEBUG_CANDLE=1

echo "🧩 Should: Lines with candles should be there"
cat ./fixture/short.txt | ../src/jrep.js '  "🌟"+x  ' \
  | grep "🕯"

echo "ERROR-CODE:   $?"
