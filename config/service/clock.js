import uniRequest from "../request.js";
import baseURL from '../index.js';

// 打卡
export function clock(data) {
	return uniRequest({
		url: baseURL + '/system/attendance/add',
		method: 'post',
		data: data
	});
}

// 查询是否在打卡范围内
export function clockRange(userCode, longitude, latitude) {
	return uniRequest({
		url: baseURL + '/system/attendance/queryAttendancePositionByUserCode/' + userCode + '/' + longitude + '/' + latitude,
		method: 'get'
	});
}

// 获取当日打卡页面数据
export function queryData(currentDate) {
	return uniRequest({
		url: baseURL + '/system/attendance/queryCurrentDayData/' + currentDate,
		method: 'get'
	});
}

// 获取考勤规则
export function queryAttendanceRules(userCode, date) {
	return uniRequest({
		url: baseURL + '/system/attendance/queryAttendanceRules/' + userCode + '/' + date,
		method: 'get'
	});
}

// 校验打卡时间
export function validatePunchCard(data) {
	return uniRequest({
		url: baseURL + '/system/attendance/validatePunchCard',
		method: 'post',
		data: data
	});
}

// 统计当月数据
export function queryByUserWorkingHours(data) {
	return uniRequest({
		url: baseURL + '/system/attendance/queryByUserWorkingHours',
		method: 'post',
		data: data
	});
}

// 统计当月数据
export function queryByUserDailyRecord(startTime) {
	return uniRequest({
		url: baseURL + '/system/attendance/queryByUserDailyRecord',
		method: 'get',
		data: {
			startTime: startTime
		}
	});
}

// 统计当日打卡数据
export function queryByUserRecordByDay(startTime) {
	return uniRequest({
		url: baseURL + '/system/attendance/queryByUserRecordByDay',
		method: 'get',
		data: {
			startTime: startTime
		}
	});
}

// 获取某月统计数据
export function queryMonth(data) {
	return uniRequest({
		url: baseURL + '/analysis/dataModelInfos/simpleQuery',
		method: 'post',
		data: data
	});
}
