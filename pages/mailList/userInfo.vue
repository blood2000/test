<template>
	<view class="home-page">
		<view class="top-section flex align-center">
			<image class="top-avatar shadow-warp bg-white" :src="userInfo.avatar? userInfo.avatar:avatar" mode=""></image>
			<view class="top-name">{{ userInfo.userName?userInfo.userName:'暂无' }}</view>
		</view>
		<view class="info-section">
			<view class="cu-list menu sm-border">
				<view class="cu-item">
					<view class="content flex">
						<view class="info-title text-grey">企业/组织</view>
						<text class="text-black">福建大道成物流科技有限公司</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content flex">
						<view class="info-title text-grey">姓名</view>
						<text class="text-black">{{ userInfo.userName?userInfo.userName:'-' }}</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="handleCall(userInfo.phonenumber)">
					<view class="content flex">
						<view class="info-title text-grey">手机号</view>
						<text class="text-black">{{ userInfo.phonenumber?userInfo.phonenumber:'-' }}</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="handleShowOrg(userInfo.orgId, userInfo.orgCode)">
					<view class="content flex">
						<view class="info-title text-grey">部门</view>
						<text class="text-black">{{ userInfo.org.orgName?userInfo.org.orgName:'-' }}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content flex">
						<view class="info-title text-grey">职位</view>
						<text class="text-black">{{ userInfo.postName?userInfo.postName:'-' }}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content flex">
						<view class="info-title text-grey">工号</view>
						<text class="text-black">{{ userInfo.workNo?userInfo.workNo:'-' }}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content flex">
						<view class="info-title text-grey">入职时间</view>
						<text class="text-black">{{ userInfo.entryTime?parseTime(userInfo.entryTime, '{y}-{m}-{d}'):'-' }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getUserDetail }from "@/config/service/mail.js"
	export default {
		components: {
		},
		data() {
			return {
				userInfo: {
					org: {}
				},
				// 默认头像
				avatar: '/static/avatar.png',
			}
		},
		onLoad(option) {
			this.getInfo(option.userCode);
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
			getInfo(userCode) {
				uni.showLoading({mask: true});
				getUserDetail(userCode).then(res => {
					this.userInfo = res.data;
					uni.hideLoading();
				});
			},
			handleShowOrg(orgId, orgCode) {
				if(orgId && orgCode){
					uni.navigateTo({
						url:'/pages/mailList/userList?orgId=' + orgId + '&orgCode=' + orgCode
					})
				}else{
					uni.showToast({title: '未查询到组织',icon: 'none', duration: 2000});
				}
			},
			handleCall(phone){
				if (phone) {
					uni.makePhoneCall({
					    phoneNumber: phone //仅为示例
					});
				}
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
			margin-left: 50upx;
			font-size: 32upx;
			font-weight: 700;
		}
	}
	.info-section{
		margin-top: 20upx;
		background-color: #FFFFFF;
		.info-title{
			width: 170upx;
		}
	}
}
</style>
