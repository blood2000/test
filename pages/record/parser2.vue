<template>
  <view>
    <uni-section title="信息" type="line"></uni-section>
      <uni-forms class="margin-top" ref="customForm" :rules="formRules" :modelValue="mformData">
        <template v-for="(cur, index) in formConfCopy.fields">
          <!-- <test :key="index" /> -->
          <component
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

export default {
  components: {
    "el-input": ElInput,
    "el-select": ElSelect,
    "el-date-picker": ElDatePicker,
    "multi-selector": MultiSelector,
    "el-upload": ElUpload,
    "el-input-number": ElInputNumber,
    "my-table": MyTable,
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
    

    return {
      ...data,
    };
  },
  mounted() {
    this.initFormData(
      this.formConfCopy.fields,
      this.mformData,
      this.watchs,
      this.formConf.formModel
    );

    
  },
  methods: {
    initFormData(componentList, formData, watchs, name) {
      // 再给 formData 赋值

      componentList.forEach((cur) => {

        const config = cur.__config__;

        if (cur.__vModel__) {

          this.$set(this.mformData, cur.__vModel__, config.defaultValue)
        }
        if (config.children) this.initFormData(config.children, formData, watchs, name);
      });

    },
  },
};
</script>

<style>
.cu-form-group .title {
  min-width: calc(4em + 15px);
}
</style>
