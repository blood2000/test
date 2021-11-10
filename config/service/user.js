import uniRequest from "../request.js";
import baseURL from '../index.js';

// 上传图片api
export const uploadImgApi = baseURL + '/assets/upload/uploadToHW';

// 获取用户详细信息
export function getInfo() {
  return uniRequest({
    url: baseURL + '/system/addressBook/detailCurrentUser',
    method: 'get'
  });
}

// 退出登录
export function loginOut() {
	return uniRequest({
		url: baseURL + '/auth/logout',
		method: 'delete'
	});
}

// 修改用户信息
export function editUser(data) {
	return uniRequest({
		url: baseURL + '/system/user/center/editForApp',
		method: 'post',
		data:data
	});
}

// 新增反馈
export function feedBack(data) {
	return uniRequest({
		url: baseURL + '/system/feedBack',
		method: 'post',
		data:data
	});
}

