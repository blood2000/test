<template>
  <view class="form-group-to" v-show="!cur.__config__.hidden">
    <view class="cu-form-group">
        <view class="title flex"><view class="text-red margin-sright" v-if="cur.__config__.required">*</view>时间选择</view>
        <picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
            <view class="picker">
                {{time}}
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
			time: '12:01',
		}
	},
    
	computed:{
		
	},
	
	mounted(){
	},

	methods:{
		TimeChange(e) {
			// TODO
		},
	}

}
</script>

<style>

</style>