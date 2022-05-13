#!/usr/bin/env node

const fs = require("fs"), util = require("util");
const ERR_EXCEPTIONS = process.env['ERR_EXCEPTIONS'], DEBUG_ARGS = process.env['DEBUG_ARGS'];

const [_,__,...maps] = process.argv;
const mapsf = maps.map( exprStr => (x => eval('x=>('+exprStr+')')(x) ) );
/* ... ∘ mapsf[1] ∘ mapsf[0] ∘ (x) */
const rec = (x, mapsf) => (mapsf.length===0)?x : rec(mapsf[0](x), mapsf.slice(1))

const skipException = (x,f) => {try{return f(x);}catch(e){ERR_EXCEPTIONS && console.error(e); return null;}};
const transfline = x => skipException(x, x=>rec(x,mapsf));

const transffile = inpstr => inpstr.split('\n').map(transfline).filter(x=>x!==null).join('\n');
const read_from_stdin = () => fs.readFileSync(0).toString();
console.log(transffile(read_from_stdin()));

DEBUG_ARGS && console.error('x=>'+maps);

/*
forked from https://github.com/sohale/snippets/blob/master/javascript/neat-filter-obfuscated.js
forked from https://github.com/sohale/snippets/blob/master/javascript/neat-jsfilter.js
*/
