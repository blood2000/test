<template>
    <view class="form-group-to" v-show="!cur.__config__.hidden">
        <view class="cu-form-group muni-input-input">
            <view class="title flex"><view class="text-red margin-sright" v-if="cur.__config__.required">*</view>{{__config__.label}}</view>
            <input style="text-align: right" type="number" v-model="inputValue" :placeholder="cur.placeholder" />
        </view>
    </view>
</template>

<script>
export default {
    name:'el-input-number', // my-table
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
                return this.cur.__config__.defaultValue
            },
            set(val){
                this.$emit('input', val)
                this.$set(this.cur.__config__, 'defaultValue', val)
            }
        }
    }

}
</script>
