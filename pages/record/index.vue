<template>
	<view>
		<template v-if="taskForm.taskId">
			<!-- 先只做展示表单配置 -->
			<view class="record_parser" v-if="variablesData">
				<parser :isStar='false' :formConf="variablesData" @mformData="(val)=> mformData = val" @formConfCopy='(val)=> formConfCopy = val' />
			</view>
			<!-- 提交 -->
			<template v-if="finished==='true'">
				<uni-section title="审核" type="line"></uni-section>
				<view>
						<view class="form-group-to cu-form-group align-start">
								<view class="title">审批意见</view>
								<textarea maxlength="-1" v-model="taskForm.comment" placeholder="请输入审批意见"></textarea>
						</view>
						<view class="form-group-to cu-form-group">
							<button class="mini-btn" type="primary" size="mini" @click="handlerSubmid" :disabled="!taskForm.comment">同 意</button>
							<button class="mini-btn" type="warn" size="mini" @click="handlePass" :disabled="!taskForm.comment">拒 绝</button>
						</view>
				</view>
			</template>
			<!-- timeline -->
			<view class="record_timeline">
				<timeline v-if="flowRecordList" :flowRecordList='flowRecordList' />
			</view>
		</template>

		<template v-else>
			<!-- 初始化表单配置 -->
			<view class="record_parser" v-if="formConf">
				<parser ref="parser" :formConf="formConf" :isStar='true' @mformData="(val)=> mformData = val" @formConfCopy='(val)=> formConfCopy = val' />

				<view class="form-group-to cu-form-group" style="margin:40upx 0 50upx">
					<button class="mini-btn" type="primary" size="mini" @click="formConfSubmitForm" >提 交</button>
					<button class="mini-btn" size="mini" @click="navigateBack" >取 消</button>
					<button v-if="false" class="mini-btn" type="warn" size="mini" @click="handlerSubmidTest23" >重 置</button>
				</view>

			</view>
		</template>

		

	</view>
</template>

