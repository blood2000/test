<template>
    <view class="mel-tag" v-show="!cur.__config__.hidden">
        <view class='cu-tag'>{{value}}</view>
    </view>
</template>

<script>
export default {
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

}
</script>

<style lang="scss" scoped>
.mel-tag{
    padding: 20upx;
}
</style>