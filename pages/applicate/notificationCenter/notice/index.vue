<template>
	<view class="home-page">
		<view class="app-container padding-m margin-mtop" v-for="(value, index) in list" :key="index">
			<view v-if="value.bigType === 1">
				<view class="flex align-center justify-between">
					<view class="">{{ selectDictLabel(bigtypeOptions, value.bigType) }}</view>
					<l-time class="text-gray margin-mleft" :dateFormat="'MM月dd日 hh:mm'" :text="new Date(value.createTime)"></l-time>
				</view>
				<view class="padding text-center size32 text-bold">{{value.noticeTitle}}</view>
				<view class="flex">
					<view class="text-tag" style="min-width: 120upx;">通知内容</view>
					<view class="margin-mleft"><rich-text :nodes="value.noticeContent"></rich-text></view>
				</view>
				<!-- <view class="flex align-center justify-between margin-top" style="padding-top: 20upx;border-top: 2upx solid #ebebeb;">
					<view class="text-cont">查看详情</view>
					<view class="cuIcon-right text-gray"></view>
				</view> -->
			</view>
			<view v-else>
				<view class="flex align-center justify-between">
					<view class="">{{ selectDictLabel(bigtypeOptions, value.bigType) }}</view>
					<l-time class="text-gray margin-mleft" :dateFormat="'MM月dd日 hh:mm'" :text="new Date(value.createTime)"></l-time>
				</view>
				<view class="padding text-center size32 text-bold">{{value.title}}</view>
				<view class="flex margin-mbottom">
					<view class="text-tag" style="min-width: 120upx;">来源</view>
					<view class="margin-mleft">{{ selectDictLabel(sourceTypeOptions, value.sourceType) }}</view>
				</view>
				<view class="flex">
					<view class="text-tag" style="min-width: 120upx;">通知内容</view>
					<view class="margin-mleft"><rich-text :nodes="value.content"></rich-text></view>
				</view>
				<view class="flex align-center justify-between margin-top" style="padding-top: 20upx;border-top: 2upx solid #ebebeb;">
					<view class="text-cont">查看详情</view>
					<view class="cuIcon-right text-gray"></view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
	</view>
</template>

<script>
	import { userNotice }from "@/config/service/workbench.js"
	import lTime from "@/components/l-time/l-time.vue";
	export default {
		components: {
			lTime
		},
		data() {
			return {
				modalName: undefined,
				list: [],
				queryParams: {
					// userCode: uni.getStorageSync('userInfo').userCode,
					pageNum: 1,
					pageSize: 10
				},
				isEnd: false,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				},
				bigtypeOptions: [
					{ 'dictLabel': '公共公告 ', 'dictValue': 1 },
					{ 'dictLabel': '个人通知 ', 'dictValue': 2 }
				],
				sourceTypeOptions: [
					{ 'dictLabel': '工单 ', 'dictValue': 1 }
				]
			}
		},
		onLoad() {
		},
		onShow() {
			this.getList();
		},
		onPullDownRefresh() {
			this.isEnd = false;
			this.status = 'more';
			this.list = [];
			this.queryParams = {
				pageNum: 1,
				pageSize: 10
			}
			this.getList();
		},
		onReachBottom() {
			console.log("触底")
			if(!this.isEnd) {
				this.status = 'more';
				this.queryParams.pageNum ++
				this.getList();
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null
			},
			// 获取全部应用列表
			getList() {
				this.status = 'loading';
				userNotice(this.queryParams).then(res => {
					if(res.data.rows.length === 0) {
						this.isEnd = true;
						this.status = 'noMore';
						return
					}
					if(res.data.rows.length < this.queryParams.pageSize){
						this.status = 'noMore';
					}
					this.list = [...this.list, ...res.data.rows]
				});
			},
			navToApplicate(item) {
				if (item.component) {
					uni.navigateTo({
						url: item.component
					})
				}
			},
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/applicate/notificationCenter/website/detail?code=' + e
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.home-page{
	width: 100vw;
	height: 100vh;
	background-color: #F5F5F5;
}
.banner {
	height: 360rpx;
	overflow: hidden;
	position: relative;
	// background-color: #ccc;
}
	
.banner-img {
	width: 100%;
}
	
.banner-title {
	max-height: 84rpx;
	overflow: hidden;
	position: absolute;
	left: 30rpx;
	bottom: 30rpx;
	width: 90%;
	font-size: 32rpx;
	font-weight: 400;
	line-height: 42rpx;
	color: white;
	z-index: 11;
}
	
.uni-media-list-logo {
		width: 180rpx;
		height: 140rpx;
}
	
.uni-media-list-body {
	height: auto;
	justify-content: space-around;
}
	
.uni-media-list-text-top {
	height: 74rpx;
	font-size: 28rpx;
	overflow: hidden;
}
	
.uni-media-list-text-bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
</style>
