import uniRequest from "../request.js";
import baseURL from '../index.js';

// 微信登录
export function wxLogin(data) {
	return uniRequest({
		url: baseURL + '/auth/wxLogin/wx78d05b2dfd8825fd',
		method: 'post',
		data: data
	});
}

// 微信资料
export function wxInfo(data) {
	return uniRequest({
		url: baseURL + '/auth/wxInfo/wx78d05b2dfd8825fd',
		method: 'get',
		data: data
	});
}

// 微信手机号
export function wxPhone(data) {
	return uniRequest({
		url: baseURL + '/auth/wxBindPhone/wx78d05b2dfd8825fd',
		method: 'get',
		data: data
	});
}

// 获取用户详细信息
export function getInfo() {
  return uniRequest({
    url: baseURL + '/system/addressBook/detailCurrentUser',
    method: 'get'
  });
}

// 司机扫码注册
export function registerDriverByScan(data) {
	return uniRequest({
		url: baseURL + '/assets/driver/registerDriverByScan',
		method: 'post',
		data: data
	});
}

// 手机号密码登录
export function login(data) {
	return uniRequest({
		url: baseURL + '/auth/pwd_login',
		method: 'post',
		data: data
	});
}

// 手机号短信登录
export function smsLogin(data) {
	return uniRequest({
		url: baseURL + '/auth/sms_login',
		method: 'post',
		data: data
	});
}

// 发送短信
export function sendSms(data) {
	return uniRequest({
		url: baseURL + '/auth/send_sms',
		method: 'post',
		data: data
	});
}

// 校验短信验证码是否有效
export function checkCaptcha(data) {
	return uniRequest({
		url: baseURL + '/auth/check_captcha',
		method: 'post',
		data: data
	});
}

// 退出登录
export function loginOut() {
	return uniRequest({
		url: baseURL + '/auth/logout',
		method: 'delete'
	});
}

// cid绑定
export function bindCid(cid) {
	return uniRequest({
		url: baseURL + '/system/miniApp/binding/' + cid,
		method: 'post'
	});
}

// 通过userCode获取Cid
export function getCid() {
	return uniRequest({
		url: baseURL + '/system/miniApp/getCidByUserCode',
		method: 'get'
	});
}
