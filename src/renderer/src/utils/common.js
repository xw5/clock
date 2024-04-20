// 生成uid
export const guid = () =>  {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

const weeksCn = ['星期日', '星期一','星期二','星期三','星期四','星期五','星期六'];
/**
 * @description 时间戳转日期
 * @param { Number, String } timestamp 时间戳
 * @param { String } fmt 转换后的日期格式，如："YYYYMMDD"、"YYYY/MM/DD"、"YYYY-MM-DD hh:mm:ss"、"YYYY年MM月DD日"、"YYY-MM-DD"等等
 * @return { String } 转换后的日期
 */
export function timestampToTime(fmt='YYYY年MM月DD日 hh:mm:ss WW ap', timestamp) {
  const re = /(Y+)/;
  const date = timestamp ? new Date(timestamp) : new Date();
  if (re.test(fmt)) {
    const t = re.exec(fmt)[1];
    fmt = fmt.replace(
      t,
      (date.getFullYear() + "").substring(4 - t.length)
    );
  }

  const o = {
    "M+": date.getMonth() + 1, // 月份
    "D+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  for (let k in o) {
    const regx = new RegExp("(" + k + ")");
    if (regx.test(fmt)) {
      const t = regx.exec(fmt)[1];
      fmt = fmt.replace(
        t,
        t.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }

  const reweek = /(W+)/;
  if (reweek.test(fmt)) {
    const t = reweek.exec(fmt)[1];
    fmt = fmt.replace(
      t,
      weeksCn[date.getDay()]
    );
  }

  const reap = /(ap)/;
  if (reap.test(fmt)) {
    const t = reap.exec(fmt)[1];
    fmt = fmt.replace(
      t,
      date.getHours() >= 12 ? 'PM' : 'AM'
    );
  }
  return fmt;
};

/**
 * 秒转倒计时时间
 * @param {number} senconds 
 * @returns 
 */
export function secondsToTime(senconds) {
  const h = parseInt(senconds / 3600);
  const m = parseInt(senconds % 3600 / 60);
  const s = parseInt(senconds % 3600 % 60);
  return `${("00" + h).substr(("" + h).length)}:${("00" + m).substr(("" + m).length)}:${("00" + s).substr(("" + s).length)}`;
}

/**
* @desc 函数防抖
* @param func 目标函数
* @param wait 延迟执行毫秒数
* @param immediate true - 立即执行， false - 延迟执行
*/
function debounce(func, wait = 300, immediate = true) {
  let timer;
  return function() {
    let context = this,
    args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate && !timer) {
      func.apply(context, args);
    }
    timer = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

/**
 * 动态绘制防抖
 * @param {Object} chart 
 */
export const debounceResize = (chart) => {
  const resizeBack = function () {
    chart && chart.resize();
  }
  window.addEventListener("resize", debounce(resizeBack), false);
}

/**
 * rgba字符串转{r,g,b,a}
 * @param {String} str 
 * @returns 
 */
export const regbToObj = (str) => {
  let obj = {};
  let arr = [];
  if (str) {
    if (Object.prototype.toString.call(str) === "[object Array]") { //判断数据类型
      for (let key in str) {
        let strArr = [];
        let strObj = {};
        strArr = str[key]
          .split("(")[1]
          .split(")")[0]
          .split(","); // 将rgba分割成数组
        strObj.r = Number(strArr[0].trim());
        strObj.g = Number(strArr[1].trim());
        strObj.b = Number(strArr[2].trim());
        strObj.a = Number(strArr[3].trim());
        arr.push(strObj);
      }
      return arr;
    } else {
      arr = str
        .split("(")[1]
        .split(")")[0]
        .split(",");
      if (arr.length == 4) {
        obj.r = Number(arr[0].trim());
        obj.g = Number(arr[1].trim());
        obj.b = Number(arr[2].trim());
        obj.a = Number(arr[3].trim());
      } else {
        return str; // 传参有误处理
      }
    }
    return obj;
  } else {
    return str; // 传null处理
  }
};