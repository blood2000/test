<template>
    <view class="form-group-to" v-show="!cur.__config__.hidden">
        <view class="cu-form-group" v-if="mtype === 'hidden'" style="display:none">
            <view class="title">{{__config__.label}}</view>
            <input type="hidden" :name="cur.__vModel__" :placeholder="cur.placeholder" v-model="inputValue" :disabled='cur.disabled' />
        </view>
       
        <view class="cu-form-group align-start" v-else-if="mtype === 'textarea'">
				<view class="title flex"><view class="text-red margin-sright" v-if="cur.__config__.required">*</view>{{__config__.label}}</view>
				<textarea maxlength="-1" :name="cur.__vModel__" :disabled='cur.disabled' v-model="inputValue" :placeholder="cur.placeholder"></textarea>
        </view>
        
        <view class="cu-form-group" v-else>
            <view class="title flex"><view class="text-red margin-sright" v-if="cur.__config__.required">*</view>{{__config__.label}}</view>
            <input style="text-align: right" :name="cur.__vModel__" :placeholder="cur.placeholder" v-model="inputValue" :disabled='cur.disabled' />
        </view>

    </view>
</template>

<script>
export default {
    name:'elInput',
    props: {
        cur:{
            type: Object,
            default:()=>{ return {} }
        },
        value:{
            type: [String, Number],
            default: undefined
        }
    },

    computed:{
        mtype(){
            return this.cur.type
        },
        __config__(){
            return this.cur.__config__
        },
        inputValue:{
            get(){
                return this.cur.__config__.defaultValue || this.value
            },
            set(val){
                this.$emit('input', val)
                this.$set(this.cur.__config__, 'defaultValue', val)
            }
        }
    },

}
</script>

<style scoped>
.cu-form-group .uni-input-input{
    text-align: right;
}
/* 上传组件会覆盖到input上, 造成无法输入的问题 */
::v-deep .cu-form-group .uni-input-wrapper{
    z-index: 91;
}
</style>