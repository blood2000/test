// 接口前缀地址
let baseURL = '';

// #ifdef H5
// h5环境
baseURL = '/apis';
// #endif

// #ifdef APP-PLUS
// app环境
baseURL = 'http://10.0.0.38:8080'; // 测
// baseURL = 'http://192.168.30.59:8080'; // 睿
// baseURL = 'http://192.168.30.167:8080'; // 秀
// baseURL = 'http://192.168.30.134:8080'; // 志
// baseURL = 'https://api.chaohaoyun.cn'; // 正式
// #endif

// #ifdef MP
// 小程序环境
baseURL = 'http://10.0.0.38:8080'; // 测
// #endif

export default baseURL;