const {autil: {_lastNum, _lastNum0, _cumsum, _sum, _mutislice0}} =
  require('../src/jrep');

describe('a', () => {
  it('b', () => {
    console.log(_lastNum([8,9])===9);
    console.log(_lastNum0([])===0);
    console.log(_lastNum([-2])===-2);
    console.log(_lastNum0([-2])===-2);
    console.log(_cumsum([]),[]);
    console.log(_cumsum([100,2]),[100,102]);
    console.log(_cumsum([100]),[100]);
    console.log(_cumsum([100,-2]),[100,98]);
    console.log(_cumsum([10,2,4,5]),[10,12,16,21]);
    console.log(_cumsum([1,3,1,2]), [1,4,5,7]);
    console.log(_mutislice0('a2345678',[1,3,1,2]), ['a','234','5','67']);

  });
});
