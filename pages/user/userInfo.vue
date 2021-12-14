<template>
	<view class="home-page">
		<view class="info-section">
			<view class="cu-list menu sm-border">
				<view class="cu-item arrow">
					<view class="content">
						<text class="text-title">头像</text>
					</view>
					<view class="action" @tap="ChooseImage">
						<image class="user-avatar shadow-warp bg-white" :src="userInfo.avatar? userInfo.avatar:avatar" mode=""></image>
					</view>
				</view>
				<view class="cu-item arrow" @tap="showModal" data-target="userName">
					<view class="content">
						<text class="text-title">昵称</text>
					</view>
					<view class="action">
						<view class="text-cont">{{ userInfo.userName?userInfo.userName:'暂无' }}</view>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="text-title">性别</text>
					</view>
					<view class="action">
						<picker @change="PickerChange" :value="index" :range="picker">
							<view class="picker text-cont">
								{{index>-1?picker[index]:'请选择性别'}}
							</view>
						</picker>
						<!-- <view class="text-cont">{{ userInfo.sex?selectDictLabel(sexOptions, userInfo.sex):'暂无' }}</view> -->
					</view>
				</view>
				<view class="cu-item arrow" @tap="showModal" data-target="email">
					<view class="content">
						<text class="text-title">邮箱</text>
					</view>
					<view class="action">
						<view class="text-cont">{{ userInfo.email?userInfo.email:'暂无' }}</view>
					</view>
				</view>
				<view class="cu-item arrow" @tap="showModal" data-target="phonenumber">
					<view class="content">
						<text class="text-title">手机号</text>
					</view>
					<view class="action">
						<view class="text-cont">{{ userInfo.phonenumber?userInfo.phonenumber:'暂无' }}</view>
					</view>
				</view>
				<view class="cu-item margin-mtop">
					<view class="content">
						<text class="text-title">部门</text>
					</view>
					<view class="action">
						<view class="text-cont">{{ userInfo.org?userInfo.org.orgName:'暂无' }}</view>
					</view>
				</view>
				<!-- <view class="cu-item">
					<view class="content">
						<text class="text-title">职位</text>
					</view>
					<view class="action">
						<view class="text-cont">{{ userInfo.postName?userInfo.postName:'暂无' }}</view>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-title">工号</text>
					</view>
					<view class="action">
						<view class="text-cont">{{ userInfo.workNo?userInfo.workNo:'暂无' }}</view>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-title">入职时间</text>
					</view>
					<view class="action">
						<view class="text-cont">{{ userInfo.createTime?parseTime(userInfo.createTime, '{y}-{m}-{d}'):'暂无' }}</view>
					</view>
				</view> -->
				<view v-if="userInfo.orgId === 110415 && cid" class="cu-item margin-mtop">
					<view class="content">
						<text class="text-title">设备唯一标识</text>
					</view>
					<view class="action" @click="copyCid">
						<view class="text-cont">{{ cid }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">
						修改
						<text v-if="modalName==='userName'">昵称</text>
						<text v-if="modalName==='email'">邮箱</text>
						<text v-if="modalName==='phonenumber'">手机号</text>
					</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl bg-white">
					<input v-if="modalName==='userName'" class="form-input" type="text" v-model="form.userName" />
					<input v-if="modalName==='email'" class="form-input" type="text" v-model="form.email" />
					<input v-if="modalName==='phonenumber'" class="form-input" type="text" v-model="form.phonenumber" />
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-blue text-blue" @tap="hideModal">取消</button>
						<button class="cu-btn bg-blue margin-left" @tap="handleConfirm">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { editUser, uploadImgApi, getInfo }from "@/config/service/user.js"
	export default {
		components: {
		},
		data() {
			return {
				index: -1,
				picker: ['男', '女', '未知'],
				modalName: undefined,
				userInfo: {
				},
				// 默认头像
				avatar: '/static/avatar.png',
				// 性别字典
				sexOptions: [
					{ 'dictLabel': '男', 'dictValue': 0 },
					{ 'dictLabel': '女', 'dictValue': 1 },
					{ 'dictLabel': '未知', 'dictValue': 2 }
				],
				form: {
					avatar: undefined,
					userName: undefined,
					phonenumber: undefined,
					email: undefined,
					sex: undefined
				},
				edit: {},
				cid: undefined
			}
		},
		onLoad() {
			this.getData();
			// #ifdef APP-PLUS
			var pinf = plus.push.getClientInfo();
			this.cid = pinf.clientid;//客户端标识
			// #endif
		},
		onShow() {
			
		},
		methods: {
			getData() {
				this.userInfo = uni.getStorageSync('userInfo');
				this.form = uni.getStorageSync('userInfo');
				this.index = this.form.sex - 0;
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null
			},
			copyCid() {
				if (this.cid) {
					uni.setClipboardData({
						data: this.cid,//要被复制的内容
						success:()=>{//复制成功的回调函数
							uni.showToast({//提示
								title:'复制成功'
							})
						}
					});
				}
				
			},
			PickerChange(e) {
				this.index = e.detail.value
				this.edit = {
					sex: e.detail.value,
					userId: this.form.userId
				};
				this.edituser(this.edit);
			},
			handleConfirm(){
				if(this.modalName==='userName') {
					this.edit = {
						userName: this.form.userName,
						userId: this.form.userId
					};
				}else if(this.modalName==='email') {
					this.edit = {
						email: this.form.email,
						userId: this.form.userId
					};
				}else if(this.modalName==='phonenumber') {
					this.edit = {
						phonenumber: this.form.phonenumber,
						userId: this.form.userId
					};
				}
				this.edituser(this.edit);
			},
			edituser(e){
				this.hideModal();
				uni.showLoading({mask: true});
				editUser(e).then(res => {
					uni.showToast({title: '修改成功',icon: 'none', duration: 1000});
					getInfo().then(res => {
						uni.setStorageSync('userInfo', res.data);
						this.getData();
					});
					uni.hideLoading();
				}).catch(() => {
					uni.hideLoading();
				});
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						// console.log(res);
						this.uploadImage(res.tempFilePaths[0])
					}
				});
			},
			uploadImage(images){
				var that = this;
				uni.uploadFile({
					url: uploadImgApi,
					filePath: images,
					name: 'file',
					formData: {
						"file": images,
					},
					header: {
						"Content-Type": "multipart/form-data",
						"Produce-Code": "7beacecadf4341fa81232781beb71b08",
						"App-Code": "07072c4c302f475d995f832ec8053e9b",
						"App-Type": "2",
						"App-Version": "1.0",
						"Authorization": uni.getStorageSync('token'),
						"Terminal-Type": 'web'
					},
					success: function (res) {
						var data = JSON.parse(res.data);
						//服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }
						
						console.log(uploadImgApi);
						console.log(
						{
							"Content-Type": "multipart/form-data",
							"Produce-Code": "7beacecadf4341fa81232781beb71b08",
							"App-Code": "07072c4c302f475d995f832ec8053e9b",
							"App-Type": "2",
							"App-Version": "1.0",
							"Authorization": uni.getStorageSync('token'),
							"Terminal-Type": 'web'
						});
						console.log(data);
						that.edit = {
							avatar: data.data.path,
							userId: that.form.userId
						};
						that.edituser(that.edit);
						// that.imgList.push(data.data);
					},
					fail: function (res) {
						uni.showModal({
							title: '错误提示',
							content: '上传图片失败',
							showCancel: false,
							success: function (res) { }
						})
					}
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
.form-input{
	font-size: 36upx;
	text-align: left;
	border-bottom: 1upx solid #007AFF;
}
</style>
