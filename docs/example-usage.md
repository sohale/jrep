
Usage: jrep.js  <filter1>  <filter2> ...

* Each <filter> is a map, (a string transformation), a javascript function with arg `x`..
* The <filter>s are applied sequentially on each line in the piped content.
* In case of exception in any of the <filter>s, that line is removed.


```bash
cat s1-log.log  |  node jrep.js  '11+x' 'x+55'

cat s1-log.log   |   node jrep.js     '/"GET \/new-registry\/(.*)" "/.exec(x)[1]'

cat s1-log.log | \
    node jrep.js \
        '/"GET \/new-registry\/(.*)" "/.exec(x)[1]' | \
            xargs -n 1 -I {}  \
               bash -c "download0 {}"
```
