<template>
	<view>
		<web-view :src="url + '?statusBarHeight=' + statusBarHeight + '&token=' + token +'&location=' + location"></web-view>
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
			modelId: null,
			url: null,
			statusBarHeight: this.StatusBar,
			token: uni.getStorageSync('token')
			location: null,
		};
	},
	onLoad(option) {
		// const res = uni.getSystemInfoSync()
		// this.statusBarHeight = res.statusBarHeight
		// console.log(this.statusBarHeight);
		// uni.setNavigationBarTitle({
		// 	title: option.titleName
		// })
		if (baseURL.indexOf("124.71.25.3") !== -1) {
			this.url = 'http://h5.zjjy.zjz1.net/#/' + option.name // 集运站h5线上
		} else if (baseURL.indexOf("10.0.0.75") !== -1) {
			this.url = 'http://10.0.0.75:8310/#/' + option.name // 75测试
		}
		// this.url = 'http://192.168.30.54:8090/#/pages/workbench/index' // 本地
		uni.getLocation({
			type: 'wgs84',
			geocode:true,
			success: (res => {
				this.location = res;
				// console.log(res);
			}),
			fail: function (res) {
				uni.hideLoading();
				uni.showToast({title: '获取定位失败，请检查是否开启位置权限',icon: 'none', duration: 1000});
			}
		});
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
	
</style>