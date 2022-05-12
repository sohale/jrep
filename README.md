# jrep
A new generation `grep` written in node/javascript.

Very useful for bash scripting and devops works.
Very handy and extermly flexible.

Feel free to send Pull Requests.
Feel free to request features.

Docker version available

### Example Usage
* bash
```bash
  find / | \
      node -e $(curl -L https://raw.githubusercontent.com/sohale/jrep/main/src/jrep.js) \
         '/\/([^\/]*\.py)$/.exec(x)[1]'
```
 * requires NodeJS (tested on node 12) to beinstalled on your system.


* docker
No need to install Node
```bash
  find / | \
      docker run -i sohale/jrep:latest \
         '/\/([^\/]*\.py)$/.exec(x)[1]'
```

* npx
(coming soon)

* npm
```bash
npm install -g jrep
```
* yarn
```bash
yarn install -g jrep
```

### Tutorial
(comming soon)
### Also see
*  [njf (neat jsfilter)](https://github.com/sohale/snippets/blob/master/javascript/neat-jsfilter.js)
