<template>
	<view class="cu-card dynamic">
		<view class="cu-item shadow" style="margin: 24upx 24upx 0;">
			<view class="cu-list menu-avatar comment">
				<!-- 我的流程 (分多个类型??) -->
				<view class="cu-item cu-item0" v-if="tabCur == 0">
					<!-- <view class="cu-avatar round" style="
						  background-image: url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);
						"></view> -->
					
					<view class="content" @click="navToInfoPage(dataItem, tabCur)">
						<view class="proc-defname flex align-center justify-between">
							<view class="text-bold">{{dataItem.procDefName}}</view>
							<text v-if="dataItem.flow && dataItem.flow.status ==1" style="color: #F3A72F;">审批中</text>
							<text v-if="dataItem.flow && dataItem.flow.status ==2" style="color: #1DB963;">审批通过</text>
							<text v-if="dataItem.flow && dataItem.flow.status ==3" style="color: #999999;">审批已取消</text>
							<text v-if="dataItem.flow && dataItem.flow.status ==4" style="color: #E55E50;">审批拒绝</text>
						</view>
						<view class="content_q">
							<view class="text-gray text-content text-df text-item"> 
								<text class="text-label">类型: </text>
								{{dataItem.category}} </view>
							<view class="text-gray text-content text-df text-item">
								<text class="text-label">提交时间: </text>
								{{dataItem.createTime}}
							</view>
							<view class="text-gray text-content text-df text-item">
								<text class="text-label">耗时: </text>
								{{dataItem.duration}}
							</view>
							<view class="text-gray text-content text-df text-item" v-if="dataItem.flow">
								<text class="text-label">审批人: </text>
								<text style="color: #1678FF;">{{dataItem.candidate}}</text>
							</view>
						</view>
						<view class="margin-top-sm flex flex-end my-card-footer">
							<view class="text-gray text-df">
								<button v-if="dataItem.flow && (dataItem.flow.status == 1 || dataItem.flow.status == 2)" 
								class="cu-btn text-blue line-blue " 
								@click.stop="handleStop(dataItem)"
								style="margin-right: 20upx;">取消申请</button>
								<button class="cu-btn text-red line-red " @click.stop="handleDelete(dataItem)" >删 除</button>
							</view>
						</view>
					</view>
				</view>
				<!-- 待办流程 -->
				<view class="cu-item cu-item0" v-else-if="tabCur == 1">
					<!-- <view class="cu-avatar round" style="
						  background-image: url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);
						"></view> -->
					<view class="content"  @click="navToInfoPage(dataItem, tabCur)">
						<view class="proc-defname text-bold">{{dataItem.procDefName}}</view>
						<!-- <view class="text-grey">
							<view>{{dataItem.startUserName}} 提交的 {{dataItem.procDefName}}</view>
						</view> -->
						
						<view class="content_q">
							
							<view class="text-gray text-content text-df text-item">
								<text class="text-label">发起人: </text>
								{{dataItem.startUserName}}
								<!-- <view class="cu-tag text-grey light bg-orange sm" style="marginLeft:10upx">{{dataItem.startDeptName}}</view> -->
							</view>
							<view class="text-gray text-content text-df text-item">
								<text class="text-label">所属部门: </text>
								{{dataItem.startDeptName}}
							</view>
							<view class="text-gray text-content text-df text-item">
								<text class="text-label">提交时间: </text>
								{{dataItem.createTime}}
							</view>
							
							<!-- <view class="text-gray text-content text-df"> 
								发起人: {{dataItem.startUserName}} 
								
							</view>
							<view class="text-gray text-content text-df">
								提交时间: {{dataItem.createTime}}
							</view> -->
						</view>
						<!-- <view class="text-gray text-content text-df">
							结束时间: 2021-10-20 21:00
						</view> -->
						<view class="margin-top-sm flex flex-end my-card-footer">
							<view class="text-gray text-df">
								<button class="cu-btn bg-red" style="margin-right: 20upx;" @click.stop="handlePass(dataItem)">拒 绝</button>
								<button class="cu-btn bg-blue" @click.stop="handlerSubmid(dataItem)">同 意</button>
							</view>
						</view>
					</view>
				</view>
				<!-- 已办流程 -->
				<view class="cu-item cu-item0" v-else-if="tabCur == 2">
					<!-- <view class="cu-avatar round" style="
						  background-image: url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);
						"></view> -->
					<view class="content"  @click="navToInfoPage(dataItem, tabCur)">
						<view class="proc-defname text-bold">{{dataItem.procDefName}}</view>
						<!-- <view class="text-grey">
							<view>{{dataItem.startUserName}} 提交的 {{dataItem.procDefName}}</view>
						</view> -->
						
						<view class="content_q">
							<view class="text-gray text-content text-df text-item">
								<text class="text-label">发起人: </text>
								{{dataItem.startUserName}}
								<text class="org-tag">{{dataItem.startDeptName}}</text>
							</view>
							<!-- <view class="text-gray text-content text-df text-item">
								<text class="text-label">所属部门: </text>
								{{dataItem.startDeptName}}
							</view> -->
							<view class="text-gray text-content text-df text-item">
								<text class="text-label">提交时间: </text>
								{{dataItem.createTime}}
							</view>
							<view class="text-gray text-content text-df text-item">
								<text class="text-label">审批时间: </text>
								{{dataItem.finishTime}}
							</view>
							<view class="text-gray text-content text-df text-item">
								<text class="text-label">耗时: </text>
								{{dataItem.duration}}
							</view>
							
							<!-- <view class="text-gray text-content text-df"> 发起人: {{dataItem.startUserName}} 
								<view class="cu-tag text-grey light bg-orange sm" style="marginLeft:10upx">{{dataItem.startDeptName}}</view>
							</view> -->
							<!-- <view class="text-gray text-content text-df">
								提交时间: {{dataItem.createTime}}
							</view> -->
							<!-- <view class="text-gray text-content text-df">
								审批时间: {{dataItem.finishTime}}
							</view>
							<view class="text-gray text-content text-df">
								耗时: {{dataItem.duration}}
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// stopProcess
	import { stopProcess, delDeployment, refuseProcess, complete } from '@/config/service/flowable/process'
	export default{
		props:{
			tabCur:{
				type: Number,
				default: 0
			},
			dataItem:{
				type: Object,
				default: ()=>{ return {} }
			},
			userInfo:{
				type: Object,
				default: ()=>{ return {} }
			}
		},
		methods:{
			// 跳转详情页
			navToInfoPage(dataItem, tabCur){

				let finished = 'false'

				if(tabCur === 1){
					finished = 'true'
				}
				
				uni.navigateTo({
					url:`/pages/record/index?procInsId=${dataItem.procInsId}&deployId=${dataItem.deployId}&taskId=${dataItem.taskId}&finished=${finished}&name=${dataItem.procDefName}`
				})
				 /** 流程流转记录 */
				    // handleFlowRecord(row) {
				    //   this.$router.push({
				    //     // path: '/applicate/flowable/task/record/index',
				    //     name: 'Task/record/index',
				    //     query: {
				    //       procInsId: row.procInsId,
				    //       deployId: row.deployId,
				    //       taskId: row.taskId,
				    //       finished: false
				    //     }});
				    // },
			},

			handleStop(row){
				const params = {
					instanceId: row.procInsId
				};
				
				stopProcess(params).then(res => {
					this.msgSuccess(res.msg);
					this.getList();
				});
			},
			/** 删除按钮操作 */
			handleDelete(row) {

				uni.showModal({
					title: '提示',
					content: '是否确认删除',
					success:  (res)=> {
						if (res.confirm) {
							const ids = row.procInsId;
							this.$loading(true)
							delDeployment({ instanceId: ids }).then(res=>{
								this.$loading(false)
								this.msgSuccess('删除成功')
								this.getList() // TODO 就删除其中的一项就行, 不用重新请求
							})
						}
					}
				});
				
			},

			/** 状态1拒绝任务 */
			handlePass(row) {
				const {taskId,procInsId:instanceId } = row
				uni.showModal({
					title: '提示',
					content: '确定直接拒绝吗',
					success:  (res)=> {
						if (res.confirm) {
							const que = {
								taskId,
								comment: '请重新申请',
								instanceId
							};
							this.$loading(true)
							refuseProcess(que).then(response=>{
								this.$loading(false)
								this.msgSuccess(response.msg)
								this.getList()
							})

						}
					}
				});
			},

			// 处理form 提交
			handlerSubmid(row){
				uni.showModal({
					title: '提示',
					content: '确定同意申请',
					success:  (res)=> {
						if (res.confirm) {
							// // s= 审批提交
							this.agree(row)
						}
					}
				});
			},

			getList(){
				this.$emit('getList')
			},

			agree(row){

				const quer = {
					taskId: row.taskId,
					instanceId: row.procInsId
				};

				this.$loading(true)

				complete(quer).then(response=>{

					this.$loading(false)

					this.msgSuccess(response.msg)

					this.getList()

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.org-tag{
		padding: 0 10upx;
		margin-left: 20upx;
		height: 28upx;
		background: #FFF2DB;
		border-radius: 0 14upx 14upx 14upx;
		font-size: 20upx;
		font-weight: 400;
		line-height: 28upx;
		color: #FFA811;
	}
	.cu-list.menu-avatar>.cu-item::after{
		border-bottom: 0;
	}
	
	.cu-list.menu-avatar.comment>.cu-item.cu-item0{
		padding-left: 25upx;
	}
	.page_you{
		padding-left: 60upx;
		color: #000;
	}
	
	.flex-end{
		justify-content: flex-end;
	}
	
	// 卡片头部
	.proc-defname{
		width: 100%;
		// height: 31upx;
		line-height: 1;
		padding: 0 0 24upx;
		font-size: 32upx;
		// font-weight: bold;
		color: #333333;
		position: relative;
	}
	.proc-defname::before{
		content: '';
		position: absolute;
		left: -25upx;
		width: 6upx;
		height: 25upx;
		background-color: #1678ff;
	}
	.proc-defname::after{
		content: '';
		position: absolute;
		left: -25upx;
		bottom: 0;
		width: calc(100% + 50upx);
		height: 1upx;
		background: #EBEBEB;
	}
	
	.text-item{
		padding-top: 25upx;
		line-height: 1;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		
		
	}
	.text-label{
		display: inline-block;
		width: 120upx;
		height: 26upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		margin-right: 20upx;
	}
	.content_q{
		// padding: 25upx 0;
	}
	
	// 底部
	.my-card-footer{
		position: relative;
		padding: 25upx 0 0;
	}
	.my-card-footer::after{
		content: '';
		position: absolute;
		top: 0;
		left: -25upx;
		bottom: 0;
		width: calc(100% + 50upx);
		height: 1upx;
		background: #EBEBEB;
	}
</style>
