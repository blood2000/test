<template>
	<view>
		<web-view :src="url + '?statusBarHeight=' + statusBarHeight + '&token=' + token"></web-view>
	</view>
</template>

<script>
import { getDataModel, searchDataModel } from '@/config/service/data/dataCenter.js';
import { deepClone } from '@/utils/index';
import { getDicts } from '@/config/data.js';
import baseURL from '@/config/index.js';
export default {
	name: '',
	components: {
		
	},
	data() {
		return {
			modelId: null,
			url: null,
			statusBarHeight: this.StatusBar,
			token: uni.getStorageSync('token')
		};
	},
	onLoad(option) {
		// const res = uni.getSystemInfoSync()
		// this.statusBarHeight = res.statusBarHeight
		console.log(this.statusBarHeight);
		uni.setNavigationBarTitle({
			title: option.titleName
		})
		if (baseURL.indexOf("124.71.25.3") !== -1) {
			this.url = 'http://h5.zjjy.zjz1.net/#/' + option.name // 集运站h5线上
		} else if (baseURL.indexOf("10.0.0.75") !== -1) {
			this.url = 'http://10.0.0.75:8310/#/' + option.name // 75测试
		}
		// this.url = 'http://192.168.30.54:8090/#/' + option.name // 本地
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
	.form-btn{
		margin: 0 30upx;
		width: 50%;
		line-height: 70upx;
	}
	.uni-forms-item{
		padding: 0 30upx;
	}
	::v-deep select{
		width: 100%;
		border: 1upx solid #ebebeb;
		border-radius: 4upx;
		height: 72upx;
	}
	.cont-frame{
		padding: 20upx;
		background-color: #FFFFFF;
		margin: 24upx 24upx 0;
		border-radius: 20upx;
	}
	.form-frame{
		border-top: 1upx solid #ebebeb;
		padding: 0px 30upx;
		min-height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.title {
			color: #999999;
			min-width: calc(4em + 30upx);
			text-align: justify;
			padding-right: 30upx;
			font-size: 30upx;
			position: relative;
			height: 60upx;
			line-height: 60upx;
		}
	}
</style>