export default class Util {
  static getClientHeight() {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
      const newClientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      clientHeight = newClientHeight;
    }
    else {
      const newClientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      clientHeight = newClientHeight;
    }
    return clientHeight;
  }

  static getDomPosition(obj) {
    // let obj = document.getElementById(id);
    let x = 0;
    let y = 0;
    if (obj.getBoundingClientRect) {
      const box = obj.getBoundingClientRect();
      const D = document.documentElement;
      x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft;
      y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop
    }
    return {
      x,
      y,
    }
  }

  // 产生随机数
  static RndNum(n) {
    let rnd = "";
    for (let i = 0; i < n; i += 1)
      rnd += Math.floor(Math.random() * 10);
    return rnd;
  }

  /*
   ** randomWord 产生任意长度随机字母数字组合
   ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
   ** 用法  randomWord(false,6);规定位数 flash
   *      randomWord(true,3，6);长度不定，true
   * arr变量可以把其他字符加入，如以后需要小写字母，直接加入即可
   */
  static randomWord(randomFlag, min, max) {
    let str = "";
    let range = min;
    const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 随机产生
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min;
    }
    for (let i = 0; i < range; i += 1) {
      const pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  }

  /**
   * 判断是否为空对象
   * @param obj
   * @returns {boolean}
   */
  static isEmptyObj(obj) {
    const arr = Object.keys(obj);
    if (arr.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 生成随机数+时间戳
   */
  static randHash() {
    return this.randomWord(true, 5, 10) + (new Date().getTime());
  }
}
