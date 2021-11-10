import uniRequest from "../request.js";
import baseURL from '../index.js';

// 代收协议
export function getCollection(data) {
	return uniRequest({
		url: baseURL + '/assets/driver/agreement/replaceData',
		method: 'get',
		data: data
	});
}

// 运输合同-货主/司机
export function getContractByCode(orderCode, licenseNumber) {
  return uniRequest({
    url: baseURL + '/transportation/orderContract/replace/' + orderCode + '?licenseNumber=' + licenseNumber,
    method: 'get'
  });
}
