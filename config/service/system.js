import request from "../request.js";
import baseURL from '../index.js';

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
    return request({
      url: baseURL + '/system/dict/data/type/' + dictType,
      method: 'get'
    });
  }