# jrep
[![Version](https://img.shields.io/npm/v/jrep1.svg)](https://npmjs.org/package/jrep)
[![CircleCI](https://circleci.com/gh/sohale/jrep/tree/main.svg?style=shield)](https://circleci.com/gh/sohale/jrep/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/jrep.svg)](https://www.npmjs.com/package/jrep1)
[![License](https://img.shields.io/npm/l/jrep1.svg)](https://github.com/sohale/jrep/blob/main/package.json)

A new generation `grep` written in node/javascript.

Very useful for bash scripting and devops works.
Very handy and extermly flexible.

Usage: `jrep.js  <filter1>  <filter2> ...`

* Each <filter> is a map, (a string transformation), is the body of a **javascript** function with arg `x`..
* The <filter>s are applied sequentially on each line in the piped content.
* In case of exception in any of the <filter>s, that line is removed.

**Find jrep1 on npm: [jrep1](https://www.npmjs.com/package/jrep1)**
## 🤝
* 👋 Feel free to send Pull Requests.
* 👋 Feel free to request features.

#### Pros
* 👍 transform (map) text in linux pipes
* 👍 filter text in linux pipes
* 👍 concise
* 👍 versatile
* 👍 exteremly flexible
* 👍 customisable
* 👍 prebuilt primitive operations
* 👍 Super lightweight
* 👍 Zero npm dependencies
* 👍 Docker version available
#### Cons
* 👎 Needs `node` installed on the system. 👍 If you don't want to install node, an alternative is to use `docker`.
#### requirements
* NodeJS (tested on node 12)



## Installation

* npm
```bash
npm i -g jrep1
# test:
uname -a | jrep 'x.replace("a", "O")'
```


* MacOS , Linux
```bash
  git clone https://github.com/sohale/jrep.git
  ./jrep/scripts/install-macos.bash
```
### Development
[docs/internals.md](docs/internals.md)
## Example Usage
Also see [test/e2e-test.bash](test/e2e-test.bash)

* bash (on the fly)
```bash
  find .. | \
      node -e "$(curl -L https://raw.githubusercontent.com/sohale/jrep/main/src/jrep.js)" '' \
         '/\/([^\/]*\.py)$/.exec(x)[1]'
```
 * requires NodeJS (tested on node 12) to be installed on your system.


* docker
No need to install Node
```bash
  find / | \
      docker run -i sohale/jrep:latest \
         '/\/([^\/]*\.py)$/.exec(x)[1]'
```

* npx
```bash
uname -a | npx jrep 'x.replace("a", "O")'
```

* npm [jrep1 on npm](https://www.npmjs.com/package/jrep1)
```bash
npm install -g jrep
```
* yarn
```bash
yarn install -g jrep
```

## Tutorial
(comming soon)
