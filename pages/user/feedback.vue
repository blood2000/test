<template>
	<view class="home-page">
		<form>
			<view class="cu-form-group margin-top">
				<textarea class="form-textarea" v-model="form.remark" maxlength="-1" :disabled="modalName!=null" placeholder="说点什么吧..."></textarea>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">联系方式</view>
				<input v-model="form.phone" placeholder="请输入您的联系方式" maxlength="20" name="input"></input>
			</view>
		</form>
		<button class="btn-yes" type="default" @click="feedBack">提交反馈</button>
	</view>
</template>

<script>
	import { feedBack }from "@/config/service/user.js"
	export default {
		components: {
		},
		data() {
			return {
				modalName: undefined,
				userInfo: {},
				form: {
					remark: undefined,
					phone: undefined
				}
			}
		},
		onLoad() {
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo');
			this.form.phone = this.userInfo.phonenumber
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null
			},
			feedBack() {
				uni.showLoading({mask: true});
				feedBack(this.form).then(res => {
					this.form.remark = undefined;
					uni.showToast({title: '提交反馈成功',icon: 'none', duration: 1000});
					uni.hideLoading();
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.home-page{
	width: 100vw;
}
.user-avatar{
	height: 80upx;
	width: 80upx;
	border-radius: 10upx;
}
.form-textarea{
	font-size: 28upx;
	text-align: left;
	border: 1upx solid #ebebeb;
	border-radius: 16upx;
	height: 300upx;
	padding: 24upx;
}
.btn-yes{
	margin: 80upx 70upx 30upx;
	height: 88upx;
	border-radius: 100upx;
	font-size: 36upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	background-color: #1678FF;
}
</style>
