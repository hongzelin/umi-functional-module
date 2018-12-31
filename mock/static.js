/*
 * @Author: lin.zehong
 * @Date: 2018-12-25 13:38:10
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-25 13:43:16
 * @Desc: 静态数据
 */

export default {
  // 行政区划
  'POST /apis/manage/xzqh/query': (req, res) => {
    const data = {
      "data": [{
        "xzqh": "31010125",
        "xzqhId": 16,
        "xzqhmc": "新天地派出所"
      }, {
        "xzqh": "31010124",
        "xzqhId": 15,
        "xzqhmc": "五里桥派出所"
      }, {
        "xzqh": "31010123",
        "xzqhId": 14,
        "xzqhmc": "打浦桥派出所"
      }, {
        "xzqh": "31010122",
        "xzqhId": 13,
        "xzqhmc": "淮海中路派出所"
      }, {
        "xzqh": "31010121",
        "xzqhId": 12,
        "xzqhmc": "瑞金派出所"
      }, {
        "xzqh": "31010119",
        "xzqhId": 11,
        "xzqhmc": "半淞园派出所"
      }, {
        "xzqh": "31010118",
        "xzqhId": 10,
        "xzqhmc": "老西门派出所"
      }, {
        "xzqh": "31010117",
        "xzqhId": 9,
        "xzqhmc": "豫园派出所"
      }, {
        "xzqh": "31010116",
        "xzqhId": 8,
        "xzqhmc": "南浦派出所"
      }, {
        "xzqh": "31010113",
        "xzqhId": 7,
        "xzqhmc": "外滩治安派出所"
      }, {
        "xzqh": "31010112",
        "xzqhId": 6,
        "xzqhmc": "南京东路派出所"
      }, {
        "xzqh": "31010100",
        "xzqhId": 4,
        "xzqhmc": "黄浦区"
      }, {
        "xzqh": "31010111",
        "xzqhId": 0,
        "xzqhmc": "外滩派出所"
      }],
      "errCode": 0,
      "errMsg": "操作成功"
    }
    res.status(200).json(data);
  },

  // 摄像头类型
  'POST /apis/manage/sxt/sxjlx': (req, res) => {
    const data = {
      "data": [{
        "lxmc": "可控球机",
        "sxjlx": 1
      }, {
        "lxmc": "固定球机",
        "sxjlx": 2
      }, {
        "lxmc": "固定枪机",
        "sxjlx": 3
      }, {
        "lxmc": "云台枪机",
        "sxjlx": 4
      }, {
        "lxmc": "卡口枪机",
        "sxjlx": 5
      }, {
        "lxmc": "其他",
        "sxjlx": 99
      }, {
        "lxmc": "遥控枪机",
        "sxjlx": 6
      }, {
        "lxmc": "人脸摄像头",
        "sxjlx": 7
      }],
      "errCode": 0,
      "errMsg": "操作成功"
    }
    res.status(200).json(data);
  },

}
