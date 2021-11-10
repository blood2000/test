<template>
	<view style="height: 100vh;background-color: #FFFFFF;">
		<view class="flex align-center justify-center flex-direction">
			
			<view class="padding-xs flex align-center">
				<view class="flex-sub text-center">
					<image class="auth-img" src="/static/icon_driver.png" mode=""></image>
					<view>申请获取以下权限</view>
					<view class="padding">获得你的公开信息(微信昵称、头像等)</view>
				</view>
			</view>
			
			
			<view style="height: 100upx;"></view>
			<button v-if="!authInfo" class="cu-btn bg-green margin" open-type="getUserProfile" @click="getUserProfile">微信授权登录</button>
			<button v-else class="cu-btn bg-green margin" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">授权获取手机号</button>
			
		</view>
	</view>
</template>

<script>
	// import api from "@/config/api.js"
	// import auth from "@/services/auth.js"
	import { wxLogin, wxInfo, wxPhone }from "@/config/service/login.js"
	import {  
	    // mapState,
		mapMutations
	} from 'vuex';
	let startY = 0, moveY = 0, pageAtTop = true;
	export default {
		data(){
			return {
				code: '',
				sessionKey: '',
				authInfo: false
			}
		},
		onLoad(options){
			
		},
		onShow() {
		},
	    computed: {
			// ...mapState(['isLogin','userInfo'])
		},
	    methods: {
			...mapMutations(['login','logout']),
			// 授权获取用户信息
			getUserProfile(){
				// 获取微信用户信息
				uni.getUserProfile({
					provider: 'weixin',
					desc:'登录',
					success: (res) => {
						console.log(res);
						uni.setStorageSync('userInfo', res.userInfo);
						this.wxLogin(res.userInfo);
					},
					fail: (res) => {
						console.log(res);
					}
				});
			},
			// 登录
			wxLogin(val){
				uni.login({
					success: (res) => {
						if (res.code) {
							console.log(res);
							//发起网络请求
							uni.setStorageSync('code', res.code);
							const data = {
								...val,
								openId: uni.getStorageSync('openId'),
								code: res.code
							}
							wxLogin(data).then(response => {
								console.log(response);
								uni.setStorageSync('sessionKey', response.data.sessionKey);
								uni.setStorageSync('openId', response.data.openId);
								uni.setStorageSync('userInfo', response.data.wxInfo);
								if(response.data.bindStatus == 0){
									this.authInfo = true;
								} else {
									uni.setStorageSync('token', response.data.access_token);
									uni.setStorageSync('isLogin', true);
									uni.navigateBack({});
									uni.$emit("handClick", response.data.userType);
								}
							}).catch(res => {
								uni.navigateBack({});
								uni.$emit("handClick", 0);
							});
						}
					}
				})
			},
			// 授权绑定手机号
			onGetPhoneNumber(e){
				console.log(e);
				const encryptedData = e.detail.encryptedData;
				const iv = e.detail.iv;
				if(e.detail.errMsg =="getPhoneNumber:ok"){
					this.wxPhone(encryptedData, iv)
				}else{
					uni.showToast({
						title: '请重新获取',
						icon: "none"
					})
				}
			},
			wxPhone(encryptedData, iv) {
				var phoneData = {
					sessionKey: uni.getStorageSync('sessionKey'),
					openId: uni.getStorageSync('openId'),
					encryptedData: encryptedData,
					iv: iv
				}
				wxPhone(phoneData).then(response => {
					console.log(response);
					uni.setStorageSync('token', response.data.access_token);
					uni.setStorageSync('isLogin', true);
					uni.navigateBack({});
					uni.$emit("handClick", response.data.userType);
				}).catch(res => {
					uni.navigateBack({});
					uni.$emit("handClick", 0);
				});
			},
			setStorage(data) { //如果登录成功，则保存缓存
				var that = this;
				uni.setStorage({
					key: 'userInfo',
					data: data,
					success: function() {
						uni.showToast({
							title: '绑定成功',
							duration: 1000
						}); 
						that.login(data);
						that.isBindWx = true;
						uni.setStorageSync('isLogin', true);
						setTimeout(function() {
							that.$eventHub.$emit('thislogon');
							that.$eventHub.$emit('user');
							uni.navigateBack();
						}, 1000);
					}
				});
				
			}
	    }  
	}  
</script>

<style>
	.auth-img{
		margin: 100upx 0 50upx;
		height: 144upx;
		width: 144upx;
	}
	.cu-btn{
		height: 80upx;
		width: 600upx;
	}
</style>
