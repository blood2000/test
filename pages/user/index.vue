<template>
	<view class="home-page">
		<view class="top-section flex align-center justify-between" @click="navToInfo">
			<view class="flex align-center">
				<image class="top-avatar shadow-warp bg-white" :src="userInfo.avatar? userInfo.avatar:avatar" mode=""></image>
				<view class="margin-left">
					<view class="top-name">{{ userInfo.userName?userInfo.userName:'暂无' }}</view>
					<view class="size26 text-tag margin-stop">{{ userInfo.org?userInfo.org.orgName:'暂无' }}</view>
				</view>
			</view>
			<view class="cuIcon-right text-gray size32"></view>
		</view>
		<view class="info-section">
			<view class="cu-list menu sm-border">
				<view class="cu-item arrow" @click="navToFeedback">
					<view class="content">
						<text class="cuIcon-communityfill text-green size36"></text>
						<text class="text-black">产品反馈</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="navToAgreement">
					<view class="content">
						<text class="cuIcon-formfill text-blue size36"></text>
						<text class="text-black">用户协议</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="navToPrivacy">
					<view class="content">
						<text class="cuIcon-commandfill text-orange size36"></text>
						<text class="text-black">隐私政策</text>
					</view>
				</view>
				<!-- <view class="cu-item margin-mtop">
					<view class="content flex justify-center">
						<view class="info-title text-red" @click="loginOut">退出登录</view>
					</view>
				</view> -->
			</view>
		</view>
		<button class="btn-yes" type="default" @click="loginOut">退出登录</button>
		
		<!-- 底部操作栏 -->
		<Tabbar :cur="'my'" :height="true" />
	</view>
</template>

<script>
	import { loginOut }from "@/config/service/user.js"
	import Tabbar from '@/components/Tabbar/Tabbar.vue';
	export default {
		components: {
			Tabbar
		},
		data() {
			return {
				userInfo: {
				},
				// 默认头像
				avatar: '/static/avatar.png',
				system: null
			}
		},
		onLoad() {
			uni.hideTabBar({});
			const res = uni.getSystemInfoSync()
			this.system = res.platform;
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo');
		},
		methods: {
			showModal(e) {
				if(!this.isBind){
					this.modalName = e.currentTarget.dataset.target
				}
			},
			hideModal(e) {
				this.modalName = null
			},
			loginOut() {
				loginOut().then(() => {
					uni.removeStorageSync('userInfo');
					uni.removeStorageSync('token');
					uni.showToast({title: '退出登录成功',icon: 'none', duration: 1000});
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/public/applogin'
						});
					}, 1000)
				})
			},
			navToInfo() {
				uni.navigateTo({
					url: "/pages/user/userInfo"
				})
			},
			navToFeedback() {
				uni.navigateTo({
					url: "/pages/user/feedback"
				})
			},
			navToAgreement(){
				uni.navigateTo({
					url:'/pages/webview/index?name=pages/protocol/userAgreement&titleName=用户协议'
				})
			},
			navToPrivacy(){
				uni.navigateTo({
					url:'/pages/webview/index?name=pages/protocol/privacyPolicy&titleName=隐私政策'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
::v-deep .uni-scroll-view-content{
	display: flex;
}
.home-page{
	width: 100vw;
	.top-section{
		padding: 30upx;
		background-color: #FFFFFF;
		.top-avatar{
			height: 120upx;
			width: 120upx;
			border-radius: 16upx;
		}
		.top-name{
			font-size: 32upx;
			font-weight: 700;
		}
	}
	.info-section{
		margin-top: 20upx;
		// background-color: #FFFFFF;
		.info-title{
			width: 170upx;
		}
	}
}
.btn-yes{
	margin: 80upx 70upx 30upx;
	height: 88upx;
	border: 1upx solid #e54d42;
	border-radius: 10upx;
	font-size: 36upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #e54d42;
}
</style>
