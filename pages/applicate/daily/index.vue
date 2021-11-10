<template>
	<view class="home-page">
		日报
	</view>
</template>

<script>
	import { userNotice }from "@/config/service/workbench.js"
	export default {
		components: {
		},
		data() {
			return {
				modalName: null
			}
		},
		onLoad() {
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
			
		}
	}
</script>

<style lang="scss" scoped>
.home-page{
	width: 100vw;
	height: 100vh;
	background-color: #F5F5F5;
}
</style>
