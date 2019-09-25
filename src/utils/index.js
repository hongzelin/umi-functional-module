// 工具类已经转移到@cbd/utils下，如果需要添加工具部分，请先考虑是否需要添加到@cbd/utils下
const formatDateTime = () => {
  const date = new Date();
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? `0${m}` : m;
  let d = date.getDate();
  d = d < 10 ? `0${d}` : d;
  let h = date.getHours();
  h = h < 10 ? `0${h}` : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;
  return `${y}${m}${d}${h}${minute}${second}${Math.floor(
    Math.random() * 10000
  )}`;
};

/**
 * 根据传入的数组对象，进行格式化为如：[{id: xx, name: xx}]
 * type: business 事项, catalog 目录
 */
const formatDataArr = (data = [], type) => {
  if (!data || data.length <= 0) {
    return [];
  }
  const _data = data.map((item = {}) => {
    if (type === "business") {
      return {
        id: item.businessId,
        name: item.businessName,
      };
    } else if (type === "catalog") {
      return {
        id: item.dataDirectoryId,
        name: item.dataDirectoryName,
      };
    }
    return {};
  });
  return _data;
};

/**
 * 根据传入的unix時間戳，进行日期格式化
 * @param {string} timestamp - Unix时间戳
 * @returns {string} 返回格式如 HH-MM-DD hh:mm:ss 的日期字符串
 */
const timestampToTime = timestamp => {
  const date = new Date(timestamp);
  const Y = `${date.getFullYear()}`;
  const M =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
};

export { formatDateTime, formatDataArr, timestampToTime };
