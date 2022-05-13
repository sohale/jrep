#!/usr/bin/env node
// ------- built-in primitives -------
const RE1 = reStr => ( x => new RegExp(reStr).exec(x)[1]);
const RER = (reStr, replcCodeStr) => ( x => {
  let p = new RegExp(reStr).exec(x)
  p = [...p];
  p = [null, ...(p.slice(1))];
  return eval('(x,p)=>('+replcCodeStr+')')(x,p);
});
// -----------------------------------
const eval1 = (x,exprStr) => eval('x=>('+exprStr+')')(x);
const eval1NoX = (exprStr) => eval('('+exprStr+')'); // If it's a function (eg a primitive), don't give it x as input
const eval2 = (x,exprStr)=>{const valOrFunc = eval1(x,exprStr); return (typeof valOrFunc==='function')? eval1NoX(exprStr)(x) /*valOrFunc(x)*/ : valOrFunc};
const fs = require("fs"), util = require("util");
const ERR_EXCEPTIONS = process.env['ERR_EXCEPTIONS'], DEBUG_ARGS = process.env['DEBUG_ARGS'];

const [_,__,...maps] = process.argv;
const mapsf = maps.map( exprStr => (x => eval2(x,exprStr) ) );
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
