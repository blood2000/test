<template>
	<view class="container">
		<view class="login">
				<button class="wxq-btn loginWx" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
				<button class="wxq-btn goback">取消登录</button>
			</view>
	</view>
</template>

<script>
	// import slogin from '../../utils/login.js';
	// import util from '../../utils/util.js';
	
	
	import {
		mapMutations,
	    mapState
	} from 'vuex';
	
	export default{
		data(){
			return {
				code:'',//微信临时登录凭证
			}
		},
		onLoad(options){
			uni.login({
				success: (res) => {
					if (res.errMsg == "login:ok") {
						this.code = res.code;
					} else {
						uni.showToast({
							title: '系统异常，请联系管理员!'
						})
					}
				}
			})
		},
		computed: {
			...mapState(['isLogin', 'userInfo'])
		},
		methods: {
			...mapMutations(['login']),
			//微信授权登录
			getUserInfo(e){
				let that = this;
				var p = this.getSetting();
				p.then(function(isAuth) {
					console.log('是否已经授权', isAuth);
					if (isAuth) {
						console.log('用户信息，加密数据', e);
						//eData  包括//微信头像//微信名称 还有加密的数据.
						let eData = JSON.parse(e.detail.rawData);
						//接下来就是访问接口.
						uni.request({
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							url: '', //你的接口地址
							method: 'POST',//接口类型 
							data: '', //接口需要的数据
							success: function(res) {
								console.log(res);
								if (res.data.Success) {
									that.login(res.data); //将接口返回的数据保存在全局变量中.
									//登录成功跳转首页或者你想跳转的地方... 
									//注意：如果时导航页 请用uni.switchTab
									// 		其他页面建议使用uni.reLaunch
								} else {
									uni.showToast({
										title: '授权登录失败！',
										mask: true,
										icon: 'none'
									})
								}
							}
							
						})
					} else {
						uni.showToast({
							title: '授权失败，请确认授权已开启',
							mask: true,
							icon: 'none'
						})
					}
				});
			},
			//获取用户的当前设置
			getSetting() {
				return new Promise(function(resolve, reject) {
					uni.getSetting({
						success: function(res) {
							if (res.authSetting['scope.userInfo']) {
								console.log('存在');
								resolve(true);
							} else {
								console.log('不存在');
								resolve(false);
							}
						}
					})
				}).catch((e) => {
					console.log(e)
				});
			},
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.login{
		width: 750rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.goback{
		width: 90%;
		background:#eee;
		color: #333;
		margin-bottom: 24rpx;
	}
	.loginWx{
		width: 90%;
		background: #04BE02;
		margin-bottom: 24rpx;
	}
</style>
