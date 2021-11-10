<template>
	<view>
		<uni-collapse class="margin-mtop" v-model="accordionVal" @change="change">
			<uni-collapse-item title="查询条件">
				<view class="content">
					<view v-for="(item, index) in dataModelDto.queryFields" :key="index">
						<view v-if="item.dataItemInfo.itemType === 'string' || item.dataItemInfo.itemType === 'number' || item.dataItemInfo.itemType === 'float'" class="form-frame">
							<view class="title">{{item.dataItemInfo.itemCn}}</view>
							<input class="text-right size26" v-model="item.value" :placeholder="'请输入'+item.dataItemInfo.itemCn" name="input"></input>
						</view>
						<view v-if="item.dataItemInfo.itemType === 'date'" class="form-frame">
							<view class="title">{{item.dataItemInfo.itemCn}}</view>
							<view class="flex align-center text-right">
								<picker mode="date" :value="item.startTime" start="1900-01-01" end="3000-01-01" @change="(e)=>bindDateChange(item, e, 'startTime')">
									<view>{{item.startTime || '开始时间'}}</view>
								</picker>
								<view class="padding-lr">-</view>
								<picker mode="date" :value="item.endTime" start="1900-01-01" end="3000-01-01" @change="(e)=>bindDateChange(item, e, 'endTime')">
									<view>{{item.endTime || '结束时间'}}</view>
								</picker>
							</view>
						</view>
						<view v-if="item.dataItemInfo.itemType === 'enum'" class="form-frame">
							<view class="title">{{item.dataItemInfo.itemCn}}</view>
							<picker
							 :value="item.value"
							 :range="item.itemOptions"
							 range-key="dictLabel"
							 @change="(e)=>PickerChange(item, e)">
								<view class="picker text-right">
									{{item.value?item.itemOptions[item.itemOptions.findIndex(res => res.dictValue===item.value)].dictLabel:'请选择'+item.dataItemInfo.itemCn}}
								</view>
							</picker>
						</view>
					</view>
					<!-- <uni-forms  ref="baseForm" :modelValue="baseFormData">
						<view v-for="(item, index) in dataModelDto.queryFields" :key="index">
							
							<view class="uni-form-item uni-column" v-if="item.dataItemInfo.itemType === 'string' || item.dataItemInfo.itemType === 'number' || item.dataItemInfo.itemType === 'float'">
								<view class="title">{{item.dataItemInfo.itemCn}}</view>
								<input 	v-model="item.value" class="uni-input" name="input" placeholder="这是一个输入框" />
							</view>
							
							<uni-forms-item 
							 v-if="item.dataItemInfo.itemType === 'string' || item.dataItemInfo.itemType === 'number' || item.dataItemInfo.itemType === 'float'"
							 :label="item.dataItemInfo.itemCn" name="name">
								<uni-easyinput type="text" v-model="item.value" placeholder="" />
							</uni-forms-item>
							
							<uni-forms-item v-if="item.dataItemInfo.itemType === 'enum'" :label="item.dataItemInfo.itemCn" name="name">
								<select v-model="item.value">
									<option v-for="dict in item.itemOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue"/>
								</select>
							</uni-forms-item>
							
							<view class="uni-form-item uni-column" v-else-if="item.dataItemInfo.itemType === 'enum'">
								<view class="title">{{item.dataItemInfo.itemCn}}</view>
								<select v-model="item.value">
									<option v-for="dict in item.itemOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue"/>
								</select>
							</view>
							
							<uni-forms-item v-if="item.dataItemInfo.itemType === 'date'" :label="item.dataItemInfo.itemCn" name="name">
								<view class="flex align-center justify-end">
									<picker mode="date" :value="item.startTime" start="1900-01-01" end="3000-01-01" @change="(e)=>bindDateChange(item, e, 'startTime')">
										<view class="uni-input">{{item.startTime || '开始时间'}}</view>
									</picker>
									<picker mode="date" :value="item.endTime" start="1900-01-01" end="3000-01-01" @change="(e)=>bindDateChange(item, e, 'endTime')">
										<view class="uni-input">{{item.endTime || '结束时间'}}</view>
									</picker>
								</view>
							</uni-forms-item>
							
							<view class="uni-form-item uni-column" v-else-if="item.dataItemInfo.itemType === 'date'">
								<view class="title">{{item.dataItemInfo.itemCn}}</view>
								<uni-datetime-picker type="date" v-model="item.startTime" :border="false" style="text-align: right"/>
								<uni-datetime-picker type="date" v-model="item.endTime" :border="false" style="text-align: right"/>
							</view>
						</view>
					</uni-forms> -->
				</view>
			</uni-collapse-item>
		</uni-collapse>
	
		<view class="flex align-center margin-mtop margin-mbottom">
			<button class="form-btn bg-blue" form-type="submit" @click="handleQuery">查询</button>
			<button class="bg-white form-btn line-blue" form-type="reset" @click="resetQuery">重置</button>
		</view>
	
		<view v-for="(item, index) in realDataList" :key="index" class="cont-frame">
			<view v-for="(res, index) in realDataList[index]" :key="index" class="flex align-center margin-stop">
				<view class="text-tag" style="min-width: 150upx;">{{ res.name }} ：</view>
				<view class="">{{ res.value }}</view>
			</view>
			<!-- <uni-group v-for="(item, index) in realDataList">
				<view v-for="(item1, index) in realDataList[index]"> 
					{{ item1.name }} : {{ item1.value }} 
				</view>
			</uni-group> -->
		</view>
		<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
	</view>
