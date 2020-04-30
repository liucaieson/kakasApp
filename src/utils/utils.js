import { Toast} from 'antd-mobile';
import moment from 'moment';
moment.locale('zh-cn');

export function resErrCheck(data,  fallback, isShowToast = false) {
  if( data === undefined || data === null){
    if(isShowToast){
      Toast.info('请稍后再试', 4);
    }
    return fallback
  }
  return data;
}
// 数组扁平化
export const normalizeData = (data, schema) => {
  let kvObj = {};
  let ids = [];
  if(Array.isArray(data)) {
    data.forEach(item => {
      kvObj[item[schema]] = item;
      ids.push(item[schema])
    })
  } else {
    kvObj[data[schema]] = data;
    ids.push(data[schema])
  }
  return {
    ['list']: kvObj,
    ids
  }
};

// 数组扁平化成ids:[]和list：{}
export const normalizeDataToIds = (data, schema) => {
  let kvObj = {};
  let ids = [];
  if(Array.isArray(data)) {
    data.forEach(item => {
      kvObj[item[schema]] = item;
      ids.push(item[schema])
    })
  } else {
    kvObj[data[schema]] = data;
    ids.push(data[schema])
  }
  return {
    ['list']: kvObj,
    ids
  }
};

export  const dishNameMap = {
  '1': '主胜',
  '11': '主主',
  '1X': '主和',
  '12': '主客',
  '2': '客胜',
  '21': '客主',
  '2X': '客和',
  'X2': '和客',
  'X1': '和主',
  '22':'客客',
  'X': '和',
  'XX': '和和',
  'Over': '大',
  'Under': '小',
  'Exactly': '等',
  'Home': '主',
  'Away': '客',
  'Even': '双',
  'Odd': '单',
};
export const calcDate  = (date) =>{
  const cacheDate = moment(date,"YYYYMMDD");
  return cacheDate.format("YYYY年MM月DD日 周dd")
};

export const calcDate2  = (date) =>{
  const cacheDate = moment(date.substring(0,8),"YYYYMMDD");
  const time = cacheDate.format("YYYY年MM月DD日  星期dd");
  const day = date.substring(8,10) + ':' + date.substring(10,12);
  return time + ' ' +  day
};

export const calcDate3 = (date) =>{
  const cacheDate = moment(date.substring(0,8),"YYYYMMDD");
  const time = cacheDate.format("DD / MM");
  const day = date.substring(8,10) + ':' + date.substring(10,12);
  return time + ' ' +  day
};

export const calcDate4 = (date) =>{
  return date.split(':')[0] * 60 + date.split(':')[0]  - 45 * 60 > 0 ? '下半场 ' + date + '\'' : '上半场 ' + date + '\''
};

/* 对数组排列组合 */
export const  groupSplit =  (arr, size) => {
  var r = []; //result

  function _(t, a, n) { //tempArr, arr, num
    if (n === 0) {
      r[r.length] = t;
      return;
    }
    for (var i = 0, l = a.length - n; i <= l; i++) {
      var b = t.slice();
      b.push(a[i]);
      _(b, a.slice(i + 1), n - 1);
    }
  }
  _([], arr, size);
  return r;
}

export function getTimeout(delays, durations) {                                      //从Vue源码里拷贝出来的代码的，获取动画完成的总时间，返回ms格式
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

export function toMs(s) {
  return Number(s.slice(0, -1)) * 1000
}


