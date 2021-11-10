<template>
  <view>
    <uni-section title="信息" type="line"></uni-section>
      <uni-forms class="margin-top" ref="customForm" :rules="formRules" :modelValue="mformData">
        <template v-for="(cur, index) in formConfCopy.fields">
          <!-- <test :key="index" /> -->
          <component
            v-if="!(['t-title'].includes(cur.__config__.tag))"
            :cur="cur"
            v-model="mformData[cur.__vModel__]"
            :key="cur.id + '' + index"
            :is="cur.__config__.tag"
          />
        </template>
      </uni-forms>
  </view>
</template>

<script>
const format = [
  'yyyy',
  'yyyy-MM',
  'yyyy-MM-dd',
  'yyyy-MM-dd hh:mm:ss',
  'yyyy-MM-dd HH:mm:ss',
  'hh:mm:ss',
  'HH:mm:ss'
];

const ruleTrigger = {
  'el-input': 'blur',
  'el-input-number': 'blur',
  'el-select': 'change',
  'el-radio-group': 'change',
  'el-checkbox-group': 'change',
  'el-cascader': 'change',
  'el-time-picker': 'change',
  'el-date-picker': 'change',
  'el-rate': 'change'
};

import { deepClone } from "@/utils/index.js";
import request from "@/config/request.js";
import baseURL from '@/config/index.js';

import ElInput from './component/el-input'
import ElSelect from './component/el-select'
import ElDatePicker from './component/el-date-picker'
import MultiSelector from './component/multi-selector'
import ElUpload from './component/el-upload'
import ElInputNumber from './component/el-input-number'
import MyTable from './component/my-table'
import elTag from './component/el-tag'

import graceChecker from '@/common/graceChecker.js'

