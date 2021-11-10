import uniRequest from "../request.js";
import baseURL from '../index.js';


// 通讯录树
export function getAddressBook(produceCode) {
	return uniRequest({
		url: baseURL + '/system/addressBook/getAddressBook/' + produceCode,
		method: 'get'
	});
}

// 通讯录列表
export function getAddressList(orgId, orgCode) {
	return uniRequest({
		url: baseURL + '/system/addressBook/getAddressList/7beacecadf4341fa81232781beb71b08/' + orgId + '/' + orgCode,
		method: 'get'
	});
}

// 获取用户详情
export function getUserDetail(userCode) {
	return uniRequest({
		url: baseURL + '/system/addressBook/detail/' + userCode,
		method: 'get'
	});
}

// 修改成员
export function editBookUser(data) {
  return uniRequest({
    url: '/system/addressBook/edit',
    method: 'post',
    data: data
  });
}

// 删除成员
export function deleteBookUser(userIds) {
  return uniRequest({
    url: '/system/addressBook/' + userIds,
    method: 'delete'
  });
}