<script>
	import parser from './parser.vue'
	import parser2 from './parser2.vue'
	import timeline from './timeline.vue'
	import { getFlowViewer, flowRecord, getProcessVariables, complete, refuseProcess, definitionStart } from '@/config/service/flowable/process'
	import { removePropertyOfNull } from '@/utils/index.js'
	function jsondeepClone(arr){
		return JSON.parse(JSON.stringify(arr))
	}
	
	export default {
		components:{
			parser,
			parser2,
			timeline
		},
		data() {
			return {
				loading: false,
				finished: false,
				taskForm:{
					returnTaskShow: false, // 是否展示回退表单
					delegateTaskShow: false, // 是否展示回退表单
					defaultTaskShow: true, // 默认处理
					sendUserShow: false, // 审批用户
					multiple: false,

					comment: '', // 意见内容 
					procInsId: '', // 流程实例编号
					instanceId: '', // 流程实例编号
					deployId: '', // 流程定义编号
					taskId: '', // 流程任务编号 (存在说明已经生成流程了)
					procDefId: '', // 流程编号
					vars: '',
					targetKey: ''
				},
				
				flowRecordList:null,
				formConf: null,

				variablesData: null,

				// 提交时候使用
				formConfCopy: null, // 修改后的值
				mformData: null // 修改后的值

			};
		},
		onLoad(option) {
			// 回显流程记录
			// deployId: "2ce6067a-3308-11ec-81ab-00155d003519"
			// finished: "false"
			// procInsId: "8cd8b55f-3308-11ec-81ab-00155d003519"
			// taskId: "2ce6067a-3308-11ec-81ab-00155d003519"



			const { deployId, finished, procInsId, taskId, procDefId, name } = option

			if(name){
				// 顶部导航栏标题
				uni.setNavigationBarTitle({
						title: name
				});
			}

			this.finished = finished // 判断是否有交互
			
			this.taskForm.deployId = deployId
			this.taskForm.taskId = taskId
			this.taskForm.procInsId = procInsId
			this.taskForm.instanceId = procInsId;

			// this.$route.query = option
			// 初始化表单
			this.taskForm.procDefId = procDefId

			
			// procInsId && this.getFlowViewer(procInsId);
			// deployId && this.getModelDetail(deployId);
			// 流程任务重获取变量表单

			if (taskId) {
			  this.processVariables(taskId, deployId);
			  this.getNextFlowNode(taskId);
			  this.taskForm.deployId = null;
			} 
			this.getFlowRecordList(procInsId, deployId);
		},
		
		methods:{
			getFlowViewer(procInsId){
				// getFlowViewer(procInsId).then(res=>{
				// })
			},
			getModelDetail(){},
			/** 获取流程变量内容 */
			processVariables(taskId, deployId) {
				this.$loading(true)
			  
			  if (taskId && deployId) {
				// 提交流程申请时填写的表单存入了流程变量中后续任务处理时需要展示
				getProcessVariables(taskId, deployId).then(res => {
				this.$loading(false)

				  this.variablesData = res.data.variables;
				  // this.variableOpen = true;

				  // 处理一下 附件
				  // this.elUploads = res.data.variables.fields.filter(e => e.__config__.tag === 'el-upload') || [];
				});
			  }
			},
			getNextFlowNode(){},

			/** 流程流转记录 */
			getFlowRecordList(procInsId, deployId) {
				this.$loading(true)
			  const params = { procInsId: procInsId, deployId: deployId };
			  flowRecord(params).then(async res => {
				this.$loading(false)

				// 流程时间
				if(res.data.flowList && res.data.flowList.length > 0){
					this.flowRecordList = res.data.flowList;
				}
				// 流程过程中不存在初始化表单 直接读取的流程变量中存储的表单值
				if (res.data.formData) {
				  const resdata = jsondeepClone(res.data.formData);
		
				 //  try {
					// await this._handlerFormConf(resdata.fields || []);
				 //  } catch (error) {
				 //  }
				  // 经过上面处理完
				  this.formConf = resdata;

				  // this.formConfOpen = true;
				}
			  }).catch(res => {
				// uni.navigateBack()
			  });
			},

			/** 同意任务 */
			handlerSubmid(){
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确定同意申请',
					success:  (res)=> {
						if (res.confirm) {
							// s= 审批提交
							
							// this.btnLoading = true;

							const formConfCopy = jsondeepClone(_this.formConfCopy);
							formConfCopy.fields.forEach(e => {
								e.disabled = true;
							});

							const que = {
								..._this.taskForm,
								sendUserShow: true,
								variables: {
									..._this.mformData,
									variables: formConfCopy
								}
							};
							_this.handlerComplete(que, complete )
						}
					}
				});
			},

			/** 拒绝任务 */
			handlePass() {
				const que = {
					taskId: this.taskForm.taskId,
					comment: this.taskForm.comment,
					instanceId: this.taskForm.instanceId
				};

				this.handlerComplete(que, refuseProcess )
			},

			handlerComplete(que, fn){
				const quer = removePropertyOfNull(que)
				// uni.showLoading({mask: true});
				this.$loading(true)
				fn(quer).then(response=>{
					// uni.hideLoading();
					this.$loading(false)
					// uni.showToast({title: response.msg,icon: 'none', duration: 1000});
					this.msgSuccess(response.msg)
					const titme = setTimeout(()=>{
						uni.switchTab({
							url: '/pages/upcoming/index'
						})
						clearTimeout(titme)
					}, 1000)
				})
			},

			// s= 第一次申请
			formConfSubmitForm(data){
				// s=表单简单验证
				let submVerify = false
				if(this.$refs.parser && this.$refs.parser.submVerify){
					submVerify = this.$refs.parser.submVerify()
				}
				if(!submVerify) return
				// e=表单简单验证
				
				const formData = jsondeepClone(this.formConfCopy); // 配置表单
				const variables = this.mformData // 当前表单
				// formData.disabled = true // 发布前禁止再编辑
				let $arr = []
				for (const i in formData.fields) {
					if (Object.hasOwnProperty.call(formData.fields, i)) {
						const e = formData.fields[i];
						e.disabled = true; // 编辑完后禁止再编辑
						$arr.push(e)
					}
				}

				formData.fields = $arr
				
				formData.formBtns = false; // web平台按钮

				if (this.taskForm.procDefId) {
					variables.variables = formData
					this.$loading(true)
					// 启动流程并将表单数据加入流程变量
					definitionStart(this.taskForm.procDefId, removePropertyOfNull(variables)).then(res => {
						this.$loading(false)
						this.msgSuccess(res.msg)
						const titme = setTimeout(()=>{
							
							uni.switchTab({
								url: '/pages/upcoming/index'
							})
							clearTimeout(titme)
						}, 1000)
					}).catch(e => {
						this.$loading(false)
						formData.formBtns = true;
					});
				}
			},
			// e= 

			navigateBack(){
				console.log('返回上一页');
				uni.navigateBack()
			},

			// 测试-删除
			handlerSubmidTest23(){
				console.log('测试数据');
				console.log(this.mformData);
				console.log(this.formConfCopy);
			}
		}
	}
</script>

