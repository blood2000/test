<template>
	<view class="upcomingPage" :style="[{height:'calc(100vh - ' + CustomBar1 + 'px)'}]">
		<scroll-view scroll-x class="bg-white nav" style="border-top: 1upx solid #ebebeb;" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index == TabCur ? 'text-default cur' : ''" v-for="(item, index) in tabList"
				:key="index" @tap="tabSelect" :data-id="index">
				{{ item }}
			</view>
		</scroll-view>
		
		<scroll-view scroll-y enable-back-to-top @scrolltolower='handlerOnReachBottom' :style="[{height:'calc(100vh - ' + CustomBar2 + 'px)'}]">
			<!-- 内容部分卡片 -->
			<template v-if="dataList.length > 0">
				<card :tabCur="TabCur" :userInfo='userInfo' v-for="(item,index) in dataList" :key='index' :dataItem="item"
					@getList="pullDownRefresh" />
			</template>
			<!-- 无数据展示 -->
			<NonePage v-else />
			
			<!-- 上拉加载 -->
			<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
		</scroll-view>

		



		<!-- 添加按钮 -->
		<text style="font-size: 30px;" class="lg text-gray m-fex" :class="'cuIcon-' + 'roundaddfill'" @click="handleAdd"
			v-if="TabCur === 0"></text>

		<!-- 模态框 右边抽屉 -->
		<view class="cu-modal drawer-modal justify-end" :class="isShow?'show':''" @tap="isShow = false">
			<view class="cu-dialog basis-lg" @tap.stop=""
				:style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left">
					<view class="cu-item arrow" v-for="(item,index) in definitionList" :key="index"
						@click="handleStartProcess(item)">
						<view class="content">
							<view class="text-grey"> {{ item.name }}
								<view class="cu-tag text-grey light bg-orange sm" style="marginLeft:10upx">
									{{ 'V'+item.version }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>


		
	</view>

</template>

<script>
	import card from "./component/card";
	import {
		myProcessList,
		todoList,
		finishedList,
		selectMyList
	} from "@/config/service/flowable/process";
	import NonePage from "@/components/NonePage/NonePage.vue"

	export default {
		components: {
			card,
			NonePage
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				userInfo: null,
				tabList: ["我的流程", "待办任务", "已办任务"], // 顺序固定了不能去变
				// s= 我的流程 -0
				queryParams0: {
					pageNum: 1,
					pageSize: 10,
					// name: undefined,
					// category: undefined,
					// key: undefined,
					// tenantId: undefined,
					// deployTime: undefined,
					// derivedFrom: undefined,
					// derivedFromRoot: undefined,
					// parentDeploymentId: undefined,
					// engineVersion: undefined,
				},
				dataList0: [],
				isEnd0: false,
				status0: 'loading',
				// 待办任务 -1
				queryParams1: {
					pageNum: 1,
					pageSize: 10,
					// name: null,
					// category: null
				},
				// 已办任务 -2
				dataList1: [],
				isEnd1: false,
				status1: 'loading',
				queryParams2: {
					pageNum: 1,
					pageSize: 10,
					// name: null,
					// category: null
				},
				dataList2: [],
				isEnd2: false,
				status2: 'loading',
				// e=
				loading: false,

				// 流程列表
				openQueryParams: {
					pageNum: 1,
					pageSize: 10
				},
				definitionList: [],
				isShow: false,
				CustomBar: '0' || this.CustomBar,
				CustomBar1: this.CustomBar + 50,
				CustomBar2: 145,
				// #ifdef APP-PLUS
				CustomBar2: 46,
				// #endif

				// s= 下拉加载参数
				contentText: {
					contentdown: '加载中...',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				},
			};
		},

		

		onPullDownRefresh() {
			// console.log('这个是下拉刷新??');
			this.pullDownRefresh()
		},
		// onReachBottom() {
			
		// },

		computed: {
			que() {
				return {
					...this['queryParams' + this.TabCur]
				}
			},

			dataList() {
				return this['dataList' + this.TabCur]
			},

			status() {
				return this['status' + this.TabCur]
			}
		},

		mounted() {
			this.userInfo = this.$store.user || uni.getStorageSync('userInfo');
		},
		
		onShow() {
			this.TabCur = uni.getStorageSync('TabCur') || 0
			this.isShow = false
			this.pullDownRefresh()
		},

		methods: {

			// tab切换  
			tabSelect(e) {
				if (this.TabCur === e.currentTarget.dataset.id) return
				this.TabCur = e.currentTarget.dataset.id;
				uni.setStorageSync('TabCur', this.TabCur);
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;

				this.pullDownRefresh()

			},
			
			handlerOnReachBottom(){
				// console.log("触底")
				if (!this['isEnd' + this.TabCur]) {
					this['status' + this.TabCur] = 'loading';
					this['queryParams' + this.TabCur].pageNum++
					this.handlerGetList()
				}
			},

			// 下拉刷新
			pullDownRefresh() {
				this['isEnd' + this.TabCur] = false;
				this['status' + this.TabCur] = 'more';
				this['dataList' + this.TabCur] = [];
				this['queryParams' + this.TabCur] = {
					...this.que,
					pageNum: 1,
					pageSize: 10
				}
				this.handlerGetList()
			},
			
			

			// 请求数据
			getData_0() {
				// this.$loading(true)
				myProcessList(this.que).then(response => {
					this.handlerResponse(response)
					// this.$loading(false)
					// if(response.data.list.length === 0){
					//   this['isEnd' + this.TabCur] = true;
					// 		this['status' + this.TabCur] = 'noMore';
					// 		return
					// }

					// if(response.data.list.length < this['queryParams' + this.TabCur].pageSize){
					// 		this['status' + this.TabCur] = 'noMore';
					// }

					// this['dataList'+ this.TabCur] = this['dataList'+ this.TabCur].concat(response.data.list) 

					// uni.stopPullDownRefresh()
				}).catch(()=>{
					uni.stopPullDownRefresh()
				});
			},
			/** 查询流程定义列表 */
			getData_1() {
				// this.$loading(true)
				todoList(this.que).then(response => {
					this.handlerResponse(response)
				}).catch(()=>{
					uni.stopPullDownRefresh()
				});
			},
			/** 查询流程已办 */
			getData_2() {
				// this.$loading(true)
				finishedList(this.que).then(response => {
					this.handlerResponse(response)
				}).catch(()=>{
					uni.stopPullDownRefresh()
				});
			},

			handlerResponse(response) {
				uni.stopPullDownRefresh()
				// this.$loading(false)
				if (response.data.list.length === 0) {
					this['isEnd' + this.TabCur] = true;
					this['status' + this.TabCur] = 'noMore';
					return
				}

				if (response.data.list.length < this['queryParams' + this.TabCur].pageSize) {
					this['status' + this.TabCur] = 'noMore';
				}

				this['dataList' + this.TabCur] = this['dataList' + this.TabCur].concat(response.data.list)
				
			},

			handlerGetList() {
				this['getData_' + this.TabCur]()
				uni.setNavigationBarTitle({
					title: this.tabList[this.TabCur] //这是修改后的导航栏文字
				})
			},

			// s=发起新的流程
			handleAdd() {
				this.isShow = true
				selectMyList(this.openQueryParams).then(response => {
					this.definitionList = response.data.list.filter(e => e.formId);
					// this.processTotal = response.data.total;
					// this.processLoading = false;
				});
			},
			handleStartProcess(row) {
				const {
					deploymentId: deployId,
					id: procDefId,
					name
				} = row
				uni.navigateTo({
					url: `/pages/record/index?deployId=${deployId}&procDefId=${procDefId}&finished=true&name=${name}`
				})
			}
			// e=
		},
	};
</script>

<style lang="scss" scoped>
	.upcomingPage{
		display: flex;
		flex-direction: column;
		
	}
	
	.cu-item.text-default {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #1678FF;
		position: relative;
		border: 0;
	}
	.cu-item.text-default::after{
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 66upx;
		height: 4upx;
		background: #1678FF;
		border-radius: 2px;
	}

	.cu-item {
		color: #999999;
	}

	.m-fex {
		position: fixed;
		bottom: 150upx;
		right: 50upx;
		z-index: 999;
		font-size: 20px;
	}
</style>
