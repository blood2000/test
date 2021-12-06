<template>
	<view class="home-page">
		<view :style="{height:statusBarHeight + 50 +'px'}"></view>
		<view class="search-container">
			<view :style="{height:statusBarHeight+'px'}"></view>
			<view class="cu-bar search">
				<text class="cuIcon-back size36 text-white" @click="navBack"></text>
				<view class="search-form">
					<text class="cuIcon-search"></text>
					<input v-model="form.keyword" :adjust-position="false" type="text" placeholder="请输入关键字搜索" confirm-type="search" @input="clearInput" @confirm="getList" />
					<text v-if="showClearIcon" class="cuIcon-roundclose size30 text-red" @click="clearIcon"></text>
					<text class="search-btn" @click="getList">搜索</text>
				</view>
			</view>
			<!-- <scroll-view scroll-x class="tabbar">
				<view v-for="(item, index) in tabList" :key="index" class="flex align-center" @click="index === tabList.length-1?'':getList(item.id, item.orgCode)">
					<view :class="index === tabList.length-1?'tabbar-title':'tabbar-ontitle'">{{ item.orgName }}</view>
					<text v-if="index !== tabList.length-1" class="cuIcon-right text-gray"></text>
				</view>
			</scroll-view> -->
		</view>
		<view v-for="(item,index) in list" :key="index" class="list-section">
			<view v-if="item.comprehensiveSearchType === 'LINKMAN'">
				<view class="list-title">联系人</view>
				<view v-for="(res, index) in item.list" :key="index"  class="organize flex align-center" @click="navToUserInfo(res)">
					<image class="organize-icon" :src="res.avatar? res.avatar:avatar" mode=""></image>
					<view class="margin-mleft">
						<rich-text class="size32" :nodes="res.userName"></rich-text>
						<!-- <view class="organize-title">{{ res.userName }}</view> -->
						<view class="organize-position">{{ res.orgName }}</view>
					</view>
				</view>
			</view>
			<view v-if="item.comprehensiveSearchType === 'APPLICATION'">
				<view class="list-title">应用</view>
				<view v-for="(res, index) in item.list" :key="index"  class="organize flex align-center" @click="navToApp(res)">
					<image class="organize-icon" :src="'/static/icons/svg/' + res.icon + '.svg'" mode=""></image>
					<view class="margin-mleft">
						<rich-text class="size32" :nodes="res.menuName"></rich-text>
						<!-- <view class="organize-title">{{ res.userName }}</view> -->
						<view class="organize-position">{{ res.remark || '暂无简介' }}</view>
					</view>
				</view>
			</view>
		</view>
		<NonePage v-if="list.length===0 && !isHistory" />
		<view v-if="list.length===0 && isHistory" class="history-frame">
			<view class="flex align-center justify-between">
				<view class="size30">搜索历史</view>
				<view class="text-red" @click="clearHistory">清空历史</view>
			</view>
			<view class="flex align-center flex-wrap">
				<view v-for="(item,index) in history" :key="index" class="history-tag" @click="historySearch(item)">{{item || '未知'}}</view>
				<view v-if="history.length===0" class="history-tag">暂无</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { comprehensiveSearch }from "@/config/service/workbench.js"
	import NonePage from "@/components/NonePage/NonePage.vue"
	export default {
		components: {
			NonePage
		},
		data() {
			return {
				statusBarHeight: 0,
				titleHeight: 0,
				naviBarHeight: 0,
				list: [],
				history: [],
				isHistory: true,
				form: {
					keyword: undefined
				},
				showClearIcon: false,
				// 默认头像
				avatar: '/static/avatar.png',
			}
		},
		onLoad(option) {
			const res = uni.getSystemInfoSync()
			const system = res.platform
			this.statusBarHeight = res.statusBarHeight
			if (system === 'android') {
				this.titleHeight = (48 + this.statusBarHeight)
			} else if (system === 'ios') {
				this.titleHeight = (44 + this.statusBarHeight)
			}
			this.naviBarHeight = this.titleHeight - this.statusBarHeight;
			this.history = uni.getStorageSync('historySearch') || [];
		},
		onShow() {
			
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
			getList() {
				uni.hideKeyboard();
				if (this.form.keyword){
					this.history.push(this.form.keyword)
					this.history = [...new Set(this.history)];
					uni.setStorageSync('historySearch', this.history);
					uni.showLoading({mask: true});
					comprehensiveSearch(this.form).then(res => {
						this.isHistory = false;
						this.list = res.data;
						uni.hideLoading();
					});
				} else {
					this.isHistory = true;
					this.list = [];
				}
				
			},
			historySearch(item) {
				this.form.keyword = item;
				this.getList();
			},
			clearHistory() {
				uni.removeStorageSync('history');
				this.history = [];
			},
			navBack() {
				uni.navigateBack({})
			},
			navToUserInfo(res) {
				uni.navigateTo({
					url: '/pages/mailList/userInfo?userCode=' + res.userCode
				})
			},
			navToApp(item) {
				if (item.component) {
					uni.navigateTo({
						url: item.component + '?name='+ item.path
					})
				}
			},
			clearInput(event) {
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon() {
			    this.form.keyword = '';
			    this.showClearIcon = false;
				this.isHistory = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
::v-deep .uni-scroll-view-content{
	display: flex;
}
.history-frame{
	padding: 24upx;
	height: calc(100vh - 100upx);
	background-color: #FFFFFF;
	.history-tag{
		margin-top: 20upx;
		margin-right: 20upx;
		background-color: #ebebeb;
		border-radius: 10upx;
		padding: 6upx 10upx;
		font-size: 24upx;
	}
}
.home-page{
	width: 100vw;
	.top-section{
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: 10;
		background-color: #FFFFFF;
		padding: 30upx;
		.top-frame{
			padding: 0 0 30upx;
			font-size: 36upx;
			font-weight: 500;
		}
		.tabbar{
			width: 100%;
			white-space: nowrap;
			.tabbar-ontitle{
				cursor: pointer;
				margin: 0 10px;
				font-size: 15px;
				color: #1678FF;
			}
			.tabbar-title{
			  margin: 0 10px;
			  font-size: 15px;
			  color: #999;
			}
		}
	}
	.list-section{
		margin-top: 20upx;
		background-color: #FFFFFF;
		.list-title{
			padding: 20upx 0;
			font-size: 24upx;
			margin-left: 24upx;
			border-bottom: 1upx solid #ebebeb;
			color: #999999;
		}
	}
}
.search-container{
	position: fixed;
	top: 0;
	width: 100vw;
	background-color: #1678FF;
	z-index: 10;
	padding: 0 24upx;
	.search-form{
		border-radius: 12upx;
		margin: 0 20upx;
	}
	.search-btn{
		width: 125upx;
		font-size: 32upx;
		font-weight: bold;
		color: #1678FF;
		line-height: 48upx;
		text-align: center;
		border-left: 1upx solid #D0E4FF;
	}
}
.organize{
	// background-color: #FFFFFF;
	cursor: pointer;
	margin-bottom: 4px;
	border-radius: 8px;
	padding: 10px 20px;
	.organize-icon{
		border-radius: 7px;
		height: 40px;
		width: 40px;
	}
	.organize-click{
		color: #AFB7C3;
	}
	.organize-title{
		font-size: 32upx;
		overflow: hidden; //超出隐藏
		white-space: nowrap; //
		text-overflow: ellipsis;
	}
	.organize-shu{
		margin: 0 10px;
		height: 10px;
		width: 10px;
		border-left: 1px solid #AFB7C3;
		border-bottom: 1px solid #AFB7C3;
	}
	.organize-position{
		color: #999999;
	}
}
</style>
