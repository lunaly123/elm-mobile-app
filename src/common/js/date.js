export function formatDate(date, fmt) {
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1,(date.getFullYear()+''.substr(4 - RegExp.$1.length)))
  }
  let d = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in d) {
    if(new RegExp(`(${k})`).test(fmt)) {
      let str = d[k] + '';
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1)?str:addZero(str));
    };
  }
  return fmt;
}

function addZero(str) {
  return('00' + str).substr(str.length)
}