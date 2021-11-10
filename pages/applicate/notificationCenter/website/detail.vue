<template>
	<view>
		<view class="banner">
			<image class="banner-img" :src="news.newsPrefaceImg"></image>
			<view class="banner-title">{{news.newsTitle}}</view>
		</view>
		<view class="article-meta flex align-center">
			<text class="article-author">{{selectDictLabel(newsTypeOptions, news.newsType)}}</text>
			<text class="article-text">发表于</text>
			<text class="article-time">{{parseTime(news.newsPublishTime, '{y}/{m}/{d} {h}:{i}')}}</text>
		</view>
		<view class="article-content">
			<rich-text :nodes="news.newsContent"></rich-text>
		</view>
		<!-- #ifdef MP-WEIXIN || MP-QQ -->
		<!-- <ad v-if="htmlNodes.length > 0" unit-id="adunit-01b7a010bf53d74e"></ad> -->
		<!-- #endif -->
	</view>
</template>

<script>
	import { detailNews }from "@/config/service/workbench.js"
	export default {
		data() {
			return {
				news: {},
				newsTypeOptions: [
					{ 'dictLabel': '公司新闻 ', 'dictValue': 1 },
					{ 'dictLabel': '行业动态', 'dictValue': 2 },
					{ 'dictLabel': '公司荣誉', 'dictValue': 3 }
				]
			}
		},
		onLoad(event) {
			this.getDetail(event.code);
		},
		methods: {
			getDetail(e) {
				detailNews(e).then(res => {
					this.news = res.data;
					uni.setNavigationBarTitle({
						title: this.news.newsTitle
					});
				});
			}
		}
	}
</script>

<style>
	.banner {
		height: 360rpx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
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
		/* line-height: 42rpx; */
		color: white;
		z-index: 11;
	}

	.article-meta {
		padding: 20rpx 40rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26rpx;
		/* line-height: 50rpx; */
		margin: 0 20rpx;
	}

	.article-author,
	.article-time {
		font-size: 30rpx;
	}

	.article-content {
		padding: 0 30rpx;
		overflow: hidden;
		font-size: 30rpx;
		margin-bottom: 30rpx;
	}
</style>
