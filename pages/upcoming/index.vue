<template>
	<view class="upcomingPage">
		<view class="flex align-center justify-center" style="height: 800upx;">
			<image class="todo-img" src="/static/workbench/icon_expect.png" mode=""></image>
		</view>
		<!-- 底部操作栏 -->
		<Tabbar :cur="'todo'" :height="true" />
	</view>
</template>

<script>
	import card from "./component/card";
	import Tabbar from '@/components/Tabbar/Tabbar.vue';
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
			NonePage,
			Tabbar
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
