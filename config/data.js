import request from './request.js';
import baseURL from './index.js';
// 查询字典数据列表
export function listData(query) {
  return request({
    url: baseURL+ '/system/dict/data/list',
    method: 'post',
    data: query
  });
}

// 查询字典数据列表(树)
export function treeListData(query) {
  return request({
    url: baseURL+ '/system/dict/data/treeselect',
    method: 'get',
    params: query
  });
}

// 查询字典数据详细
export function getData(dictCode) {
  return request({
    url: baseURL+ '/system/dict/data/' + dictCode,
    method: 'get'
  });
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return request({
    url: baseURL+ '/system/dict/data/type/' + dictType,
    method: 'get'
  });
}

export function getDictsByType(data) {
  return request({
    url: baseURL+ '/system/dict/data/listDataByDict',
    method: 'post',
    data: data
  });
}
// 新增字典数据
export function addData(data) {
  return request({
    url: baseURL+ '/system/dict/data',
    method: 'post',
    data: data
  });
}

// 修改字典数据
export function updateData(data) {
  return request({
    url: baseURL+ '/system/dict/data',
    method: 'put',
    data: data
  });
}

// 删除字典数据
export function delData(dictCode) {
  return request({
    url: baseURL+ '/system/dict/data/' + dictCode,
    method: 'delete'
  });
}
// 查询字典类
export function listByDict(data) {
  return request({
    url: baseURL+ '/system/dict/data/listDataByDict',
    method: 'post',
    data: data
  });
}