</template>

<script>
import { getDataModel, searchDataModel } from '@/config/service/data/dataCenter.js';
import { deepClone } from '@/utils/index';
import { getDicts } from '@/config/data.js';
// import UniCard from "../../uni_modules/uni-card/components/uni-card/uni-card";
// import UniCollapse from "@/components/uni-collapse/uni-collapse.vue"
// import UniCollapseItem from "@/components/uni-collapse-item/uni-collapse-item.vue"
export default {
	name: '',
	components: {
		// UniCard,
		// UniCollapse,
		// UniCollapseItem
	},
	data() {
		return {
			status: 'more',
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多了'
			},
			isEnd: false,
			accordionVal: undefined,
			baseFormData:{},
			modelId: null,
			// 查询参数
			page: {
				pageNum: 1,
				pageSize: 10
			},
			queryFields: [],
			tableFields: [],
			// 总条数
			total: 0,
			loading: false,
			// 导出按钮
			exportLoading: false,
			// 列表数据
			dataList: [],
			// 函数字典值
			functionList: [],
			dataModelDto: {
				queryFields: [],
				tableFields: [],
				page: {
					pageNum: 1,
					pageSize: 10
				}
			},
			query: {
				dataModelId: null,
				paramsList: [],
				page: {
					pageNum: 1,
					pageSize: 10
				}
			},
			realDataList:[]
		};
	},
	onReachBottom() {
		console.log("触底")
		if(!this.isEnd) {
			this.status = 'more';
			this.page.pageNum ++
			this.getList();
		}
	},
	mounted() {
		// const path = this.$route.query.name;
		// const pathArr = path.split('/');
		// this.modelId = pathArr[1];
	},
	onLoad(option) {
		console.log(option.name);
		const path = option.name;
		const pathArr = path.split('/');
		const index = pathArr.length - 1;
		this.modelId = pathArr[index];
		this.getDataModelData();
		this.getFunctionList();
	},
	methods: {
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.index = e.target.value
		},
		/** 获取函数字典值 */
		getFunctionList() {
			getDicts('agg_function').then(response => {
				this.functionList = response.data;
			});
		},
		/** 获取模型数据 */
		getDataModelData() {
			getDataModel(this.modelId).then(res => {
				uni.setNavigationBarTitle({
					title: res.data.name
				});
				if (res.data && res.data.dataModelDto) {
					const dataModelDto = res.data.dataModelDto;
					// 如果是枚举类型，要请求字典
					if (dataModelDto.queryFields) {
						dataModelDto.queryFields.forEach((el, i) => {
							if (el.dataItemInfo.itemKey && el.dataItemInfo.itemKey !== '') {
								getDicts(el.dataItemInfo.itemKey).then(value => {
									// this.$set(dataModelDto.queryFields[i], "itemOptions", value.data); 
									dataModelDto.queryFields[i].itemOptions = value.data;
								});
							}
						});
					}
					// 缓存数据
					this.$nextTick(() => {
						const { queryFields, tableFields, page } = dataModelDto;
						console.log(dataModelDto);
						this.dataModelDto = dataModelDto;
						this.queryFields = dataModelDto.queryFields || [];
						this.tableFields = tableFields || [];
						this.page = page || {};
					});
					setTimeout(() => {
						this.resetQuery();
					}, 300);
				}
			});
		},
		/** 搜索按钮操作 */
		handleQuery() {
			this.page.pageNum = 1;
			this.isEnd = false;
			this.realDataList = [];
			this.getList();
		},
		/** 重置按钮操作 */
		resetQuery() {
			this.dataModelDto.queryFields = deepClone(JSON.parse(JSON.stringify(this.queryFields)));
			// console.log();
			this.dataModelDto.tableFields = deepClone(this.tableFields);
			this.dataModelDto.page = deepClone(this.page);
			//this.resetForm('queryForm');
			this.handleQuery();
		},
		getList() {
			this.status = 'loading';
			this.loading = true;
			this.query.dataModelId = this.modelId;
			console.log(this.dataModelDto.queryFields);
			this.query.paramsList = this.dataModelDto.queryFields.map(res => {
				return {
					end: res.end || '',
					endTime: res.endTime || '',
					name: res.dataItemInfo.itemEn || '',
					start: res.start || '',
					startTime: res.startTime || '',
					value: res.value || ''
				}
			})
			this.query.page = this.page || {};
			const que = {
				dataModelId: this.modelId,
				page: this.page || {},
				paramsList: JSON.stringify(this.query.paramsList)
			}
			console.log(this.query);
			searchDataModel(que).then(res => {
				this.loading = false;
				if(res.data.list.length === 0) {
					this.isEnd = true;
					this.status = 'noMore';
					return
				}
				if(res.data.list.length < this.page.pageSize){
					this.status = 'noMore';
				}
				
				if (res.data) {
					const { list, total } = res.data;
					this.total = total || 0;
					this.dataList = list || [];
					for (let index in this.dataList){
						let ary = [];
						for (let index1 in this.tableFields) {
							let obj = {};
							let valueKey = this.tableFields[index1].functionFieldAlias || this.tableFields[index1].nodeId+"_"+this.tableFields[index1].dataItemInfo.itemEn;
							this.$set(obj, "name", this.tableFields[index1].fieldLabel); 
							this.$set(obj, "value", this.dataList[index][valueKey]);
							this.$set(obj, "sort", this.tableFields[index1].dataItemInfo.sort);
							ary.push(obj);
						}
						this.realDataList.push(ary);
						// console.log(this.realDataList);
					}
				} else {
					this.total = 0;
					this.dataList = [];
					this.realDataList = [];
				}
			});
		},
		change(index) {
			console.log(index);
		},
		bindDateChange(item, e, key) {
			// console.log(item, e);
			this.$set(item, key, e.detail.value); 
			if (item.startTime && item.endTime) {
				if (new Date(item.startTime).getTime()>new Date(item.endTime).getTime()) {
					this.$set(item, 'startTime', undefined);
					this.$set(item, 'endTime', undefined);
					this.msgSuccess('开始时间必须小于或等于结束时间');
				}
			}
			// item = e.detail.value;
			// console.log(this.dataModelDto.queryFields);
		},
		PickerChange(item, e) {
			// console.log(item, e);
			this.$set(item, 'value', item.itemOptions[e.detail.value].dictValue);
		}
	}
};
</script>

<style lang="scss" scoped>
	.form-btn{
		margin: 0 30upx;
		width: 50%;
		line-height: 70upx;
	}
	.uni-forms-item{
		padding: 0 30upx;
	}
	::v-deep select{
		width: 100%;
		border: 1upx solid #ebebeb;
		border-radius: 4upx;
		height: 72upx;
	}
	.cont-frame{
		padding: 20upx;
		background-color: #FFFFFF;
		margin: 24upx 24upx 0;
		border-radius: 20upx;
	}
	.form-frame{
		border-top: 1upx solid #ebebeb;
		padding: 0px 30upx;
		min-height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.title {
			color: #999999;
			min-width: calc(4em + 30upx);
			text-align: justify;
			padding-right: 30upx;
			font-size: 30upx;
			position: relative;
			height: 60upx;
			line-height: 60upx;
		}
	}
</style>