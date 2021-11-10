<template>
	<view class="home-page">
		<view v-for="(item,index) in applicateList" :key="index" class="appall-section">
			<view class="size36">{{item.menuName}}</view>
			<view class="flex align-center flex-wrap margin-top">
				<view v-for="(res,index) in item.children" :key="index" class="appall-frame" @click="navToApplicate(res)">
					<image class="appall-icon" :src="'/static/icons/svg/' + res.icon + '.svg'" mode=""></image>
					<view class="size26 text-cont">{{res.menuName}}</view>
				</view>
			</view>
		</view>
		<NonePage v-if="applicateList.length===0" :msg="'暂无应用，请联系管理员授权'" />
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
				applicateList: []
			}
		},
		onLoad() {
		},
		onShow() {
			this.getAllList();
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
					const menu = res.data.find(res => res.menuId === 2837)
					this.applicateList = menu? menu.children: [];
				});
			},
			navToApplicate(item) {
				console.log(item);
				if (item.component) {
					uni.navigateTo({
						url: item.component + '?name='+ item.path
					})
				} else {
					this.msgSuccess('暂未配置该应用路径，请联系管理员')
				}
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
		width: 25%;
		.appall-icon{
			width: 66upx;
			height: 66upx;
		}
	}
	
}
</style>
