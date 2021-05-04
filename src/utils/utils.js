import { Toast } from 'antd-mobile';
import moment from 'moment';

moment.locale('zh-cn');

export function resErrorCheck(data, fallback, isShowToast = false) {
  if (data === undefined || data === null) {
    if (isShowToast) {
      Toast.info('请稍后再试', 4);
    }
    return fallback;
  }
  return data;
}

// 数组扁平化
export const normalizeData = (data, schema) => {
  const kvObj = {};
  const ids = [];
  if (Array.isArray(data)) {
    data.forEach(item => {
      kvObj[item[schema]] = item;
      ids.push(item[schema]);
    });
  } else {
    kvObj[data[schema]] = data;
    ids.push(data[schema]);
  }
  return {
    list: kvObj,
    ids,
  };
};

// 数组扁平化成ids:[]和list：{}
export const normalizeDataToIds = (data, schema) => {
  const kvObj = {};
  const ids = [];
  if (Array.isArray(data)) {
    data.forEach(item => {
      kvObj[item[schema]] = item;
      ids.push(item[schema]);
    });
  } else {
    kvObj[data[schema]] = data;
    ids.push(data[schema]);
  }
  return {
    list: kvObj,
    ids,
  };
};

export const dishNameMap = {
  1: '主胜',
  11: '主主',
  '1X': '主和',
  12: '主客',
  2: '客胜',
  21: '客主',
  '2X': '客和',
  X2: '和客',
  X1: '和主',
  22: '客客',
  X: '和',
  XX: '和和',
  Over: '大',
  Under: '小',
  Exactly: '等',
  Home: '主',
  Away: '客',
  Even: '双',
  Odd: '单',
  '1-0': '1-0',
  '0-0': '0-0',
  '0-1': '0-1',
  '0-2': '0-2',
  '0-3': '0-3',
  '0-4': '0-4',
  '0-5': '0-5',
  '0-6': '0-6',
  '0-7': '0-7',
  '0-8': '0-8',
  '0-9': '0-9',
  '1-1': '1-1',
  '1-2': '1-2',
  '1-3': '1-3',
  '1-4': '1-4',
  '1-5': '1-5',
  '1-6': '1-6',
  '1-7': '1-7',
  '1-8': '1-8',
  '1-9': '1-9',
  '1-10': '1-10',
  '1-11': '1-11',
  '1-12': '1-12',
  '2-0': '2-0',
  '2-1': '2-1',
  '2-2': '2-2',
  '2-3': '2-3',
  '2-4': '2-4',
  '2-5': '2-5',
  '2-6': '2-6',
  '2-7': '2-7',
  '2-8': '2-8',
  '2-9': '2-9',
  '3-0': '3-0',
  '3-1': '3-1',
  '3-3': '3-3',
  '3-2': '3-2',
  '3-4': '3-4',
  '3-5': '3-5',
  '3-6': '3-6',
  '3-7': '3-7',
  '3-8': '3-8',
  '4-0': '4-0',
  '4-1': '4-1',
  '4-2': '4-2',
  '4-3': '4-3',
  '4-4': '4-4',
  '4-5': '4-5',
  '4-6': '4-6',
  '4-7': '4-7',
  '5-0': '5-0',
  '5-1': '5-1',
  '5-2': '5-2',
  '5-3': '5-3',
  '5-4': '5-4',
  '5-5': '5-5',
  '5-6': '5-6',
  '5-7': '5-7',
  '6-0': '6-0',
  '6-1': '6-1',
  '6-2': '6-2',
  '6-3': '6-3',
  '6-4': '6-4',
  '6-5': '6-5',
  '6-6': '6-6',
  '7-0': '7-0',
  '7-1': '7-1',
  '7-2': '7-2',
  '7-3': '7-3',
  '7-4': '7-4',
  '7-5': '7-5',
  '8-0': '8-0',
  '8-1': '8-1',
  '8-2': '8-2',
  '8-3': '8-3',
  '8-4': '8-4',
  '9-0': '9-0',
  '9-1': '9-1',
  '9-2': '9-2',
  '9-3': '9-3',
  '10-0': '10-0',
  '10-1': '10-1',
  '11-0': '11-0',
  '11-1': '11-1',
  '12-0': '12-0',
  '12-1': '12-1',
  '13-0': '13-0',
  '13-1': '13-1',
  '14-0': '14-0',
  '15-0': '15-0',
  '16-0': '16-0',
  '17-0': '17-0',
  '18-0': '18-0',
  '19-0': '19-0',

};
export const calcDate = (date) => {
  const cacheDate = moment(date, 'YYYYMMDD');
  return cacheDate.format('YYYY年MM月DD日 周dd');
};

export const calcDate2 = (date) => {
  const time = moment(date).local().format('YYYY年MM月DD日  星期dd');
  const day = moment(date).local().format('HH:mm');
  return `${time} ${day}`;
};

export const calcDate3 = (date) => {
  return moment(date).local().format('MM/DD HH:mm');
};

export const calcDate4 = (date) => {
  return date.split(':')[0] * 60 + date.split(':')[0] - 45 * 60 > 0 ? `下半场 ${date}'` : `上半场 ${date}'`;
};

/* 对数组排列组合 */
export const groupSplit = (arr, size) => {
  const r = []; // result

  function _(t, a, n) { // tempArr, arr, num
    if (n === 0) {
      r[r.length] = t;
      return;
    }
    for (let i = 0, l = a.length - n; i <= l; i++) {
      const b = t.slice();
      b.push(a[i]);
      _(b, a.slice(i + 1), n - 1);
    }
  }

  _([], arr, size);
  return r;
};

export function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max.apply(null, durations.map((d, i) => {
    return toMs(d) + toMs(delays[i]);
  }));
}

export function toMs(s) {
  return Number(s.slice(0, -1)) * 1000;
}

export const betTypeMap = {
  1: '',
  2: '二串一',
  3: '三串一',
  4: '四串一',
  5: '五串一',
  6: '六串一',
  7: '七串一',
  8: '八串一',
};

export const betStatusMap = {
  0: '未结算',
  1: '已结算',
};

export const betResultMap = {
  0: '未结算',
  1: '赢',
  2: '输',
  3: '退款',
  11: '赢一半',
  12: '输一半',
};

export const debounce = (fn, delay = 500) => {
  // 期间间隔执行 节流
  window.timeId = null;
  return (...rest) => { // 箭头函数是没有arguments的 所以用...rest 来代替
    const args = rest;
    if (window.timerId) clearTimeout(window.timerId);
    // 要用this.timerId 而不能直接定义var timerId=null;
    window.timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

export const throttle = (fn, delay = 500) => { //
  // 期间间隔执行 节流
  let canRun = true;
  return (...rest) => {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, rest);
      canRun = true;
    }, delay);
  };
};
