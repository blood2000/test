<template>
<view class="form-group-to" v-show="!cur.__config__.hidden">
		
		<template v-if="cur.type === 'datetimerange'" >
			<view class="cu-form-group m-group">
				<view class="title flex"><view class="text-red margin-sright" v-if="cur.__config__.required">*</view>{{cur.__config__.label}}</view>
				<view style="margin:20upx 0">
					<uni-datetime-picker v-model="datetimerange" type="datetimerange" :hide-second="true" rangeSeparator="至" :border="false" :disabled='cur.disabled' />
				</view>
			</view>
		</template>
		<template v-else-if="cur.type === 'date'" >
			<view class="cu-form-group">
				<view class="title flex"><view class="text-red margin-sright" v-if="cur.__config__.required">*</view>{{cur.__config__.label}}</view>
				<uni-datetime-picker type="date" v-model="date" :border="false" :hide-second="true" style="text-align: right" :disabled='cur.disabled' />
			</view>
		</template>

		<template v-else>
			<view class="cu-form-group">
				<view class="title flex"><view class="text-red margin-sright" v-if="cur.__config__.required">*</view>{{cur.__config__.label}}</view>
				<uni-datetime-picker v-model="date" :border="false" :hide-second="true" style="text-align: right" :disabled='cur.disabled' />
			</view>
		</template>
</view>
</template>

<script>
export default {
	props:{
		cur:{
		    type: Object,
		    default:()=>{ return {} }
		},
		value:{
		    type: [String, Number, Array],
		    default: undefined
		}
	},

	computed:{
		// 日期范围
		datetimerange:{
			get(){
				return this.cur.__config__.defaultValue || []
			},

			set(val){
				this.$emit('input', val)
				this.$set(this.cur.__config__,'defaultValue',val)
			}
		},
		// 日期
		date:{
			get(){
				return this.cur.__config__.defaultValue || ''
			},

			set(val){
				this.$emit('input', val)
				this.$set(this.cur.__config__,'defaultValue',val)
			}
		}
	},
	
}
</script>

<style scoped>
.m-group{
	flex-direction: column;
	align-items: flex-start;
	padding-top: 20upx;
}
</style>
