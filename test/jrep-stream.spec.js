'use strict;'
const {expect} = require('chai');
const {autil: {_lastNum, _lastNum0, _cumsum, _sum, _mutislice0}} =
  require('../src/jrep');

describe('a', () => {
  it('test some 1-liner algorithms', () => {
    console.log(_lastNum([8,9])===9);
    expect(_lastNum([8,9])).to.eql(9);
    console.log(_lastNum0([])===0);
    expect(_lastNum0([])).to.eql(0);
    console.log(_lastNum([5])===5);
    expect(_lastNum([5])).to.eql(5);
    console.log(_lastNum0([-2])===-2);
    expect(_lastNum0([-2])).to.eql(-2);
    console.log(_cumsum([]),[]);
    expect(_cumsum([])).to.eql([]);
    console.log(_cumsum([100,2]),[100,102]);
    expect(_cumsum([100,2])).to.eql([100,102]);
    console.log(_cumsum([100]),[100]);
    expect(_cumsum([100])).to.eql([100]);
    console.log(_cumsum([100,-2]),[100,98]);
    expect(_cumsum([100,-2])).to.eql([100,98]);
    console.log(_cumsum([10,2,4,5]),[10,12,16,21]);
    expect(_cumsum([10,2,4,5])).to.eql([10,12,16,21]);
    console.log(_cumsum([1,3,1,2]), [1,4,5,7]);
    expect(_cumsum([1,3,1,2])).to.eql([1,4,5,7]);
    console.log(_mutislice0('a2345678',[1,3,1,2]), ['a','234','5','67']);
    expect(_mutislice0('a2345678',[1,3,1,2])).to.eql(['a','234','5','67']);

  });
});
