<template>
	<view class="upcomingPage">
		<!-- <view class="flex align-center justify-center" style="height: 800upx;">
			<image class="todo-img" src="/static/workbench/icon_expect.png" mode=""></image>
		</view> -->
		<view class="app-container padding-m margin-mtop">
			<view class="flex align-center justify-between">
				 <!-- <text class="text-red">{{todoTotal}}</text> -->
				<view class="todo-title">今日事项</view>
				<!-- <view class="text-gray" @click="navToUpcoming">更多<text class="cuIcon-right"></text></view> -->
			</view>
			<view class="todo-frame flex align-center justify-between">
				<view class="flex align-center">
					<view class="todo-type" :style="{background: '#51A3F7' }">
						待办
					</view>
					<view class="margin-mleft" style="max-width: 450upx;">
						<view class="text-bold ellipsis">请根据当天收发合同情况核对运输计划</view>
						<view class="size24 text-tag margin-stop">12/11 15:33</view>
					</view>
				</view>
				<!-- <l-time class="margin-mleft" color="#999" computeMax="MM" :dateFormat="'MM/dd hh:mm'" :text="new Date()"></l-time> -->
			</view>
			<view class="todo-frame flex align-center justify-between">
				<view class="flex align-center">
					<view class="todo-type" :style="{background: '#51A3F7' }">
						待办
					</view>
					<view class="margin-mleft" style="max-width: 450upx;">
						<view class="text-bold ellipsis">今日如有新增车辆，请预先在运力管理中进行创建</view>
						<view class="size24 text-tag margin-stop">12/11 15:33</view>
					</view>
				</view>
				<!-- <l-time class="margin-mleft" color="#999" computeMax="MM" :dateFormat="'MM/dd hh:mm'" :text="new Date()"></l-time> -->
			</view>
			<!-- <view class="flex align-center justify-center" style="height: 500upx;">
				<image class="todo-img" src="/static/workbench/icon_expect.png" mode=""></image>
			</view> -->
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
	.todo-title{
		font-size: 32upx;
		font-weight: bold;
		color: #333333;
	}
	.todo-type{
		text-align: center;
		width: 84upx;
		height: 84upx;
		background: #51A3F7;
		border-radius: 50%;
		font-size: 24upx;
		font-weight: 400;
		line-height: 84upx;
		color: #FFFFFF;
	}
	.app-container{
		.todo-frame{
			padding: 30upx 0;
		}
		.todo-frame + .todo-frame{
			border-top: 1upx solid #EBEBEB;
		}
	}
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
