import Vue from 'vue'
import App from './App'
// import './common/css/icon.scss'
// import '@/common/font/index.scss'; // 字体文件
// import '@/common/gIconfont/iconfont.css'; // 字体图标
// 使用 svg js字体图标
// require('@/common/gIconfont/iconfont');
//引入vuex
import store from './store'
import { parseTime, numberFormat, numberFormatUnit, selectDictLabel, selectDictLabels } from './utils/ddc.js';
import { formatDate } from '@/utils/date.js';
import { wxlogin } from './utils/login.js';

import { getDicts } from '@/config/service/system';



Vue.config.productionTip = false

// 基本提示
Vue.prototype.msgSuccess = (msg)=>{
    uni.showToast({title: msg,icon: 'none', duration: 1000});
};
// loading
Vue.prototype.$loading = (bool)=>{
    
    if(bool){
        uni.showLoading({mask: true});
    } else {
        uni.hideLoading();
    }
};
Vue.prototype.getDicts = getDicts;
Vue.prototype.parseTime = parseTime;
Vue.prototype.numberFormat = numberFormat;
Vue.prototype.numberFormatUnit = numberFormatUnit;
Vue.prototype.selectDictLabel = selectDictLabel;
Vue.prototype.selectDictLabels = selectDictLabels;
Vue.prototype.wxlogin = wxlogin;
Vue.prototype.$store = store;
Vue.prototype.formatDate = formatDate;
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
