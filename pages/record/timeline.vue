<template>
	<view class="timeline">
		<uni-section title="流程" type="line"></uni-section>
		<view class="card">
			<view class="cu-timeline" v-for="(item,index) in recordList" :key="index" >
				<view class="cu-time page_time">{{item.createTime}}</view>
				<view class="cu-item " :class="setIconAndColor(item)">
					<view class="" style="margin-bottom: 10upx;">{{item.taskName}}</view>
					<view class="content shadow-blur">
						<text v-if="item.assigneeName">实际办理： {{ item.assigneeName }} <view class='cu-tag light bg-white sm'>{{ item.deptName }}</view></text>
						<text v-else-if="item.candidate">候选办理： {{ item.candidate }}</text>
						
						<!-- 如果不支持 v-html 则把下面的注释打开 并去掉对应的方法和v-html -->
						<view class="padding-xs" v-if="item.comment" v-html="setComment(item)">
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const typeIcons = [
		{ type: '1', icon: 'check', color: 'green'}, // 正常意见
		{ type: '2', icon: 'close', color: 'pink' }, // 退回意见
		{ type: '3', icon: 'close', color: 'mauve' }, // 驳回意见
		{ type: '4', icon: 'edit', color: 'brown' }, // 委派意见
		{ type: '5', icon: 'edit', color: 'grey' }, // 转办意见
		{ type: '6', icon: 'close', color: 'blue'}, // 终止流程
		{ type: '7', icon: 'close', color: 'red' } // 终止流程
	];
	export default {
		components: {},
		props:{
			flowRecordList:{
				type: Array,
				default:()=>[]
			}
		},
		data() {
			return {
				
				active: 1,
				
				list2: [{
					title: '审批人: 安禄',
					desc: '接收时间: 2021-10-18 21:08:29'
				}, {
					title: `业务主管审批
							候选办理: admin`,
					desc: '2018-11-12'
				}, {
					title: '买家签收',
					desc: '2018-11-13'
				}, {
					title: '交易完成',
					desc: '2018-11-14'
				}]
			}
		},
		
		computed:{
			recordList(){
				this.active = 2
				return this.flowRecordList.map((e, index)=>{
					return e
				})
			}
		},
		methods: {
			setIconAndColor(item){
				let icon = 'cuIcon-time '
				const { comment } = item;
				if(comment){
					const find = typeIcons.find(e=> e.type == comment.type )
					if(find){
						icon = `cuIcon-${find.icon} text-${find.color}`
					}
				}
				return icon
			},
			setComment(item){
				let str = ''
				const { comment } = item;
				if(comment){
					const find = typeIcons.find(e=> e.type == comment.type )
					if(find){
						str = `<view class='cu-tag line-${find.color}'>审批意见： ${item.comment.comment}</view>`
					}
				}
				return str
			}

		}
	}
</script>

<style>
	.page_time{
		width: 300upx;
	}
</style>
