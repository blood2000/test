<template>
	<view class="home-page">
		<view v-for="(item,index) in applicateList" :key="index" class="appall-section">
			<view class="size36">{{item.menuName}}</view>
			<view class="flex align-center flex-wrap margin-top">
				<view v-for="(res,index) in item.children" :key="index" class="appall-frame" @click="navToApplicate(res)">
					<image class="appall-icon" :src="'/static/icons/svg/' + res.icon + '.svg'" mode=""></image>
					<view class="size26 text-cont ellipsis">{{res.menuName}}</view>
				</view>
			</view>
		</view>
		<NonePage v-if="applicateList.length===0" :msg="'暂无应用，请联系管理员授权'" />
		
		<!-- 底部操作栏 -->
		<view :class="system==='android'?'bar-frame-android':system==='ios'?'bar-frame-ios':'bar-frame'" class="cu-bar tabbar bg-white">
			<view class="action" @click="navToMail">
				<image class="bar-icon" src="/static/tabbar/mail.png" mode=""></image>
				<view class="bar-title">通讯录</view>
			</view>
			<view class="action" @click="navToApp">
				<image class="bar-icon" src="/static/tabbar/app_cur.png" mode=""></image>
				<view class="bar-title bar-ontitle">应用</view>
			</view>
			<view class="text-center bar-workframe" @click="navToWork">
				<image class="bar-work" src="/static/tabbar/work.png" mode=""></image>
			</view>
			<view class="action" @click="navToUpcoming">
				<image class="bar-icon" src="/static/tabbar/upcoming.png" mode=""></image>
				<view class="bar-title">待办</view>
			</view>
			<view class="action" @click="navToUser">
				<image class="bar-icon" src="/static/tabbar/my.png" mode=""></image>
				<view class="bar-title">我的</view>
			</view>
		</view>
		<view style="height: 100upx;"></view>
	</view>
</template>

<script>
	import { applicateList }from "@/config/service/workbench.js"
	import NonePage from "@/components/NonePage/NonePage.vue"
	export default {
		components: {
			NonePage
		},
		data() {
			return {
				modalName: undefined,
				applicateList: [],
				system: null
			}
		},
		mounted() {
		},
		onLoad() {
			this.getAllList();
			uni.hideTabBar({});
			const res = uni.getSystemInfoSync()
			this.system = res.platform;
		},
		onShow() {
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null
			},
			// 获取全部应用列表
			getAllList() {
				applicateList().then(res => {
					const menu = res.data.find(res => res.menuCode === 'a35df88f239b41fe9339ee1ab856b349')
					this.applicateList = menu? menu.children: [];
				});
			},
			navToApplicate(item) {
				console.log(item);
				if (item.component) {
					uni.navigateTo({
						url: item.component + '?name='+ item.path + '&titleName=' + item.menuName
					})
				} else {
					this.msgSuccess('暂未配置该应用路径，请联系管理员')
				}
			},
			navToUpcoming(){
				uni.setStorageSync('TabCur', 1);
				uni.switchTab({
					url:'/pages/upcoming/index'
				})
			},
			navToApp(){
				uni.switchTab({
					url:'/pages/applicate/index'
				})
			},
			navToMail(){
				uni.switchTab({
					url:'/pages/mailList/index'
				})
			},
			navToUser(){
				uni.switchTab({
					url:'/pages/user/index'
				})
			},
			navToWork(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.home-page{
	width: 100vw;
	
}
.appall-section{
	text-align: left;
	padding: 24upx;
	margin-top: 20upx;
	background-color: #FFFFFF;
	.appall-frame{
		text-align: center;
		width: 23%;
		margin: 0 6upx 20upx;
		.appall-icon{
			width: 66upx;
			height: 66upx;
		}
	}
	
}
</style>
