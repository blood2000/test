<template>
    <view class="form-group-to" v-show="!cur.__config__.hidden" v-if="mtype">
        <view class="cu-form-group muni-input-input">
            <view class="title">{{__config__.showLabel ? __config__.label: cur.title}}</view>
            <text class="lg text-gray cuIcon-right" @click="handlerclick"></text>
        </view>


        <view class="cu-modal bottom-modal" @click.stop="bottomModal = false" :class="bottomModal?'show':''"  >
			<view class="cu-dialog" @click.stop="()=>false">
				<view class="cu-bar bg-white" v-if="false">
					<view class="action text-green">确定</view>
					<view class="action text-blue" @tap="bottomModal = false">取消</view>
				</view>
				<view class="bg-white" style="height: 70vh" >
                    <scroll-view scroll-y enable-back-to-top @scrolltolower='handlerOnReachBottom' style="height: 100%">
                        <view v-if="dataList.length > 0">
							<view class="list_item" v-for="(item, index) in dataList" :key='index'>
								<view class="label-list_item">{{item.label}}</view><view class="item-value">{{item.value || '--'}}</view>
							</view>
                        </view>
                    </scroll-view>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
export default {
    name:'my-table', // Todo 滚动会影响到下面的滚动
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
    data(){
        return {
            bottomModal: false,
			dataList: []
        }
    },

    computed:{
        mtype(){
            let type = 'span'
            if(this.cur.__config__.headOption && this.cur.__config__.headOption.showType){
                type = this.cur.__config__.headOption.showType
            }
            console.log(type);
            return type
        },
        __config__(){
            console.log(this.cur, 'my-table 组件');
            return this.cur.__config__
        },
    },

    methods:{
        handlerclick(){

            // 展示tab数据
            if(this.cur.__config__.sourceType === 'tableHeadOption_tableDataConfig'){
                // 展示 tableHeadOption这里面的数据
                this.dataList = this.cur.__config__.tableHeadOption.dataList
                console.log(this.dataList);
				

                this.bottomModal = true
            }
        },

        move(){
            console.log('eee');
            // return false
        },

        handlerOnReachBottom(){
            console.log('触底~~');
        }
    }

}
</script>

<style scoped>
.show{
    overflow: hidden;
    position:fixed;
    height: 100%;
    width: 100%;
}

.list_item{
	width: 100%;
	display: flex;
	align-items: center;
	background-color: #FFFFFF;
	padding: 25upx;
	font-size: 28upx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
}
.list_item+.list_item{
	border-top: 1px solid #ccc;
}
.label-list_item{
	width: 50%;
	text-align: left;
	margin-right: 25upx;
	color: #999999;
}
</style>
