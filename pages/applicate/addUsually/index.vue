<template>
	<view class="home-page">
		<view class="usually-section">
			<view class="flex align-center">
			<view v-for="(res,index) in usuallyList" :key="index" class="appall-frame">
					<view class="appall-icon">
						<view class="del" @click="deleteUsuallyList(res)">
							-
						</view>
						<image class="appall-icon" :src="'/static/icons/svg/' + res.icon + '.svg'" mode=""/>
					</view>
					<view class="size26 text-cont ellipsis">{{res.menuName}}</view>
			</view>
			</view>
			<view class="nothing" v-if="usuallyList.length === 0">
				
			</view>
		</view>
		<view v-for="(item,index) in applicateList" :key="index" class="appall-section">
			<view class="size36">{{item.menuName}}</view>
			<view class="flex align-center flex-wrap">
				<view v-for="(res,index) in item.children" :key="index" class="appall-frame" @click="addUsuallyList(res)">
					<image class="appall-icon" :src="'/static/icons/svg/' + res.icon + '.svg'" mode=""></image>
					<view class="size26 text-cont ellipsis">{{res.menuName}}</view>
					<view v-if="check(res)" class="check">
						 <icon type="success-no-circle" size="12" color='#ffffff'/>
					</view>
				</view>
			</view>
		</view>
		<NonePage v-if="applicateList.length===0" :msg="'暂无应用，请联系管理员授权'" />
		<view style="height: 160upx;"></view>
		<view class="bottom-frame bg-white">
			<button class="btn" type="primary" size="default" @tap='submit'>确认变更常用应用</button>
		</view>
	</view>
</template>

<script>
	import { applicateList , listUsually , restSysCommonUserMenu }from "@/config/service/workbench.js"
	import NonePage from "@/components/NonePage/NonePage.vue"
	export default {
		components: {
			NonePage
		},
		data() {
			return {
				modalName: undefined,
				applicateList: [],
				system: null,
				usuallyList:[]
			}
		},
		mounted() {
		},
		onLoad() {
			this.getAllList();
			this.getUsuallyList();
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
				uni.showLoading({mask: true});
				applicateList().then(res => {
					const menu = res.data.find(res => res.menuCode === 'effa34f2a138424182c45496e37f6266')
					this.applicateList = menu? menu.children: [];
					uni.hideLoading();
				});
			},
			getUsuallyList(){
				listUsually().then(res => {
					this.usuallyList = res.data;
				});
			},
			addUsuallyList(item) {
				const isUsually = this.usuallyList.find(res =>  res.menuCode === item.menuCode )
				let delIndex = this.usuallyList.findIndex(res => res.menuCode === item.menuCode)
				isUsually ? this.usuallyList.splice(delIndex,1) : this.usuallyList.push(item)
				
			},
			deleteUsuallyList(item){
				let delIndex = this.usuallyList.findIndex(res => res.menuCode === item.menuCode)
				this.usuallyList.splice(delIndex,1)
			},
			check(item){
				return !!this.usuallyList.find(res => res.menuCode === item.menuCode)
			},
			submit(){
				const codes = this.usuallyList.map(res => res.menuCode)
				if(codes.length === 0){
					uni.showToast({title: '请选择常用应用',icon: 'none', duration: 2000})
				}else{
					restSysCommonUserMenu(codes.join()).then(res => {
						uni.showToast({title: '变更成功',icon: 'none', duration: 1000})
						setTimeout(() => {
							uni.switchTab({
								url:'/pages/index/index'
							})
						},1000)
					}).catch(e => {
						console.log(e);
					})
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
	margin-top: 20upx;
	background-color: #FFFFFF;
	.size36{
		padding: 20rpx;
		padding-bottom: 0;
	}
	.appall-frame{
		position: relative;
		padding-top: 5vw;
		// border-right: 1rpx solid #F5F5F5;
		// border-top: 1rpx solid #F5F5F5;
		height: 24vw;
		text-align: center;
		width: 25%;
		.appall-icon{
			width: 66upx;
			height: 66upx;
		}
		.check{
			position: absolute;
			right: 0;
			bottom: 0;
			width: 0;
			height: 0;
			border-bottom: 25px solid #3d65fa;
			border-left: 25px solid transparent;
			icon{
				position: absolute;
				right: 4rpx;
				top: 22rpx;
			}
		}
		&:nth-child(4){
			border-right: none;
		}
	}
	
}
.usually-section{
	width: 100%;
	padding-top: 10rpx;
	overflow-x: auto;
	text-align: left;
	border-top: 1rpx solid #F5F5F5;
	background-color: #FFFFFF;
	height: 130upx;
	.appall-frame{
		flex-shrink:0;
		text-align: center;
		width: 20%;
		margin: 10upx 6upx 6upx;
		.appall-icon{
			position: relative;
			margin: auto;
			width: 66upx;
			height: 66upx;
			.del{
				width: 26rpx;
				height: 26rpx;
				line-height: 22rpx;
				border-radius: 50%;
				border: #FFFFFF solid 1px;
				color: #FFFFFF;
				background-color: red;
				position: absolute;
				right: -10rpx;
				top: -10rpx;
				z-index: 1;
			}
		}
	}
	.nothing{
		width: 100vw;
		height: 50px;
		background:url(../../../static/has_none.png) no-repeat center;
		background-size: 200rpx;
	}
	
}
.bottom-frame{
	position: fixed;
	left:0;
	bottom: 0;
	padding: 25upx 54upx;
	width: 100%;
	.btn{
		// width: 85vw;
		margin:auto;
	}
}

</style>
