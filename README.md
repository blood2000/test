# 项目须知

## 开发步骤



### 请求接口，请求参数的数组自动转化成对象的问题

```
修改源码：node_modules/uni-request/src/helpers/util.js

export const deepMerge = function () {
    let result = {};
    Array.from(arguments).forEach(e =>{
        if( e && typeof e === 'object' && !isEmptyObject(e) ) {
            Object.keys(e).forEach( key => {
                if( typeof e[key] === 'object' && !(e[key] instanceof Array)){
                    return result[key] = deepMerge( result[key] , e[key] )
                }
                result[key] = e[key]
            });
        }
    })
    return result ;
}
```

