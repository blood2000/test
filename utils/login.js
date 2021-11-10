import { wxLogin }from "@/config/service/login.js";
export function wxlogin(callback){
	const token = uni.getStorageSync('token') || '';
	if (token) {
		uni.login({
			success: (res) => {
				// console.log(res);
				//发起网络请求
				uni.setStorageSync('code', res.code);
				const data = {
					openId: uni.getStorageSync('openId'),
					code: res.code
				}
				wxLogin(data).then(response => {
					uni.setStorageSync('sessionKey', response.data.sessionKey);
					uni.setStorageSync('openId', response.data.openId);
					uni.setStorageSync('token',response.data.access_token);
					uni.setStorageSync('userInfo', response.data.wxInfo);
					uni.setStorageSync('isLogin', true);
					// uni.reLaunch({
					// 	url:'/pages/index/index'
					// })
					callback(response.data.userType)
				}).catch(res => {
					callback(0);
				});
			}
		})
	}else{
		uni.setStorageSync('isLogin', false);
		uni.navigateTo({
			url:'/pages/public/auth'
		})
	}
}