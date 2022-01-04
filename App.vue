<script>
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif

					console.log(Vue.prototype.StatusBar);
				}
			})
			// uni.onTabBarMidButtonTap(() => {
			// 	uni.reLaunch({
			// 		url: "/pages/index/index",
			// 		animationType: "slide-in-bottom",
			// 		animationDuration: 150
			// 	})
			// })
			if (!uni.getStorageSync('token')) {
				uni.reLaunch({
					url: '/pages/public/applogin'
				});
			}
		},
		
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang='scss'>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "common/uni.css";
	@import "@/common/css/tabbar.scss";
	/* @import "@/common/css/icon.scss";*/
	@import "@/common/font/index.scss"; 
	/*每个页面公共css */
	
	.app-container{
		background-color: #FFFFFF;
		border-radius: 16upx;
		overflow: hidden;
		margin: 0 24upx;
	}
	.padding-m{
		padding: 24upx;
	}
	.margin-stop{
		margin-top: 10upx;
	}
	.margin-mtop{
		margin-top: 24upx;
	}
	.margin-sbottom{
		margin-bottom: 10upx;
	}
	.margin-mbottom{
		margin-bottom: 20upx;
	}
	.margin-sright{
		margin-right: 10upx;
	}
	.margin-mright{
		margin-right: 20upx;
	}
	.margin-sleft{
		margin-left: 10upx;
	}
	.margin-mleft{
		margin-left: 20upx;
	}
	.margin-stb{
		margin: 10upx 0;
	}
	.margin-mtb{
		margin: 20upx 0;
	}
	.margin-slr{
		margin: 0 10upx;
	}
	.padding-stb{
		padding: 10upx 0;
	}
	.padding-mbottom{
		padding-bottom: 20upx;
	}
	.border-bottom{
		border-bottom: 1upx solid #EBEBEB;
	}
	.size20{
		font-size: 20upx;
	}
	.size24{
		font-size: 24upx;
	}
	.size26{
		font-size: 26upx;
	}
	.size30{
		font-size: 30upx;
	}
	.size32{
		font-size: 32upx;
	}
	.size36{
		font-size: 36upx;
	}
	.size40{
		font-size: 40upx;
	}
	.size46{
		font-size: 46upx;
	}
	.size52{
		font-size: 52upx;
	}
	.text-title{
		color: #333333;
	}
	.text-cont{
		color: #666666;
	}
	.text-tag{
		color: #999999;
	}
	.ellipsis{
		overflow: hidden; //超出隐藏
		white-space: nowrap; //
		text-overflow: ellipsis;
	}
	
	.form-group-to +.form-group-to{
		border-top: 0.5px solid #eee;
	}
	.form-group-to{
		border-top: 0.5px solid #eee;
	}
	

	
	uni-page-wrapper{
		/* background: #F5F5F5; */
	}
	uni-page-body {
		width: 100%;
		/* height: 100%; */
		overflow: hidden;
	}
	::v-deep .uni-tabbar__icon__diff{
		height: 82upx !important;
		width: 82upx !important;
	}
	::v-deep .uni-tabbar__icon__diff img{
		height: 82upx !important;
		width: 82upx !important;
	}
</style>
