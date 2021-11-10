import uniRequest from '../../request.js';
import baseURL from '../../index.js';
// 获取数据集信息
export function getDataModel(id) {
  return uniRequest({
    url: baseURL+`/analysis/dataModelInfos/${id}`,
    method: 'get'
  });
}

// 模型查询
export function searchDataModel(data) {
  return uniRequest({
    url: baseURL+'/analysis/dataModelInfos/simpleQuery',
    method: 'post',
    data: data
  });
}
