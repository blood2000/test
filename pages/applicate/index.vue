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
		<Tabbar :cur="'app'" :height="true" />
	</view>
</template>

<script>
	import { applicateList }from "@/config/service/workbench.js"
	import NonePage from "@/components/NonePage/NonePage.vue"
	import Tabbar from '@/components/Tabbar/Tabbar.vue';
	export default {
		components: {
			NonePage,
			Tabbar
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
					const menu = res.data.find(res => res.menuCode === 'effa34f2a138424182c45496e37f6266')
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
