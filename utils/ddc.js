// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  time = new Date(time);
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time);
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/');
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value]; }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  if (datas === undefined || datas === null) {
    return '';
  }
  var actions = [];
  Object.keys(datas).some((key) => {
    if (('' + datas[key].dictValue) === ('' + value)) {
      actions.push(datas[key].dictLabel);
      return true;
    }
  });
  return actions.join('');
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
  var actions = [];
  var currentSeparator = undefined === separator ? ',' : separator;
  var temp = value.split(currentSeparator);
  Object.keys(value.split(currentSeparator)).some((val) => {
    Object.keys(datas).some((key) => {
      if (('' + datas[key].dictValue) === ('' + temp[val])) {
        actions.push(datas[key].dictLabel + currentSeparator);
      }
    });
  });
  return actions.join('').substring(0, actions.join('').length - 1);
}


export function numberFormat(val){
	let num = 0;
	if(typeof val === "number"){
		if(val > 9999){
			num = (Math.floor(val/100)/100);
		}else{
			num = val;
		}
		let str = num.toString();
		let reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
		num =  str.replace(reg,"$1,");
		return num;
	}else{
		return 0
	}
}

export function numberFormatUnit(val){
	if(typeof val === "number"){
		if(val > 9999){
			return '万';
		}else{
			return '';
		}
	}else{
		return '';
	}
}

// 防抖
export function DebounceFun(callback, time) {
  var timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      callback();
    }, time);
  };
}
