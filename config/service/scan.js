import uniRequest from "../request.js";
import baseURL from '../index.js';

// 获取业务参数开关控制扫码接单装卸货功能
export function getByEnName(enName) {
	return uniRequest({
		url: baseURL + '/system/param/data/getByEnName/' + enName,
		method: 'get'
	});
}

// 扫码操作
export function scanCarrierCode(code) {
	return uniRequest({
		url: baseURL + '/transportation/waybillOper/scanCarrierCode',
		method: 'get',
		data: {
			code: code
		}
	});
}

// 上传图片api
export const uploadImgApi = baseURL + '/assets/upload/uploadToHW';

// 获取运单信息
export function getWaybillInfo(code) {
	return uniRequest({
		url: baseURL + '/transportation/app/waybillInfo/getWaybillInfo/' + code,
		method: 'get'
	});
}

// 卸货
export function appUnloadOrder(data) {
	return uniRequest({
		url: baseURL + '/transportation/waybillOper/appUnloadOrder',
		method: 'post',
		data: data
	});
}

// 装货
export function appLoadOrder(data) {
	return uniRequest({
		url: baseURL + '/transportation/waybillOper/appLoadOrder',
		method: 'post',
		data: data
	});
}

// 获取接单信息
export function getCarriageInfo(orderCode) {
	return uniRequest({
		url: baseURL + '/transportation/waybillOper/getCarriageInfo/' + orderCode,
		method: 'get'
	});
}

// 接单并装货
export function appReceiveAndLoadOrder(data) {
	return uniRequest({
		url: baseURL + '/transportation/waybillOper/appReceiveAndLoadOrder',
		method: 'post',
		data: data
	});
}
