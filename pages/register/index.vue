<template>
	<view class="register">
		<image class="bg-img" :src="img" mode=""></image>
		<view class="top-section">
			<view class="top-title">您好</view>
			<view class="top-tag">欢迎加入超好运</view>
		</view>
		<view class="form-section">
			<view class="form-frame flex align-center" :class="phone?'border-on':'border-no'">
				<view class="cuIcon-mobile size36" :class="phone?'text-blue':'text-grey'"></view>
				<input class="form-input" v-model="form.phone" placeholder="请输入手机号" name="input" @focus="phoneFocus" />
			</view>
			<view class="form-frame flex align-center" :class="nickName?'border-on':'border-no'">
				<view class="cuIcon-people size36" :class="nickName?'text-blue':'text-grey'"></view>
				<input class="form-input" v-model="form.nickName" placeholder="请输入姓名" name="input" @focus="nameFocus" />
			</view>
			<view class="form-frame flex align-center" :class="licenseNumber?'border-on':'border-no'">
				<view class="cuIcon-news size36" :class="licenseNumber?'text-blue':'text-grey'"></view>
				<input class="form-input" v-model="form.licenseNumber" placeholder="请输入车牌号" name="input" @focus="numFocus" />
			</view>
		</view>
		<view style="height: 120upx;"></view>
		<view class="bottom-section flex align-center justify-between">
			<button class="btn-yes" type="default" @click="register">注册</button>
		</view>
		<!-- 警告弹窗 -->
		<view v-if="modalName=='warning'" style="height: 100%; width: 100%;position: fixed;top: 0; background-color: #FFFFFF; z-index: 10;"></view>
		<view class="cu-modal" :class="modalName=='warning'?'show':''">
			<view class="cu-dialog">
				<view class="bg-white padding text-lg">
					<view class="margin-mright" :class="scanErr? 'cuIcon-roundclosefill text-red':'cuIcon-roundcheckfill text-green'" style="font-size: 84upx;"></view>
					{{ scanData.operatorMsg }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { registerDriverByScan } from "@/config/service/login.js"
	export default {
		components: {
		},
		data() {
			return {
				scanData: {
					operatorMsg: '',
				},
				form: {
					phone: null,
					nickName: null,
					licenseNumber: null,
					qrcode: null
				},
				modalName: null,
				phone: false,
				nickName: false,
				licenseNumber: false,
				scanErr: false,
				scanCode: null,
				img: 'https://css-backup-1579076150310.obs.cn-south-1.myhuaweicloud.com/image_directory/16299710869100d37ba.png'
			}
		},
		onLoad(option) {
			this.scanCode = decodeURIComponent(option.q);
			const a = this.scanCode.split('/');
			this.form.qrcode = a[a.length - 1];
			// this.form.qrcode = '776ca8e240574192b6e0f69b417163df';
		},
		methods: {
			register(){
				if (!this.form.phone){
					uni.showToast({title: '请输入手机号',icon: 'none', duration: 2000});
				} else if (!this.form.nickName) {
					uni.showToast({title: '请输入姓名',icon: 'none', duration: 2000});
				} else if (!this.form.licenseNumber) {
					uni.showToast({title: '请输入车牌号',icon: 'none', duration: 2000});
				} else {
					uni.showLoading({ mask: true });
					registerDriverByScan(this.form).then(res => {
						uni.hideLoading();
						this.modalName = 'warning';
						this.scanData.operatorMsg = '司机注册成功，请下载超好运司机APP继续完善个人资料！'
					})
				}
			},
			phoneFocus(){
				this.phone = true;
				this.licenseNumber = false;
				this.nickName = false
			},
			nameFocus(){
				this.phone = false;
				this.licenseNumber = false;
				this.nickName = true
			},
			numFocus(){
				this.phone = false;
				this.licenseNumber = true;
				this.nickName = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.register{
		background-color: #FFFFFF;
		height: 100vh;
		overflow: hidden;
	}
	.bg-img{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 5;
		width: 100%;
		height: 520upx;
	}
	.top-section{
		position: relative;
		z-index: 6;
		margin-top: 200upx;
		padding:  0 60upx;
		.top-title{
			font-size: 52upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
		}
		.top-tag{
			margin-top: 35upx;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
	.form-section{
		position: relative;
		z-index: 6;
		margin-top: 128upx;
		background-color: #FFFFFF;
		width: 100%;
		// height: 100vh;
		border-radius: 50upx 50upx 0 0;
		padding: 70upx 70upx 0;
		.border-on{
			border-bottom: 3upx solid #4478E4;
		}
		.border-no{
			border-bottom: 1upx solid #E6E6E6;
		}
		.form-frame{
			margin: 0 0 80upx;
			padding-bottom: 20upx;
			.form-input{
				width: 100%;
				margin-left: 20upx;
			}
		}
	}
	.bottom-section{
		width: 100%;
		position: fixed;
		padding: 0 30upx 30upx;
		bottom: 0;
		left: 0;
		z-index: 9;
		.btn-no{
			width: 336upx;
			height: 80upx;
			background: #FFFFFF;
			border: 2upx solid #4478E4;
			border-radius: 10upx;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #4478E4;
		}
		.btn-yes{
			width: 100%;
			height: 88upx;
			background: #4478E4;
			border-radius: 10upx;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
</style>
