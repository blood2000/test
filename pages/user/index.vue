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
				<!-- <view class="cu-item margin-mtop">
					<view class="content flex justify-center">
						<view class="info-title text-red" @click="loginOut">退出登录</view>
					</view>
				</view> -->
			</view>
		</view>
		<button class="btn-yes" type="default" @click="loginOut">退出登录</button>
		
		<!-- 底部操作栏 -->
		<view :class="system==='android'?'bar-frame-android':system==='ios'?'bar-frame-ios':'bar-frame'" class="cu-bar tabbar bg-white">
			<view class="action" @click="navToMail">
				<image class="bar-icon" src="/static/tabbar/mail.png" mode=""></image>
				<view class="bar-title">通讯录</view>
			</view>
			<view class="action" @click="navToApp">
				<image class="bar-icon" src="/static/tabbar/app.png" mode=""></image>
				<view class="bar-title">应用</view>
			</view>
			<view class="text-center bar-workframe" @click="navToWork">
				<image class="bar-work" src="/static/tabbar/work.png" mode=""></image>
			</view>
			<view class="action" @click="navToUpcoming">
				<image class="bar-icon" src="/static/tabbar/upcoming.png" mode=""></image>
				<view class="bar-title">待办</view>
			</view>
			<view class="action" @click="navToUser">
				<image class="bar-icon" src="/static/tabbar/my_cur.png" mode=""></image>
				<view class="bar-title bar-ontitle">我的</view>
			</view>
		</view>
		<view style="height: 100upx;"></view>
	</view>
</template>

<script>
	import { loginOut }from "@/config/service/user.js"
	export default {
		components: {
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
							url: '/pages/public/login'
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
			navToUpcoming(){
				uni.setStorageSync('TabCur', 1);
				uni.switchTab({
					url:'/pages/upcoming/index'
				})
			},
			navToApp(){
				uni.switchTab({
					url:'/pages/applicate/index'
				})
			},
			navToMail(){
				uni.switchTab({
					url:'/pages/mailList/index'
				})
			},
			navToUser(){
				uni.switchTab({
					url:'/pages/user/index'
				})
			},
			navToWork(){
				uni.switchTab({
					url:'/pages/index/index'
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
