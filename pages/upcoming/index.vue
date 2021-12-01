<template>
	<view class="upcomingPage">
		<view class="flex align-center justify-center" style="height: 800upx;">
			<image class="todo-img" src="/static/workbench/icon_expect.png" mode=""></image>
		</view>
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
				<image class="bar-icon" src="/static/tabbar/upcoming_cur.png" mode=""></image>
				<view class="bar-title bar-ontitle">待办</view>
			</view>
			<view class="action" @click="navToUser">
				<image class="bar-icon" src="/static/tabbar/my.png" mode=""></image>
				<view class="bar-title">我的</view>
			</view>
		</view>
		<view style="height: 100upx;"></view>
	</view>
</template>

<script>
	import card from "./component/card";
	import {
		myProcessList,
		todoList,
		finishedList,
		selectMyList
	} from "@/config/service/flowable/process";
	import NonePage from "@/components/NonePage/NonePage.vue"

	export default {
		components: {
			card,
			NonePage
		},
		data() {
			return {
				system: null,
			};
		},
		onLoad() {
			uni.hideTabBar({});
			const res = uni.getSystemInfoSync()
			this.system = res.platform;
		},
		onShow() {
		},

		methods: {
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
		},
	};
</script>

<style lang="scss" scoped>
	.upcomingPage{
		display: flex;
		flex-direction: column;
		
	}
	
	.cu-item.text-default {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #1678FF;
		position: relative;
		border: 0;
	}
	.cu-item.text-default::after{
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 66upx;
		height: 4upx;
		background: #1678FF;
		border-radius: 2px;
	}

	.cu-item {
		color: #999999;
	}

	.m-fex {
		position: fixed;
		bottom: 150upx;
		right: 50upx;
		z-index: 999;
		font-size: 20px;
	}
</style>
