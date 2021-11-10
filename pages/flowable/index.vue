<template>
	<view class="flowable">
			<RecordIndex v-if="deployId" />
	</view>
</template>

<script>
	import { selectMyList } from "@/config/service/flowable/process";
	import RecordIndex from '../record/index.vue'
	export default {
		components:{
			RecordIndex
		},

		onLoad(option){
			console.log(option);
			const { name, deployId, procDefId } = option
			this.name =  name
			this.deployId = deployId
			this.procDefId = procDefId

			if(!name) return
			this.$loading(true)
			selectMyList({
					pageNum: 1,
					pageSize: 10,
				}).then(response=>{
					this.$loading(false)
					let obj = undefined

					for (const i in response.data.list) {
						if (Object.hasOwnProperty.call(response.data.list, i)) {
							const e = response.data.list[i];
							console.log(e);
							if(e.key === option.name){
								obj = e
							}
						}
					}

					if(obj){
						uni.redirectTo({
							url: `/pages/record/index?deployId=${obj.deploymentId}&procDefId=${obj.id}&finished=true&name=${obj.name}` ,
						})
					}
			})
		},
		data() {
			return {
				name: undefined,
				procDefId: undefined,
				deployId: undefined
			};
		},

	}
	
</script>

<style>
</style>
