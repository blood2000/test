<template>
	<view class="home-page">
		<view :style="{height:statusBarHeight*2 + 172 +'upx'}"></view>
		<view class="top-section">
			<view :style="{height:statusBarHeight*2+'upx'}"></view>
			<view class="top-frame flex align-center justify-between text-black">
				<text class="cuIcon-back" @click="navBack"></text>
				<view class="top-title">{{tabList.length?tabList[0].orgName:'通讯录'}}</view>
				<!-- <view class="top-title">福建至简至一信息科技有限公司</view> -->
				<text style="width: 20upx;"></text>
			</view>
			<scroll-view scroll-x class="tabbar">
				<view v-for="(item, index) in tabList" :key="index" class="flex align-center" @click="index === tabList.length-1?'':getList(item.id, item.orgCode)">
					<view :class="index === tabList.length-1?'tabbar-title':'tabbar-ontitle'">{{ item.orgName }}</view>
					<text v-if="index !== tabList.length-1" class="cuIcon-right text-gray"></text>
				</view>
			</scroll-view>
		</view>
		<view class="list-section">
			<!-- 主管列表 -->
			<view v-for="(res, index) in leaderList" :key="res.userCode"  class="organize flex align-center" @click="navToUserInfo(res)">
				<image class="organize-icon shadow-warp bg-white" :src="res.avatar? res.avatar:avatar" mode="aspectFill"></image>
				<view>
					<view class="organize-title">{{ res.userName }}</view>
					<view class="organize-position">{{ res.postName }}</view>
				</view>
			</view>
			<!-- 组织列表 -->
			<view v-for="(item, index) in orgList" :key="item.orgCode" class="organize flex align-center justify-between" @click="getList(item.orgId, item.orgCode)">
				<view class="flex align-center">
					<image class="organize-icon" src="/static/icons/svg/mail/mail-orgnode.svg" mode=""></image>
					<view class="organize-title">{{ item.orgName }} <span v-if="item.orgUserCount">({{ item.orgUserCount }}人)</span></view>
				</view>
				<text v-if="index !== tabList.length-1" class="cuIcon-right text-gray"></text>
			</view>
			<!-- 用户列表 -->
			<view v-for="(res, index) in userList" :key="res.userCode"  class="organize flex align-center" @click="navToUserInfo(res)">
				<image class="organize-icon shadow-warp bg-white" :src="res.avatar? res.avatar:avatar" mode="aspectFill"></image>
				<view>
					<view class="organize-title">{{ res.userName }}</view>
					<view class="organize-position">{{ res.postName }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getAddressBook, getAddressList }from "@/config/service/mail.js"
	import { DebounceFun }from "@/utils/ddc.js"
	export default {
		components: {
		},
		data() {
			return {
				addInfo: {},
				orgList: [],
				userList: [],
				leaderList: [],
				tabList: [],
				statusBarHeight: 0,
				titleHeight: 0,
				naviBarHeight: 0,
				// 默认头像
				avatar: '/static/avatar.png',
			}
		},
		onLoad(option) {
			const res = uni.getSystemInfoSync()
			const system = res.platform
			this.statusBarHeight = res.statusBarHeight
			if (system === 'android') {
				this.titleHeight = (48 + this.statusBarHeight)
			} else if (system === 'ios') {
				this.titleHeight = (44 + this.statusBarHeight)
			}
			this.naviBarHeight = this.titleHeight - this.statusBarHeight;
			this.addInfo = {
				orgId: option.orgId,
				produceCode: '7beacecadf4341fa81232781beb71b08',
				orgCode:  option.orgCode
			}
			this.getList(option.orgId, option.orgCode);
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
			getList(orgId, orgCode) {
				uni.showLoading({mask: true});
				getAddressList(orgId, orgCode).then(res => {
					this.orgList = res.data.childOrgList;
					this.userList = res.data.childUserList;
					this.leaderList = res.data.childLeaderUserList;
					this.tabList = res.data.parentDeptList;
					// this.tabList.splice(0, 1);
					uni.hideLoading();
				});
			},
			navBack() {
				uni.navigateBack({})
			},
			navToUserInfo(res) {
				uni.navigateTo({
					url: '/pages/mailList/userInfo?userCode=' + res.userCode
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
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: 10;
		background-color: #FFFFFF;
		padding: 30upx;
		.top-frame{
			padding: 0 0 30upx;
			font-size: 36upx;
			font-weight: 500;
		}
		.tabbar{
			width: 100%;
			white-space: nowrap;
			.tabbar-ontitle{
			  cursor: pointer;
			  margin: 0 10px;
			  font-size: 15px;
			  color: #409EFF;
			}
			.tabbar-title{
			  margin: 0 10px;
			  font-size: 15px;
			  color: #999;
			}
		}
	}
	.list-section{
		margin-top: 20upx;
		background-color: #FFFFFF;
	}
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
