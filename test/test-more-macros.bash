#!/usr/bin/env bash
set -eu

# Checks for cases where the lst line is nono-emmpty aand does not have a newline `\n`
# i.e. input from `./fixture/short.txt`

REPOROOT=$(git rev-parse --show-toplevel)
cd $REPOROOT/test
echo "File contents:"
cat ./fixture/short.txt
echo

echo
cat ./fixture/short.txt | \
    ../src/jrep.js '  "ð"+x  ' \
    || :

echo
echo "ð§© RER macro should work:"

echo 'abcpython123-xyzpytho000'| \
   jrep 'RER("(.*)python(.*)", "p[1]+\"ðð\"+p[2]")'
echo
# abcðð123-xyzpytho000

echo "ð§© RER macro should work (not if repeated?):"
echo 'abcpython123-xyzpython000'| \
   jrep 'RER("(.*)python(.*)", "p[1]+\"ðð\"+p[2]")'
echo
# abcpython123-xyzðð000
# todo: check against expeted output


# todo: test for `RE1` Macro

echo "ERROR-CODE:   $?"
