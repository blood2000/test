/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}


export function removePropertyOfNull(obj){
  Object.keys(obj).forEach(item=>{
    if(!obj[item] && obj[item]!=0 && typeof(obj[item]) !== 'boolean' ) delete obj[item]
      
    if(Object.prototype.toString.call(obj[item]) === '[object Object]'){
      removePropertyOfNull(obj[item])
    }
    if(Array.isArray(obj[item])){
      obj[item].forEach(e=>{
        removePropertyOfNull(e)
      })
    }
  })
  return obj;
}