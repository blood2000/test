<template>
	<view class="home-page">
		<view class="cu-list menu sm-border">
			<view class="cu-item margin-mtop arrow" @click="clearCache">
				<view class="content">
					<text class="text-black">清除缓存</text>
				</view>
				<view class="action">
					<text class="text-black">{{ cacheSize }}</text>
				</view>
			</view>
		</view>
		<button class="btn-yes" type="default" @click="loginOut">退出登录</button>
		<!-- 底部操作栏 -->
		<!-- <Tabbar :cur="'my'" :height="true" /> -->
	</view>
</template>

<script>
	import { loginOut }from "@/config/service/user.js"
	import Tabbar from '@/components/Tabbar/Tabbar.vue';
	export default {
		components: {
			Tabbar
		},
		data() {
			return {
				userInfo: {
				},
				// 默认头像
				avatar: '/static/avatar.png',
				cacheSize: ''
			}
		},
		mounted() {
		},
		onLoad() {
			uni.hideTabBar({});
			const res = uni.getSystemInfoSync()
			this.system = res.platform;
			// #ifdef APP-PLUS
			var self = this;
			plus.cache.calculate(function(size) { //size是多少个字节单位是b
			    //做下面相应的处理
			    if (size < 1024) {
			        self.cacheSize = size + 'B';
			    } else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
			        self.cacheSize = Math.floor(size / 1024 * 100) / 100 + 'KB';
			    } else if (size / 1024 / 1024 >= 1) {
			        self.cacheSize = Math.floor(size / 1024 / 1024 * 100) / 100 + 'M';
			    }
			});
			// #endif
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo');
		},
		methods: {
			showModal(e) {
				if(!this.isBind){
					this.modalName = e.currentTarget.dataset.target
				}
			},
			hideModal(e) {
				this.modalName = null
			},
			clearCache() {
			    // #ifdef APP-PLUS
			    var self = this;
			    //使用plus.cache.clear 清除应用中的缓存数据
			    plus.cache.clear(function() {
			        uni.showToast({
			            title: '清除成功!',
			            icon: 'none',
			            success() {
			                self.cacheSize = '0B'
			            }
			        })
			    });
			    // #endif
			},
			loginOut() {
				loginOut().then(() => {
					uni.removeStorageSync('userInfo');
					uni.removeStorageSync('token');
					uni.showToast({title: '退出登录成功',icon: 'none', duration: 1000});
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/public/applogin'
						})
					}, 1000)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
::v-deep .uni-scroll-view-content{
	display: flex;
}
.home-page{
	width: 100vw;
	.top-section{
		padding: 30upx;
		background-color: #FFFFFF;
		.top-avatar{
			height: 120upx;
			width: 120upx;
			border-radius: 16upx;
		}
		.top-name{
			font-size: 32upx;
			font-weight: 700;
		}
	}
	.info-section{
		margin-top: 20upx;
		// background-color: #FFFFFF;
		.info-title{
			width: 170upx;
		}
	}
}
.btn-yes{
	margin: 80upx 70upx 30upx;
	height: 88upx;
	border: 1upx solid #e54d42;
	border-radius: 10upx;
	font-size: 36upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #e54d42;
}
</style>
