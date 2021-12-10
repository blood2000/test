<template>
	<view>
		<web-view ref="webview" :src="url + '?statusBarHeight=' + statusBarHeight + '&token=' + token" @message="getMessage"></web-view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import baseURL from '@/config/index.js';

console.log(JSON.stringify(process.env));
const webViewUrl = 'http://h5.zjjy.zjz1.net' // 正式上线
// const webViewUrl = 'http://192.168.30.58:8091' // 本地开发



// 当前页面还要试用微信分享, 及图片下载
 import appShare, { closeShare } from '@/uni_modules/zhouWei-APPshare/js_sdk/appShare';
export default {
	data() {
		return {
			url: webViewUrl + '/#/pages/transportPlan/index',
			statusBarHeight: this.StatusBar,
			token: uni.getStorageSync('token'),
			option: null
		};
	},
	
	computed: {
		...mapState({
			info: state => state.user.info,
			nickName: state => state.user.nickName,
		}),
	},
	onLoad(option) {
		// 携带参数
		this.option = {
			...option,
			token: uni.getStorageSync('token'),
			statusBarHeight: this.StatusBar,
		}
		
		// console.log('携带参数~~~:',JSON.stringify(this.option));
		
		// #ifdef APP-PLUS
		// this.url = webViewUrl + '/#/pages/transportPlan/index'
		
		this.url = webViewUrl + '/#/' + option.name
		// #endif
		// #ifdef H5
		// this.url = webViewUrl + '/#/pages/transportPlan/index'
		// this.url = 'http://h5.zjjy.zjz1.net/#/' + option.name
		this.url = webViewUrl + '/#/' + option.name
		// #endif
		
	},
	mounted() {
		// #ifdef APP-PLUS
		// 携带参数
		var currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
		let wv = currentWebview.children()[0]
		setTimeout(()=> {
			wv && wv.evalJS(`window.sendOption(${ JSON.stringify(this.option) })`)
		}, 1000); //如果是页面初始化调用时，需要延时一下
		
		
		// #endif
	},
	
	methods:{
		/*
			抛出2个方法
			// 1.分享朋友圈 onShare({
				shareUrl
				shareTitle
				shareContent
				shareImg
			})
			// 2.长按保存  save(_ba开头的图片地址)
		*/ 
		getMessage(event) {
			// console.log('接收到的参数~~', JSON.stringify(event.detail));
			const { action, data } = event.detail.data[0]
			this[action] && this[action](data)
		},
		
		// 分享
		onShare(option = {}){
			let shareData = {
				shareUrl: option.shareUrl,
				shareTitle: option.shareTitle,
				shareContent: option.shareContent,
				shareImg: option.shareImg,
				appId : option.appId,
				appPath : option.appPath,
				appWebUrl : option.appWebUrl
			};
			// 调用
			let shareObj = appShare(shareData,res => {
				// console.log("分享成功回调",res);
				// 分享成功后关闭弹窗
				// 第一种关闭弹窗的方式
				closeShare();
			});
			setTimeout(() => {
				// 第二种关闭弹窗的方式
				shareObj.close();
			},5000);
		},
	
		// 长按保存
		save(murl){
			uni.saveImageToPhotosAlbum({
				filePath: murl,
				success: function () {
					uni.showToast({
					  title: "保存成功",
					  icon: "none",
					});
				}
			});
		},
	}
};
</script>