export default {
  components: {
    "el-input": ElInput,
    "el-select": ElSelect,
    "el-date-picker": ElDatePicker,
    "multi-selector": MultiSelector,
    "el-upload": ElUpload,
    "el-input-number": ElInputNumber,
    "my-table": MyTable,
    "el-tag": elTag,
  },

  props: {
    formConf: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
    isStar:{
      type: Boolean,
      default: true
    }
  },

  watch: {
    // 父组件使用
    mformData: {
      handler(val) {
        if (val) {
          this.$emit("mformData", val);
        }
      },
      immediate: true,
    },
    // 父组件使用
    formConfCopy: {
      handler(val) {
        if (val) {
          this.$emit("formConfCopy", val);
        }
      },
      immediate: true,
    },
  },


  computed:{
    mformData:{
      get(){
        return this[this.formConf.formModel]
      },
      set(val){
        this[this.formConf.formModel] = val
      }
    },
    formRules:{
      get(){
        return this[this.formConf.formRules]
      },
      set(val){
        this[this.formConf.formRules] = val
      }
    }
  },

  data() {
    const data = {
      formConfCopy: this.formConf,
      [this.formConf.formModel]: {},
      [this.formConf.formRules]: {},
      // 监听使用
      watchs: {},
    };
    
    // this.buildRules(data.formConfCopy.fields, data[this.formConf.formRules]); // 不做

    return {
      ...data,
      watchs:{},
      $_$: undefined,
    };
  },
  mounted() {
    this.initFormData(
      this.formConfCopy.fields,
      this.mformData,
      this.watchs,
      this.formConf.formModel
    );
	this.buildRules(this.formConfCopy.fields, this.formRules);
    
	this.initWatchs()
    // this.isStar && this.initWatchs();
  },
  methods: {
    initFormData(componentList, formData, watchs, name) {
      // 再给 formData 赋值
      for (const i in componentList) {
        if (Object.hasOwnProperty.call(componentList, i)) {
          const cur = componentList[i];

          const config = cur.__config__;
          // s= 默认值特殊优先处理
          // console.log(config);
          // if(config.tag === 'el-date-picker'){
          //   console.log(config.defaultValue, '值是多少??');
          // }

          if (cur.__vModel__) {
            this.$set(this.mformData, cur.__vModel__, config.defaultValue)
          }
      
          if (config.children) this.initFormData(config.children, formData, watchs, name);

          // s= 单独处理时间默认值
          this._handlerElTiemDate(formData, cur);

          if(this.isStar) {
            // s= 公共起一个获取数据
            this.handlerDataConfig(config, cur, watchs, name);
  
            // s= 下拉框获取数据
            this.handlerOptionConfig(config, cur, watchs, name);
          }
		  
          // s= 处理自定义 描述列表
          this.handlerDescriptions(config, cur, watchs, name, formData);
          
        }
      }
      
    },
    buildRules(componentList, rules) {
		  componentList.forEach(cur => {
			const config = cur.__config__;
			
			if (Array.isArray(config.regList)) {
			  if (config.required) {
				const required = { required: config.required, message: cur.placeholder };
				if (Array.isArray(config.defaultValue)) {
				  required.type = 'array';
				  required.message = `请至少选择一个${config.label}`;
				}
				required.message === undefined && (required.message = `${config.label}不能为空`);
				config.regList.push(required);
			  }
			  rules[cur.__vModel__] = config.regList.map(item => {
				item.pattern && (item.pattern = eval(item.pattern));
				item.trigger = ruleTrigger && ruleTrigger[config.tag];
				return item;
			  });
			}
			if (config.children) this.buildRules(config.children, rules);
		  });
	},

    // s= 处理动态获取数据
    // 处理动态下拉框获取数据
    handlerOptionConfig(config, cur, watchs, name) {
      if (config.optionConfig) {
        const {
          dataSource,
          api,
          form,
          isImmediately,
          dataPath,
          dataLabel,
          dataValue
        } = config.optionConfig;
        if (dataSource === 'dynamic') return;

        // 下面代码复用
        const bool = dataSource === 'api';

        let arr = bool ? api.parames : form.parames

        

        const obj = {
          // 数据变化,这里可以获取到要修改的值
          ...config.optionConfig,
          watchTypes: undefined,
          __vModel__: cur.__vModel__,
          type: 'optionConfig'
        };
        delete obj.watchTypes;
        bool && delete obj.form;
        !bool && delete obj.api;

        // 无特殊数据自接请求路线 条件(1.arr.length===0 参数要监听的东西(无特殊符号) 2.bool===true 是否api请求)
        let isNowQuery = !!(bool && Array.isArray(arr) && arr.length === 0)

        if (isNowQuery) {
          this.fetchData(
            {
              url: api.url,
              method: api.method,
              params: api.paramesJson ? JSON.parse(api.paramesJson) : undefined,
              dataPath: dataPath,
              dataLabel,
              dataValue
            },
            cur.__vModel__,
            'optionConfig',
            cur
          );
        } else {
          // 走监听路线(如果arr.length===0 则无需走下面的)
          this._handlerWatchs(arr, obj, name, watchs, bool);
        }
      }
    },

    // 自定义数据
    handlerDescriptions(config, cur, watchs, name, formData) {
      let key = 'headOption';
      if (config.sourceType === 'headOption') {
        key = 'headOption';
      } else if (config.sourceType === 'tableHeadOption_tableDataConfig') {
        key = 'tableDataConfig';
      }

      if (config[key] && config.tag === 'my-table') {
        const {
          dataSource,
          api,
          form,
          isImmediately,
          dataPath,
          dataLabel,
          dataValue,
          // 多
          dataList
        } = config[key];

        if (dataSource === 'dynamic') {
          formData[cur.__vModel__] = dataList;
          return;
        }

        const bool = dataSource === 'api';
        let arr = bool ? api.parames : form.parames

        const obj = {
          // 数据变化,这里可以获取到要修改的值
          ...config[key],
          watchTypes: undefined,
          __vModel__: cur.__vModel__,
          type: key
        };
        delete obj.watchTypes;
        bool && delete obj.form;
        !bool && delete obj.api;

        let isNowQuery = !!(bool && Array.isArray(arr) && arr.length === 0)
        // #ifdef APP-PLUS
        isNowQuery = !!(bool && JSON.stringify(arr) === '{}')
        // #endif

        if (isNowQuery) {
          this.fetchData(
            {
              url: api.url,
              method: api.method,
              params: api.paramesJson ? JSON.parse(api.paramesJson) : undefined,
              dataPath: dataPath,
              dataLabel,
              dataValue
            },
            cur.__vModel__,
            obj.type,
            cur
          );
        } else {
          // 走监听路线(如果arr.length===0 则无需走下面的)
          this._handlerWatchs(arr, obj, name, watchs, bool);
        }
      }
    },

    // 基本处理
    handlerDataConfig(config, cur, watchs, name) {
      if (config.dataConfig) {
        const { dataSource, api, form, isImmediately, dataPath } =
          config.dataConfig;
        if (dataSource === "no") return;

        const bool = dataSource === "api";

        let arr = bool ? api.parames : form.parames
        

        const obj = {
          // 数据变化,这里可以获取到要修改的值
          ...config.dataConfig,
          watchTypes: undefined,
          __vModel__: cur.__vModel__,
          type: "dataConfig",
        };
        delete obj.watchTypes;
        bool && delete obj.form;
        !bool && delete obj.api;

        let isNowQuery = !!(bool && Array.isArray(arr) && arr.length === 0)
        // #ifdef APP-PLUS
        isNowQuery = !!(bool && JSON.stringify(arr) === '{}')
        // #endif

        // 无特殊数据自接请求路线 条件(1.arr.length===0 参数要监听的东西(无特殊符号) 2.bool===true 是否api请求)
        if (isNowQuery) {
          this.fetchData(
            {
              url: api.url,
              method: api.method,
              params: api.paramesJson ? JSON.parse(api.paramesJson) : undefined,
              dataPath: dataPath,
            },
            cur.__vModel__,
            obj.type,
            cur
          );
        } else {
          
          // 走监听路线(如果arr.length===0 则无需走下面的)
          this._handlerWatchs(arr, obj, name, watchs, bool);
        }
      }
    },
    _handlerWatchs(arr, oldObj, name, watchs, bool) {
      if (arr.length < 1) return;

      for (const i in arr) {
        if (Object.hasOwnProperty.call(arr, i)) {
          const e = arr[i];
          const obj = JSON.parse(JSON.stringify(oldObj));
          bool && (obj.replaceKey = e.label);
          !bool && (obj.replaceValue = e.value);
          let strpath = ""; // 监听的路径
          if (e.watch === "formData") {
            strpath = name + "." + e.value; // 表单监听
          } else {
            strpath = e.watch + "." + e.value; // 路由监听 TODO 组件传值未处理
          }

          if (watchs[strpath]) {
            watchs[strpath].push(obj);
          } else {
            watchs[strpath] = [obj];
          }
        }
      }
      // arr.forEach((e) => {
      // });
    },
    // 初始化监听内容
    initWatchs() {
      
      // this.debounceFetchData = this.newDebounceFun(this.fetchData, 1000);
      // 创建2个是防止调用同一个会被协和掉

      const customizes = ["headOption", "clickon", "tableDataConfig"];

      // 通用
      customizes.concat(["dataConfig", "optionConfig"]).forEach((type) => {
        this["debounceFetchData" + type] = this.newDebounceFun(
          this.fetchData,
          1000
        );
      });

      this.infoMsg = this.newDebounceFun((dataPath) => {
        console.log(
          "[" +
            dataPath +
            "]未匹配到值, 可能数据路径设置错误, 请重新去设置数据路径"
        );
      }, 2000);

      // 存一个值
      const $_arr = []
      for (const i in this.formConf.fields) {
        if (Object.hasOwnProperty.call(this.formConf.fields, i)) {
          const cr = this.formConf.fields[i];
          const obj = {
            __vModel__: cr.__vModel__,
            dataConfig: cr.__config__.dataConfig,
            optionConfig: cr.__config__.optionConfig,
          };
          // 另外添加

          customizes.forEach((e) => {
            obj[e] = cr.__config__[e];
          });

          $_arr.push(obj)
        }
      }
      this.$_$ = JSON.parse(JSON.stringify($_arr)); 
      
      for (const key in this.watchs) {
        if (Object.hasOwnProperty.call(this.watchs, key)) {
          const items = this.watchs[key];
          this.$watch(
            key,
            (val) => {
			 
              if (typeof val === "undefined" || val === null || val=='') return;
              items.forEach((e) => {
                const {
                  __vModel__,
                  type, // = "dataConfig", // 默认处理数据是dataConfig , 下拉是处理 optionConfig
                } = e;
                // this.$_$ 是当前自定义的变量, 可以临时修改存储
                this.$_$.forEach((cr) => {
                  if (cr.__vModel__ === __vModel__) {
                    // 通过type 判断要处理那个对象 this.$_$ 中要添加进来, 监听的时候要定义好
                    this.handlerWactSetData(cr[type], e, val);
                  }
                });
              });
            },
            { immediate: true, deep: true }
          );
        }
      }
    },

    // 动态监听请求
    handlerWactSetData(handlerConfig, e, val) {
      const {
        dataSource,
        api,
        replaceKey,
        replaceValue,
        __vModel__,
        dataPath,
        type = "dataConfig", // 默认处理数据是dataConfig , 下拉是处理 optionConfig
      } = e;

      if (
        dataSource === "api" &&
        handlerConfig &&
        handlerConfig.api &&
        handlerConfig.api.parames
      ) {

        const handlerConfig_api_parames = []
        for (const i in handlerConfig.api.parames) {
          if (Object.hasOwnProperty.call(handlerConfig.api.parames, i)) {
            const e = handlerConfig.api.parames[i];
            handlerConfig_api_parames.push(e)
          }
        }

        handlerConfig_api_parames.forEach((e) => {
          if (e.label === replaceKey) {
            this.$set(e, "newvalue", val);
            const isOks = handlerConfig_api_parames.filter(
              (e) => typeof e.newvalue === "undefined"
            );

            if (isOks.length > 0) return;

            let str = handlerConfig.api.paramesJson;
            // 处理替换
            handlerConfig_api_parames.forEach((item) => {
              let replaceValue = item.newvalue;
              if (replaceValue && typeof replaceValue === "object") {
                replaceValue = JSON.stringify(replaceValue);
                str = str.replace(
                  RegExp('"' + item.label + '"', "g"),
                  replaceValue
                );
              } else {
                str = str.replace(RegExp(item.label, "g"), replaceValue);
              }
            });
            // 再做一层判断吧
            if (str.indexOf("%") !== -1) return;
            // 走去请求数据(做一个防抖了)
            // debounceFetchData

            if (type === "clickon") {
              
              for (const i in this.formConfCopy.fields) {
                if (Object.hasOwnProperty.call(this.formConfCopy.fields, i)) {
                  const e = this.formConfCopy.fields[i];
                  if (e.__vModel__ === __vModel__) {
                  if (e.__config__.clickon) {
                    this.$set(e, "disabled", false);
                    this.$set(
                      e.__config__.clickon.api,
                      "_paramsObj",
                      JSON.parse(str)
                    );
                  }
                }
                } 
              }

              return;
            }

            // 同时请求会被顶掉


            if (type === "tableDataConfig") {
              // TODO
              this.fetchData(
                {
                  url: handlerConfig.api.url,
                  method: handlerConfig.api.method,
                  params: JSON.parse(str),
                  dataPath: handlerConfig.dataPath,
                  dataLabel: handlerConfig.dataLabel,
                  dataValue: handlerConfig.dataValue,
                },
                __vModel__,
                type
              );
            } else {
              // TODO
              this["debounceFetchData" + type](
                {
                  url: handlerConfig.api.url,
                  method: handlerConfig.api.method,
                  params: JSON.parse(str),
                  dataPath: handlerConfig.dataPath,
                  dataLabel: handlerConfig.dataLabel,
                  dataValue: handlerConfig.dataValue,
                },
                __vModel__,
                type
              );
            }
          }
        });
      } else if (
        dataSource === "form" &&
        handlerConfig &&
        handlerConfig.form &&
        handlerConfig.form.parames
      ) {

        const handlerConfig_form_parames = []
        for (const i in handlerConfig.form.parames) {
          if (Object.hasOwnProperty.call(handlerConfig.form.parames, i)) {
            const e = handlerConfig.form.parames[i];
            handlerConfig_form_parames.push(e)
          }
        }

        handlerConfig_form_parames.forEach((e) => {
          if (e.value === replaceValue) {
            this.$set(e, "newvalue", val);
            const isOks = handlerConfig_form_parames.filter(
              (e) => typeof e.newvalue === "undefined"
            );
            if (isOks.length > 0) return;

            const resObj = {};
            handlerConfig_form_parames.forEach((item) => {
              resObj[item.value] = item.newvalue;
            });

            // 目标表单赋值
            // this.setFormData(
            //   __vModel__,
            //   this.handlerDataPath(dataPath, resObj)
            // );


            if (type && type === "optionConfig") {
              this.setOption(
                __vModel__,
                this.handlerDataPath(dataPath, resObj),
                handlerConfig.dataLabel,
                handlerConfig.dataValue
              );
            } else if (type && type === "dataConfig") {
              // 赋值
              this.setFormData(
                __vModel__,
                this.handlerDataPath(dataPath, resObj)
              );
            } else {
              this.handlerResult(
                __vModel__,
                this.handlerDataPath(dataPath, resObj),
                type
              );
            }
          }
        });
      }
    },

    // 赋值操作
    setFormData(__vModel__, value) {
      let event = value;
      if (Object.prototype.toString.call(value) === "[object Object]") {
        event = JSON.stringify(value);
      }

      for (const i in this.formConfCopy.fields) {
        if (Object.hasOwnProperty.call(this.formConfCopy.fields, i)) {
          const e = this.formConfCopy.fields[i];

          if (e.__vModel__ === __vModel__) {

            if (e.__config__.tag === 'el-tag') {
              this.$set(e.__slot__, 'default', event);
            }
          
            this.$set(e.__config__, "defaultValue", event);

            this.mySetData(__vModel__, event)
          }
        
        }
      }
    },

    // 数据路径
    handlerDataPath(dataPath, formData) {
      if (!dataPath) return formData;
      try {
        const res = dataPath
          .split(".")
          .reduce((pre, item) => pre[item] || {}, formData);

        if (JSON.stringify(res) === "{}") {
          // console.log("数据:", formData);
          this.$nextTick((e) => {
            this.infoMsg(dataPath);
          });
          return "";
        } else {
          return res;
        }
      } catch (error) {
        console.log(error);
        return "";
      }
    },

    // 防抖=需要带参数,避免和原方法冲突
    newDebounceFun(callback, time) {
      var timer;
      return function (...argument) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          callback(...argument);
        }, time);
      };
    },

    // 请求
    fetchData(
      { url, method, params, dataPath, dataLabel, dataValue },
      __vModel__,
      type = 'dataConfig',
      cur) {
      cur && this._setLoading(cur, true);
      return request({
        url: baseURL + url,
        method: method,
        params: method === 'get' ? params : undefined,
        data: method === 'post' ? params : undefined
        // 其他请求TODO
      })
        .then((result) => {

          cur && this._setLoading(cur, false);
          // 通用
          if (type && type === 'optionConfig') {
            this.setOption(
              __vModel__,
              this.handlerDataPath(dataPath, result),
              dataLabel,
              dataValue
            );
          } else if (type && type === 'dataConfig') {
            // 赋值
            this.setFormData(
              __vModel__,
              this.handlerDataPath(dataPath, result)
            );
          } else {
            this.handlerResult(
              __vModel__,
              this.handlerDataPath(dataPath, result),
              type
            );
          }
        })
        .catch((err) => {
          cur && this._setLoading(cur, false);
          console.log(err);
        });
    },

    // loading
    _setLoading(component, val) {
      const { directives } = component;
      if (Array.isArray(directives)) {
        const t = directives.find(d => d.name === 'loading');
        if (t) t.value = val;
      }
    },

    // 下拉框赋值
    setOption(__vModel__, value, dataLabel, dataValue) {
      const event = value;
      if (!Array.isArray(event)) { return console.log('不是一个数组,数据格式不匹配'); }

      for (const i in this.formConfCopy.fields) {
        if (Object.hasOwnProperty.call(this.formConfCopy.fields, i)) {
          const e = this.formConfCopy.fields[i];
          if (e.__vModel__ === __vModel__) {
            this.$set(
              e.__slot__,
              'options',
              event.map((e) => {
                return {
                  label: this.handlerDataPath(dataLabel, e), // dataLabel 为配置的label
                  value: this.handlerDataPath(dataValue, e) // dataValue 为配置的value
                };
              })
            );
          }
        }
      }

      // this.formConfCopy.fields.forEach((e) => {
      // });
    },

    // 其他自定义处理
    handlerResult(__vModel__, value, type) {

      for (const i in this.formConfCopy.fields) {
        if (Object.hasOwnProperty.call(this.formConfCopy.fields, i)) {
          const e = this.formConfCopy.fields[i];

          if (e.__vModel__ === __vModel__) {
          if (type === 'headOption') {
            const { dataLabel, dataValue, dataProp, resultForm = 'Array' } = e.__config__.headOption;
            const event = value;
            // 要求是个数组
            if (!Array.isArray(event)) { return console.log('不是一个数组,数据格式不匹配'); }

            const mobj = {};

            const defaultData = event.map((e, index) => {
              mobj[
                dataProp ? this.handlerDataPath(dataProp, e) : 'prop' + index
              ] = this.handlerDataPath(dataValue, e);
              return {
                label: this.handlerDataPath(dataLabel, e), // dataLabel 为配置的label
                value: this.handlerDataPath(dataValue, e), // dataValue 为配置的value
                prop: dataProp
                  ? this.handlerDataPath(dataProp, e)
                  : 'prop' + index // dataValue 为配置的value
              };
            });

            this.$set(e.__config__.headOption, 'dataList', defaultData);

            if (resultForm === 'Array') {

               this.mySetData(__vModel__,defaultData)
              
            } else if (resultForm === 'Object') {

              this.mySetData(__vModel__,mobj)
              
            }
          } else if (type === 'clickon') {
          } else if (type === 'tableHeadOption') {
            const { dataLabel, dataValue, resultForm = 'Array' } = e.__config__.tableHeadOption;
            const event = value;
            if (!Array.isArray(event)) { return console.log('不是一个数组,数据格式不匹配'); }

            const mobj = {};

            const childrens = event.map((e, index) => {
              mobj[
                dataValue ? this.handlerDataPath(dataValue, e) : 'prop' + index
              ] = undefined;
              return {
                __config__: {
                  layout: 'raw',
                  tag: 'el-table-column',
                  renderKey: Date.now() + index
                },
                prop: this.handlerDataPath(dataValue, e),
                isShow: true,
                label: this.handlerDataPath(dataLabel, e)
              };
            });

            this.$set(e.__config__, 'children', childrens);
            this.$set(e.__config__, 'dataTemplate', mobj);

            if (resultForm === 'Array') {
              this.mySetData(__vModel__,childrens)
              // this.$set(this[this.formConf.formModel], __vModel__, childrens);
              // this.$set(this.mformData, __vModel__, childrens)
            } else if (resultForm === 'Object') {
              this.mySetData(__vModel__,mobj)
              // this.$set(this[this.formConf.formModel], __vModel__, mobj);
              // this.$set(this.mformData, __vModel__, mobj)
            }
          } else if (type === 'tableDataConfig') {
            const event = value;
            if (!Array.isArray(event)) { return console.log('不是一个数组,数据格式不匹配'); }

            if (e.__config__.tag === 'my-table') {
              const { dataList } = e.__config__.tableHeadOption;

              const datas = dataList.map(e => {
                return {
                  label: e.label,
                  prop: e.prop,
                  value: event[0][e.prop]
                };
              });


              this.$set(e.__config__.tableHeadOption, 'dataList', datas);
            } else {
              this.$set(e, 'data', [event[0]]);
              this.$set(e.__config__, 'dataTemplate', event[0]);

              this.mySetData(__vModel__,[event[0]])
              
            }
          }
        }



        }
      }

    },

    // s= 时间
    _handlerElTiemDate(formData, cur) {
      const config = cur.__config__;
      if (config.tag === 'el-time-picker' || config.tag === 'el-date-picker' || config.tag === 'el-time-select') {
        if (!config.nowDate) return;
        let str = cur['value-format'];
        if (format.indexOf(str) !== -1) {
          if (str === 'yyyy-MM-dd HH:mm:ss') {
            str = 'yyyy-MM-dd hh:mm:ss';
          } else if (str === 'HH:mm:ss') {
            str = 'hh:mm:ss';
          }

          const params = this.formatDate(new Date(), str);
          if (cur['range-separator']) {
          // 设置区间范围
            this.$set(config, 'defaultValue', this.formatDate(new Date(), 'yyyy-MM-dd') + ' 00:00:00' + cur['range-separator'] + params);
            this.$set(formData, cur.__vModel__, [this.formatDate(new Date(), 'yyyy-MM-dd') + ' 00:00:00', params]);
          } else {
            this.$set(config, 'defaultValue', params);
            this.$set(formData, cur.__vModel__, params);
          }
        }
      }
    },

    mySetData(__vModel__,value){
      this.$set(this.mformData, __vModel__,  value)

      // console.log(this.mformData, '当前表单的值了');
      // console.log(this.formConf, '也修改了defaultValue的值了 '); 
    },

    // e=
	
    // s= 表单验证verify
    submVerify(){
      const rules = []
      for (const key in this.formRules) {
        if (Object.hasOwnProperty.call(this.formRules, key)) {
        const ruleArr = this.formRules[key];

        // 数组验证如何处理??? checkType应该填什么??
        ruleArr.forEach(e =>{ 
          let obj = {
          name: key,
          checkType: 'notnull', // string
          errorMsg: e.message
          }
          rules.push(obj)
        })
        } 
      }

      var checkRes = graceChecker.check(this.mformData, rules);
        
      if(checkRes){
        // uni.showToast({title:"验证通过!", icon:"none"});
        return true
      }else{
        uni.showToast({ title: graceChecker.error, icon: "none" });
        return false
      }
    },
    // e=

    // s= 重置
    resetForm() {
    
    },
    // e=
  },
};
</script>

<style>
.cu-form-group .title {
  min-width: calc(4em + 15px);
}
</style>
