import uniRequest from "uni-request";
// import baseURL from './index.js';
import { produceCode, appCode, arrType, appVersion, terminalType } from './headers.js'

// 全局配置
// uniRequest.defaults.baseURL = '/apis';
// uniRequest.defaults.headers.common['Authorization'] = AUTH_TOKEN;
uniRequest.defaults.headers.post['Content-Type'] = 'application/json';
// uniRequest.defaults.headers.get['Content-Type'] = 'x-www-form-urlencoded';

// 请求拦截
uniRequest.interceptors.request.use(
	config => {
		// header添加其他信息
		config.headers['Produce-Code'] = produceCode || '7beacecadf4341fa81232781beb71b08';
		config.headers['App-Code'] = appCode || '07072c4c302f475d995f832ec8053e9b';
		config.headers['App-Type'] = arrType || '2';
		// config.headers['role-type'] = '2';
		config.headers['App-Version'] = appVersion || '1.0';
		config.headers['Terminal-Type'] = terminalType || 'web';
		// 请求携带token
		config.headers['Authorization'] = uni.getStorageSync('token') || ''; // token先写死

		// 因为app端 会把数组自动转成对象格式- 这里偷懒处理一下先把数组转成json字符串, 如何在这里转回数组
		// console.log(config.data);
		if(config.data && config.data.dataModelId){
			try{
				config.data.paramsList = JSON.parse(config.data.paramsList)
			}catch(e){
				//TODO handle the exception
			}
		}

		return config;
	},
	err => {
		console.log('请求失败');
		return Promise.reject(err);
	}
);

// 响应拦截
uniRequest.interceptors.response.use(
	res => {
		const code = res.data.code || 200;
		const msg = res.data.msg || '系统未知错误,请反馈给管理员';
		if (code === 401) {
			uni.showToast({
				title: msg,
				icon: 'none',
				duration: 1000
			});
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/public/applogin'
				});
			}, 1000)
			return Promise.reject(res.data);
		} else if (code === 500) {
			uni.showToast({
				title: msg,
				icon: 'none',
				duration: 2000
			});
			return Promise.reject(res.data);
		} else if (code === 404) {
			uni.showToast({
				title: msg,
				icon: 'none',
				duration: 1000
			});
			return Promise.reject(new Error(msg));
		} else if (code !== 200) {
			uni.showToast({
				title: msg,
				icon: 'none',
				duration: 2000
			});
			return Promise.reject(res.data);
		} else {
			return res.data;
		}
		return Promise.resolve(response);
	},
	error => {
		return Promise.reject(error);
	}
);

export default uniRequest;
