#!/usr/bin/env node

// ------- built-in primitives -------
/* Usage: ... */
const RE1 = reStr => ( x => new RegExp(reStr).exec(x)[1]);
/* Usage: ... p1, p2, ... in the replaced string corespond to parenthesses in thethe RE */
const RER = (reStr, replcCodeStr) => ( x => {
  let p = new RegExp(reStr).exec(x)
  p = [...p];
  p = [null, ...(p.slice(1))];
  // return eval('(x,p)=>('+replcCodeStr+')')(x,p);
  return safeEvalXP(x,p,replcCodeStr);
});
// -----------------------------------
const vm = require('node:vm');
const contextObject = { x: null };
vm.createContext(contextObject);
function safeEvalX(x, exprStr) {
    contextObject.x = x;
    return vm.runInContext('(x=>('+exprStr+'))(x)', contextObject);
    // also can set other variables as to retain info between input lines.
}
function safeEvalFunc(x, lambdaExprStr) {
    contextObject.x = x;
    return vm.runInContext('('+lambdaExprStr+'))', contextObject);
}
function safeEvalXP(x, p, replcCodeStr) {
    contextObject.x = x;
    contextObject.p = p;
    return vm.runInContext('((x,p)=>('+replcCodeStr+'))(x,p)', contextObject);
    // return evalXP(x,p,replcCodeStr);
    // should behave like: return eval('(x,p)=>('+replcCodeStr+')')(x,p);
}
// const eval1 = (x,exprStr) => eval('x=>('+exprStr+')')(x);
const eval1 = (x, exprStr) => safeEvalX(x, exprStr);
/* eval1NoX:  // Returns a function / lambda (eg a primitive), don't give it x as input. Called as: `eval1NoX(exprStr)(x)` */
// const eval1NoX = (exprStr) => eval('('+exprStr+')');
const eval1NoX = (lambdaExprStr) => safeEvalFunc('('+lambdaExprStr+')');

const eval2 = (x,exprStr)=>{const valOrFunc = eval1(x,exprStr); return (typeof valOrFunc==='function')? eval1NoX(exprStr)(x) /*valOrFunc(x)*/ : valOrFunc};
const fs = require("fs"), util = require("util");
const ERR_EXCEPTIONS = process.env['ERR_EXCEPTIONS'], DEBUG_ARGS = process.env['DEBUG_ARGS'];
const DEBUG_CANDLE = process.env['DEBUG_CANDLE'];

const [_,__,...maps] = process.argv;
const mapsf = maps.map( exprStr => (x => eval2(x,exprStr) ) );
/* ... ∘ mapsf[1] ∘ mapsf[0] ∘ (x) */
const rec = (x, mapsf) => (mapsf.length===0)?x : rec(mapsf[0](x), mapsf.slice(1))

const skipException = (x,f) => {try{return f(x);}catch(e){ERR_EXCEPTIONS && console.error(e); return null;}};
const transfline = x => skipException(x, x=>rec(x,mapsf));
/*
const transffile = inpstr => inpstr.split('\n').map(transfline).filter(x=>x!==null).join('\n');
const read_from_stdin = () => fs.readFileSync(0).toString();
console.log(transffile(read_from_stdin()));
*/
// const transmid = map(transfline).filter(x=>x!==null)
DEBUG_ARGS && console.error('x=>'+maps);

const assert = cond => {if(!cond) {
  throw new Error('assertion failed');
}}
const _lastNum = arr => Number(arr.slice(-1));
const _lastNum0 = arr => (arr.length===0) ? 0 : _lastNum(arr);
const _cumsum = arr => arr.reduce((acc,e)=>[...acc, _lastNum0(acc)+e],[]);
const _sum = arr => arr.reduce((s,x)=>s+x,0);
// const _mutislice = (str, arr) => _cumsum(arr).reduce((acc,x)=>[...acc, str.substring(_lastNum0[acc],x)], []);
const _mutislice0 = (str, arr) => _cumsum(arr).map((si,i,cums)=>str.substring(i===0?0:cums[i-1], cums[i]));
const unicodeLength = str => [...str].length;
//tests();

