'use strict';


// This file is used instead of commandline agruments:
// `NODE_ENV=test nyc ./node_modules/mocha/bin/mocha **/*.spec.js --recursive --exit`


module.exports = {
  'spec': ["**/*.spec.js"],
  'ignore': ['node_modules/**'],
  'exit': true,         // fail incomplete
  'recursive': false,
  'parallel': true,
  'check-leaks': true, // useful
  'fail-zero': true,
  'diff': true,
}
