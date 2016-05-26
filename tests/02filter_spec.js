let ff = require('../src/filter')
let register = ff.register
let filter = ff.filter
let parse = require('../src/parse')

let _ = require('lodash')
describe('Filter', () => {
  it('过滤器可以注册和获取',()=>{
    let myFilter = ()=>{}
    let myFilterFactory = ()=>myFilter
    register('my',myFilterFactory)
    expect(filter('my')).toBe(myFilter)
  })
  it('允许用object，一次注册多个过滤器',()=>{
    let myFilter = ()=>{}
    let myOtherFilter = ()=>{}

    register({
      my:()=>myFilter,
      myOther:()=>myOtherFilter
    })
    expect(filter('my')).toBe(myFilter)
    expect(filter('myOther')).toBe(myOtherFilter)
  })
  it('可以处理|的过滤器表达式，需要parse支持',()=>{
    register('upcase',()=>{
      return function(str){
        return str.toUpperCase()
      }
    })
    let fn = parse('aString|upcase')
    expect(fn({aString:'heLLo'})).toEqual('HELLO')
  })
})

// var v0 = filter('upcase');
// var fn = function(s, l) {
//   var _test_var, v1;

//   if (!(l && ('sString' in l)) && s) {
//     v1 = (s).sString;
//   }
//   return v0(v1);
// };
// return fn;








