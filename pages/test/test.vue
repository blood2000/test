<template>
	<view class="flex align-center justify-center">
		<view class="">
			<tki-qrcode cid="qrcode1" ref="qrcode" :val="qrcode.val" :size="qrcode.size" :unit="qrcode.unit" :background="qrcode.background"
			 :foreground="qrcode.foreground" :pdground="qrcode.pdground" :icon="qrcode.icon" :iconSize="qrcode.iconsize" :lv="qrcode.lv"
			 :onval="qrcode.onval" :loadMake="qrcode.loadMake" :usingComponents="true" @result="result" />
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				//二维码
				qrcode: {
					val: 'https://api.chaohaoyun.cn/qrcode/cym;999d295b69764d399c7de6a0223b77fe', // 要生成的二维码值
					size: 300, // 二维码大小
					unit: 'upx', // 单位
					background: '#FFFFFF', // 背景色
					foreground: '#000000', // 前景色
					pdground: '#000000', // 角标色
					icon: '', // 二维码图标
					iconsize: 40, // 二维码图标大小
					lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
					onval: true, // val值变化时自动重新生成二维码
					loadMake: true, // 组件加载完成后自动生成二维码
				},
				src: '' // 二维码生成后的图片地址或base64
			}
		},
		onLoad(option) {
			
		},
		onShow() {
			
		},
		methods: {
			result(res) {
				console.log(res)
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
