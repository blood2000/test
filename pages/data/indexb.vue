<template>
	<view>
		<web-view :src="url + modelId + '&token=' + token"></web-view>
	</view>
</template>

<script>
import { getDataModel, searchDataModel } from '@/config/service/data/dataCenter.js';
import { deepClone } from '@/utils/index';
import { getDicts } from '@/config/data.js';
export default {
	name: '',
	components: {
		
	},
	data() {
		return {
			modelId: null,
			url: 'http://192.168.30.64:8090/#/pages/generalTable/index?id=',
			statusBarHeight: 0,
			token: uni.getStorageSync('token')
		};
	},
	onLoad(option) {
		const res = uni.getSystemInfoSync()
		this.statusBarHeight = res.statusBarHeight
		const path = option.name;
		const pathArr = path.split('/');
		const index = pathArr.length - 1;
		this.modelId = pathArr[index];
		this.getDataModelData();
	},
	methods: {
		/** 获取模型数据 */
		getDataModelData() {
			getDataModel(this.modelId).then(res => {
				uni.setNavigationBarTitle({
					title: res.data.name
				});
			});
		}
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