<template>
	<view class="container">
		<view class="title">手机号验证登录</view>
		<view class="frame flex align-center">
			<view class="area">+86<text class="cuIcon-unfold margin-sleft"></text><text class="text-gray margin-sleft margin-mright"> | </text></view>
			<input v-model="params.telno" class="phone" type="number" placeholder="请输入手机号" />
		</view>
		<xl-slider-verify sliderBlockBg="#F8F8F8" forntBg="#3A65FF" initText="请按住拖至最右边" style="margin: 0 54upx;" @success="verifySuccess" />
	</view>
</template>

<script>
	import xlSliderVerify from '@/components/xl-slider-verify/xl-slider-verify.vue'
	import { sendSms } from "@/config/service/login.js"
	export default{
		components: {
			xlSliderVerify
		},
		data(){
			return {
				params: {
					telno: uni.getStorageSync('telno') || null,
					type: 'login'
				}
			}
		},
		onLoad(options){
		},
		methods: {
			verifySuccess() {
				if(this.params.telno){
					sendSms(this.params).then(res => {
						uni.setStorageSync('telno', this.params.telno);
						uni.navigateTo({
							url: '/pages/public/code'
						})
					}).catch(() => {
						uni.setStorageSync('telno', this.params.telno);
						uni.navigateTo({
							url: '/pages/public/code'
						})
					})
				}else {
					this.msgSuccess('请先输入手机号');
				}
			}
		},

	}
</script>

<style lang='scss' scoped>
	page{
		background: #fff;
	}
	.title{
		margin-top: 220upx;
		text-align: center;
		font-family: 'PingFang Regular';
		font-size: 56upx;
		font-weight: bold;
		color: #000000;
	}
	.frame{
		margin: 156upx 54upx 66upx;
		padding: 36upx 24upx;
		height: 96upx;
		background: #F8F8F8;
		border-radius: 10upx;
		.area{
			font-size: 32upx;
			font-family: 'PingFang Regular';
			font-weight: bold;
			color: #000000;
		}
	}
</style>
