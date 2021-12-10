<template>
	<view class="container">
		<view :style="{height:statusBarHeight*2+'upx'}"></view>
		<view class="padding" @click="navBack"><text class="cuIcon-back size40"></text></view>
		<view class="title">请输入验证码</view>
		<view class="cont">验证码已发送到 +86 {{params.telno}}</view>
		<view class="tag">请输入至简集运登录的验证码</view>
		<xt-verify-code v-model="params.captcha" boxNormalColor="#F8F8F8" cursorColor="#3A65FF" :size="6" style="margin: 40upx 50upx 0;" @confirm="confirm"></xt-verify-code>
		<view v-if="countDown !== 60" class="tag"><text class="margin-sright" style="color: #000; font-weight: bold;">{{ countDown }}s</text> 后重新获取</view>
		<view v-else class="code" @click="handleNewSms">重新获取验证码</view>
		<button :disabled="disabledBtn" class="button cu-btn block bg-blue lg" @click="handleLogin">确认登录</button>
	</view>
</template>

<script>
	import { sendSms, checkCaptcha, smsLogin, getInfo, getCid, bindCid } from "@/config/service/login.js"
	import {mapMutations} from 'vuex'; 
	export default{
		components: {
		},
		data(){
			return {
				statusBarHeight: this.StatusBar, // 状态栏高度
				verifyCode:'',
				params: {
					captcha: '',
					telno: uni.getStorageSync('telno')
				},
				smsParams: {
					telno: uni.getStorageSync('telno'),
					type: 'login'
				},
				countDown: 60, // 倒计时
				disabledBtn: true
			}
		},
		onLoad(options){
			this.getCode();
		},
		methods: {
			...mapMutations(['SET_INFO', 'SET_NICKNAME']),
			confirm(code) {
				this.disabledBtn = false;
				console.log(code) //code就是验证码
			},
			getCode(){//倒计时
				var interval = setInterval(() => {
					let times = --this.countDown
					this.countDown = times<10?'0'+times:times //小于10秒补 0
				}, 1000)
				setTimeout(() => {
					clearInterval(interval)
					this.countDown = 60
					this.showText = true
				}, 60000)
			},
			// 重新获取验证码
			handleNewSms() {
				sendSms(this.smsParams).then(res => {
					this.msgSuccess('获取验证码成功！');
					this.getCode();
				})
			},
			handleLogin() {
				checkCaptcha({...this.smsParams, captcha: this.params.captcha}).then(res => {
					this.loginConfirm();
				}).catch(() => {
					this.disabledBtn = true;
					this.params.captcha = '';
				})
			},
			// 登录
			loginConfirm() {
				uni.showLoading({ mask: true });
				smsLogin(this.params).then(res => {
					uni.hideLoading();
					// 缓存token
					uni.setStorageSync('token', res.data.access_token);
					// 获取用户信息
					getInfo().then(res => {
						uni.setStorageSync('userInfo', res.data);
						this.SET_INFO(res.data)
						this.SET_NICKNAME(res.data.nickName)
					});
					// #ifdef APP-PLUS
					getCid().then(res => {
						if(res.data) {
							if(res.data === this.cid) {
								this.navToIndex();
							}else{
								const that = this;
								uni.showModal({
									title: '提示',
									content: '当前设备不是常用设备，是否继续登录？',
									success: function (res) {
										if (res.confirm) {
											that.setCid();
										} else if (res.cancel) {
											uni.showToast({title: '取消登录成功',icon: 'none', duration: 1000});
										}
									}
								});
							}
						} else {
							this.setCid();
						}
					})
					// #endif
					// #ifndef APP-PLUS
						this.navToIndex();
					// #endif
				}).catch(() => {
					this.form.password = undefined;
					uni.hideLoading();
				})
			},
			// 绑定设备唯一标识cid
			setCid() {
				bindCid(this.cid).then(() => {
					this.navToIndex();
				});
			},
			// 登录成功跳转首页
			navToIndex() {
				// this.setAccount();
				uni.showToast({title: '登录成功',icon: 'none', duration: 1000});
				setTimeout(() => {
					uni.reLaunch({
						url: "/pages/index/index"
					})
				}, 1000)
			},
			navBack() {
				uni.reLaunch({
					url: '/pages/public/login'
				})
			}
		},

	}
</script>

<style lang='scss' scoped>
	page{
		background: #fff;
	}
	.title{
		margin-top: 220upx;
		text-align: center;
		font-family: 'PingFang Regular';
		font-size: 56upx;
		font-weight: bold;
		color: #000000;
	}
	.cont{
		margin-top: 34upx;
		text-align: center;
		font-family: 'PingFang Regular';
		font-size: 32upx;
		font-weight: bold;
		color: #000000;
	}
	.tag{
		margin-top: 34upx;
		text-align: center;
		font-family: 'PingFang Regular';
		font-size: 32upx;
		font-weight: 400;
		color: #8A8A8A;
	}
	.code{
		margin-top: 34upx;
		text-align: center;
		font-family: 'PingFang Regular';
		font-size: 32upx;
		font-weight: 400;
		color: #3A65FF;
	}
	.frame{
		margin: 156upx 54upx 66upx;
		padding: 36upx 24upx;
		height: 96upx;
		background: #F8F8F8;
		border-radius: 10upx;
		.area{
			font-size: 32upx;
			font-family: 'PingFang Regular';
			font-weight: bold;
			color: #000000;
		}
	}
	.button{
		margin: 44upx 54upx 0;
	}
	uni-button[disabled]:not([type]), uni-button[disabled][type=default]{
		color: #FFFFFF;
		background: #E3E3E3;
	}
</style>
