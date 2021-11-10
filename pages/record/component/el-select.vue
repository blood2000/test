<template>
<view class="form-group-to" v-show="!cur.__config__.hidden">
    <view class="cu-form-group">
        <view class="title flex"><view class="text-red margin-sright" v-if="cur.__config__.required">*</view>{{cur.__config__.label}}</view>
        <picker @change="PickerChange" :value="index" :range="picker" :disabled='cur.disabled'>
            <view class="picker">
                {{ picker[index] || cur.placeholder }}
            </view>
        </picker>
    </view>
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
		    type: [String, Number],
		    default: undefined
		}
	},

	data(){
		return {
			index: -1
		}
	},

	watch:{
		value(val){
			if(val){
				this.index = Array.from(this.cur.__slot__.options).findIndex(e => e.value === this.value)
			}
		}
	},
    
	computed:{
		picker(){
			return  Array.from(this.cur.__slot__.options).map(e=> e.label)
		},
	},
	
	methods:{
		PickerChange(e) {
			this.index = e.detail.value
			const obj = this.cur.__slot__.options[this.index]
			if(obj){
				this.$emit('input', obj.value )
				this.$set(this.cur.__config__,'defaultValue',obj.value)
			}
		},
	}

}
</script>

<style>

</style>