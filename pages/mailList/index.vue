<template>
	<view class="home-page">
		<view class="organize flex align-center justify-between" @click="handleShow">
			<view class="flex align-center">
				<image class="organize-icon" src="/static/icons/svg/mail/mail-orgtop.svg" mode=""></image>
				<!-- <view class="organize-title">{{ orgInfo && orgInfo.rootOrgName }}</view> -->
				<view class="organize-title">{{orgInfo.rootOrgName}}</view>
			</view>
			<text class="organize-click" :class="showChild?'cuIcon-fold':'cuIcon-unfold'" />
		</view>
		<view v-if="showChild">
			<!-- 主管列表 -->
			<view v-for="(res, index) in leaderList" :key="res.userCode"  class="organize flex align-center" @click="navToUserInfo(res)">
				<image class="organize-icon shadow-warp bg-white" :src="res.avatar? res.avatar:avatar" mode="aspectFill"></image>
				<view>
					<view class="organize-title">{{ res.userName }}</view>
					<view class="organize-position">{{ res.postName }}</view>
				</view>
			</view>
			<!-- '110409', '66389dbe97ec4c86ab2e8afa602b2981' -->
			<view class="organize flex align-center justify-between" :class="organizeName === '组织架构'? 'organize-bg':''" @click="handleShowOrg(orgInfo.rootOrgId, orgInfo.rootOrgCode, '组织架构')">
				<view class="flex align-center">
					<view class="organize-shu"></view>
					<view class="organize-title">组织架构</view>
				</view>
				<text class="cuIcon-right text-gray"></text>
			</view>
			<view class="organize flex align-center justify-between" :class="organizeName === orgInfo.orgNameByUser? 'organize-bg':''" @click="handleShowOrg(orgInfo.orgIdByUser, orgInfo.orgCodeByUser, orgInfo.orgNameByUser)">
				<view class="flex align-center">
					<view class="organize-shu"></view>
					<view class="organize-title">{{ orgInfo.orgNameByUser }}</view>
				</view>
				<text class="cuIcon-right text-gray"></text>
			</view>
		</view>
		
		<!-- 底部操作栏 -->
		<Tabbar :cur="'mail'" :height="false" />
	</view>
</template>

<script>
	import { getAddressBook, getAddressList }from "@/config/service/mail.js"
	import { DebounceFun }from "@/utils/ddc.js"
	import Tabbar from '@/components/Tabbar/Tabbar.vue';
	export default {
		components: {
			Tabbar
		},
		data() {
			return {
				// 默认头像
				avatar: '/static/avatar.png',
				showChild: true,
				orgInfo: {},
				organizeName: '',
				leaderList: [],
				system: null
			}
		},
		mounted() {
		},
		onLoad(option) {
			this.getList();
			uni.hideTabBar({});
			const res = uni.getSystemInfoSync()
			this.system = res.platform;
		},
		onShow() {
			
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
			getList() {
				uni.showLoading({mask: true});
				getAddressBook('7beacecadf4341fa81232781beb71b08').then(response => {
					this.orgInfo = response.data;
					// this.handleShowOrg(response.data.orgIdByUser, response.data.orgCodeByUser, this.orgInfo.orgNameByUser);
					this.getLeader('110409', '66389dbe97ec4c86ab2e8afa602b2981')
					uni.hideLoading();
				});
			},
			getLeader(orgId, orgCode) {
				getAddressList(orgId, orgCode).then(res => {
					this.leaderList = res.data.childLeaderUserList;
				});
			},
			handleShow() {
				this.showChild = !this.showChild;
			},
			handleShowOrg(orgId, orgCode, organizeName) {
				this.organizeName = organizeName;
				uni.navigateTo({
					url:'/pages/mailList/userList?orgId=' + orgId + '&orgCode=' + orgCode
				})
				// this.addInfo = {
				// 	orgId: orgId,
				// 	produceCode: '7beacecadf4341fa81232781beb71b08',
				// 	orgCode: orgCode
				// };
				// getAddressList(orgId, orgCode).then(res => {
				// 	this.orgList = res.data.childOrgList;
				// 	this.userList = res.data.childUserList;
				// 	this.tabList = res.data.parentDeptList;
				// });
			},
			navToUserInfo(res) {
				uni.navigateTo({
					url: '/pages/mailList/userInfo?userCode=' + res.userCode
				})
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
	// height: 100%;
	background-color: #FFFFFF;
	margin-top: 30upx;
	padding: 30upx 0 30upx;
}
.organize{
	// background-color: #FFFFFF;
	cursor: pointer;
	margin-bottom: 4px;
	border-radius: 8px;
	padding: 10px 20px;
	.organize-icon{
		border-radius: 7px;
		height: 40px;
		width: 40px;
	}
	.organize-click{
		color: #AFB7C3;
	}
	.organize-title{
		margin: 0 10px;
		font-size: 32upx;
		overflow: hidden; //超出隐藏
		white-space: nowrap; //
		text-overflow: ellipsis;
	}
	.organize-shu{
		margin: 0 10px;
		height: 10px;
		width: 10px;
		border-left: 1px solid #AFB7C3;
		border-bottom: 1px solid #AFB7C3;
	}
	.organize-position{
		color: #999999;
		margin: 0 10px;
	}
}
</style>
