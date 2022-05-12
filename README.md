# jrep
A new generation `grep` written in node/javascript.

Docker version available

Usages:
* bash
```bash
  find / | \
      node -e (curl -L https://github.com/sohale/jrep/blob/main/src/jrep.js) \
         '/\/([^\/]*\.py)$/.exec(x)[1]'
```
 * requires Node (tested on node 12)

* npx
(coming soon)

* docker
```bash
  find / | \
      docker run -i sohale/jrep:latest \
         '/\/([^\/]*\.py)$/.exec(x)[1]'
```

Also see:
*  [njf (neat jsfilter)](https://github.com/sohale/snippets/blob/master/javascript/neat-jsfilter.js)
