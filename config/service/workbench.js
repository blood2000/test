import uniRequest from "../request.js";
import baseURL from '../index.js';

// 字典
export function getDictsByType(data) {
  return uniRequest({
    url: '/system/dict/data/listDataByDict',
    method: 'post',
    data: data
  });
}

// 常用应用列表
export function listUsually(query) {
	return uniRequest({
		url: baseURL + '/system/sysCommonUser/querySysCommonUserMenuByUserCode',
		method: 'get',
		params: query
	});
}

// 添加常用应用
export function addUsually(menuCodes) {
	return uniRequest({
		url: baseURL + '/system/sysCommonUser/add',
		method: 'post',
		data: {
			menuCodes: menuCodes
		}
	});
}

// 添加常用应用
export function deleteUsually(menuCodes) {
	return uniRequest({
		url: baseURL + '/system/sysCommonUser/' + menuCodes,
		method: 'delete'
	});
}

// 应用列表
export function applicateList() {
	return uniRequest({
		url: baseURL + '/system/sysCommonUser/queryAllMenuByUser',
		method: 'get'
	});
}

// 新闻列表
export function listNews(data) {
	return uniRequest({
		url: baseURL + '/system/websiteNews/list',
		method: 'post',
		data: data
	});
}

// 新闻详情
export function detailNews(code) {
	return uniRequest({
		url: baseURL + '/system/websiteNews/' + code,
		method: 'get'
	});
}

// 通知/公告列表
export function listNotice(query) {
	return uniRequest({
		url: baseURL + '/system/notice/newList',
		method: 'get',
		params: query
	});
}

// 通知/公告列表
export function userNotice(query) {
	return uniRequest({
		url: baseURL + '/system/userNotice/appList',
		method: 'get',
		params: query
	});
}

// 搜索
export function comprehensiveSearch(query) {
	return uniRequest({
		url: baseURL + '/system/comprehensiveSearch',
		method: 'get',
		params: query
	});
}

// 修改常用应用
export function restSysCommonUserMenu(menuCode) {
	return uniRequest({
		url: baseURL + '/system/sysCommonUser/restSysCommonUserMenu',
		method: 'post',
		data: {
			menuCode: menuCode
		}
	});
}