function consumeStream(__stdin, muwMuch, consumer) {
  let buffstr = '';
  let countr = 0;
  function consumeThisMuch(hm, isLastPiece) {
    const consumeLen = _sum(hm); // outchunkLen
    assert(consumeLen <= buffstr.length && consumeLen > 0);
    const outchunkTuple = _mutislice0(buffstr, hm);
    buffstr = buffstr.slice(consumeLen);
    countr = countr - consumeLen;
    consumer(outchunkTuple, isLastPiece);
  }
  function push_as_much_ripechunks_as_you_can() {
    while(true) {
      const hm = muwMuch(buffstr);
      if (hm === null) break;
      consumeThisMuch(hm, false);
    }
  }
  function bring(inchunk) {
    buffstr = buffstr + inchunk;
    countr = countr + inchunk.length;
    push_as_much_ripechunks_as_you_can();
  }
  function bring_end() {
    push_as_much_ripechunks_as_you_can(); // in full (ripe) chunks
    // non-full (unripe) chunks:  -> line separator cannot be found
    if(buffstr.length > 0) {
      /*
      countr = countr - buffstr.length;
      buffstr = '';
      consumer([buffstr, ''], true);
      */
      consumeThisMuch([buffstr.length, ''], true);
    } else {
      // keep it or lose it?
      //consumer(outchunksTuple, true); //for last empty line? no. This is when there is no line. no buffer content.
    }
    assert(countr === 0); // integrity test at end of it all
  }
  function attach_stream(_stdin) {
    _stdin.on('data', inchunk => bring(inchunk.toString()));
    _stdin.on('end',() => bring_end());
  }
  attach_stream(__stdin);
}
// todo: chain output (already 3 stages)
// toodo: renme re -> newline_split_re
function processio(inpipe, re, transfline, outpipe) {
consumeStream(inpipe,
  /*acceptor*/ (_buffstr) => {
    // by returnning a tuple of numbers, decides how much of this content wil be taken
    const m = new RegExp(re).exec(_buffstr);
    if (!m) return null; // no full-chunk. wait for mroe input
    // m[1] is trivially === '\n'
    const l = [m.index, m[1].length]; // index of the separator in the string, length of separator
    assert(l[0] + l[1] > 0); //assert(m.index > 0);
    const hm=l;
    assert(_sum(hm) <= _buffstr.length && _sum(hm) > 0);
    return l; // discharge size
  },
  /*consumer*/(outchunkTuple, isLastPiece) => {
    assert(outchunkTuple.length === 2);
    // If the last chunk of input is empty, this will not be called.
    // However, outchunkTuple[0] can be empty in other cases
    const out = transfline(outchunkTuple[0]); // todo: filter-like
    if (out !== null && out !== undefined) {
      outpipe.write(out);

      // separator (newline) part
      const transfline2 = (x) => x; // preserve the newline
      const transfline3 = (x) => DEBUG_CANDLE ? ((isLastPiece?'🕯 ':'⏎ ') + x) : x;
      outpipe.write(  transfline3( transfline2(outchunkTuple[1]) ) );
    }
  });
}
processio(process.stdin, /(\n)/, transfline, process.stdout);

/*
forked from https://github.com/sohale/snippets/blob/master/javascript/neat-filter-obfuscated.js
forked from https://github.com/sohale/snippets/blob/master/javascript/neat-jsfilter.js
*/

module.exports = {
  autil: {_lastNum, _lastNum0, _cumsum, _sum, _mutislice0},
  processio,consumeStream,
  primmitives: {
    RE1,RER,
  },
  o : {eval1,eval2,eval1NoX,},
  core: {skipException, rec, },
  etc: {assert},
};
