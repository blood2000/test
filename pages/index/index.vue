<template>
	<view>
		<web-view :src="url + '?statusBarHeight=' + statusBarHeight + '&token=' + token"></web-view>
	</view>
</template>

<script>
import { getDataModel, searchDataModel } from '@/config/service/data/dataCenter.js';
import baseURL from '@/config/index.js';
var wv;//计划创建的webview
export default {
	name: '',
	components: {
	},
	data() {
		return {
			modelId: null,
			url: '',
			// url: 'http://192.168.30.54:8090/#/pages/workbench/index',
			statusBarHeight: this.StatusBar,
			token: uni.getStorageSync('token'),
			system: null,
			windowHeight: 0
		};
	},
	onLoad(option) {
		console.log(this.token)
		uni.hideTabBar({});
		const res = uni.getSystemInfoSync()
		this.system = res.platform;
		// #ifdef APP-PLUS
		if (baseURL.indexOf("h5.zjjy.zjz1.net") !== -1) {
			this.url = 'http://h5.zjjy.zjz1.net/#/pages/workbench/index' // 集运站h5线上
		} else if (baseURL.indexOf("10.0.0.75") !== -1) {
			this.url = 'http://10.0.0.75:8310/#/pages/workbench/index' // 75测试
		}
		// this.url = 'http://192.168.30.54:8090/#/pages/workbench/index' // 本地
		// #endif
		// #ifdef H5
		// this.url = 'http://192.168.30.54:8091/#/pages/workbench/index'
		this.url = 'http://h5.zjjy.zjz1.net/#/pages/workbench/index' // 集运站h5线上
		// #endif
	},
	onShow() {
		// #ifdef APP-PLUS
		var currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
		setTimeout(function() {
			wv = currentWebview.children()[0]
			wv.evalJS('window.getData()')
		}, 1000); //如果是页面初始化调用时，需要延时一下
		// #endif
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
</style>