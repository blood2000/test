<template>
	<view>
		<web-view :src="webViewUrl"></web-view>
	</view>
</template>

<script>
import baseURL from '@/config/index.js';

export default {
	name: '',
	components: {
		
	},
	data() {
		return {
			webViewUrl:null,
			modelId: null,
			url: null,
			statusBarHeight: this.StatusBar,
			token: uni.getStorageSync('token'),
		};
	},
	onLoad(option) {
		uni.getLocation({
			type: 'gcj02',
			geocode:true,
			success: (res => {
				this.webViewUrl = this.url + '?statusBarHeight=' + this.statusBarHeight + '&token=' + this.token +'&location=' + JSON.stringify(res)
			}),
			fail: function (res) {
				uni.hideLoading();
				uni.showToast({title: '获取定位失败，请检查是否开启位置权限',icon: 'none', duration: 1000});
			}
		});
		if (baseURL.indexOf("124.71.25.3") !== -1) {
			this.url = 'http://h5.zjjy.zjz1.net/#/' + option.name // 集运站h5线上
		} else if (baseURL.indexOf("10.0.0.75") !== -1) {
			this.url = 'http://10.0.0.75:8310/#/' + option.name // 75测试
		}
		// this.url = 'http://192.168.30.89:8090/#/' + option.name // 本地
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
	
</style>