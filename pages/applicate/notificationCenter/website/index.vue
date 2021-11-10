<template>
	<view class="home-page">
		<view v-if="list.length>0" class="banner" @click="goDetail(list[0].code)">
			<image class="banner-img" mode="aspectFill" :src="list[0].newsPrefaceImg"></image>
			<view class="banner-title">{{ list[0].newsTitle }}</view>
		</view>
		<view class="uni-list">
			<view v-for="(value, index) in list" :key="index">
				<block v-if="index !== 0">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="goDetail(value.code)">
						<view class="uni-media-list">
							<image mode="aspectFill" class="uni-media-list-logo" :src="value.newsPrefaceImg"></image>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top">{{ value.newsTitle }}</view>
								<view class="uni-media-list-text-bottom">
									<text>{{ selectDictLabel(newsTypeOptions, value.newsType) }}</text>
									<text>{{ parseTime(value.newsPublishTime, '{y}/{m}/{d} {h}:{i}') }}</text>
								</view>
							</view>
						</view>
					</view>
					<!-- #ifdef APP-PLUS -->
					<!-- <view class="ad-view" v-if="(index > 0 && (index+1) % 10 == 0)">
						<ad :adpid="adpid" @error="aderror"></ad>
					</view> -->
					<!-- #endif -->
				</block>
			</view>
			
		</view>
		<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
	</view>
</template>

<script>
	import { listNews }from "@/config/service/workbench.js"
	export default {
		components: {
		},
		data() {
			return {
				modalName: undefined,
				list: [],
				queryParams: {
					// newsType: undefined,
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
				newsTypeOptions: [
					{ 'dictLabel': '公司新闻 ', 'dictValue': 1 },
					{ 'dictLabel': '行业动态', 'dictValue': 2 },
					{ 'dictLabel': '公司荣誉', 'dictValue': 3 }
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
				listNews(this.queryParams).then(res => {
					if(res.rows.length === 0) {
						this.isEnd = true;
						this.status = 'noMore';
						return
					}
					if(res.rows.length < this.queryParams.pageSize){
						this.status = 'noMore';
					}
					this.list = [...this.list, ...res.rows]
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
