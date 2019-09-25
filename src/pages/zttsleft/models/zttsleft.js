/* eslint-disable */
import apis from "../services/zttsleft";

const { getImportEventPreInfo } = apis;

const warnEventData = [ // 预警事件
  {
    id: 1,
    title: '车辆在逃',
    type: '1', // 1 车辆在逃，2 人员在逃
    level: '1',
    name: '小星星',
    number: '370879199309072879',
    time: '08-13 14:54:12',
    carplate: '藏A HE1234',
    cartype: '奥迪Q5',
    pic: "assets/icons/car.png",
  },
  {
    id: 2,
    title: '人员在逃',
    type: '2', // 1 车辆在逃，2 人员在逃
    level: '2',
    name: '大星星',
    number: '370879199309072879',
    time: '08-13 14:54:12',
    birth: '2019-02-21',
    nation: '汉',
    pic: "assets/icons/car.png",
  },
];

const alarmEventData = [ // 报警事件
  {
    id: 1,
    date: "2019-06-01 10:23:45",
    level: "1",
    type: "type",
    event: "现场身穿统一服装示威者游行，声援华为，抵制美货",
  },
  {
    id: 2,
    date: "2019-06-01 10:23:45",
    level: "2",
    type: "type",
    event: "现场身穿统一服装示威者游行，声援华为，抵制美货22",
  },
  {
    id: 3,
    date: "2019-06-01 10:23:45",
    level: "1",
    type: "type",
    event: "现场身穿统一服装示威者游行，声援华为，抵制美货33",
  },
]

const todayEventData = {
  total: 222,
  data: [
    { name: "预警", value: 2000 },
    { name: "报警", value: 867 },
    { name: "案件", value: 1345 },
  ],
}

const personnelData = {
  total: 43,
  data: [
    { name: "在逃", value: 15 },
    { name: "国宝", value: 87 },
    { name: "涉稳", value: 200 },
    { name: "涉恐", value: 20 },
    { name: "精神病", value: 200 },
  ],
}

const warnCarData = {
  total: 22,
  data: [
    { name: "其他", value: 15 },
    { name: "套牌", value: 87 },
    { name: "在逃", value: 200 },
  ],
}

const alarmTypeData = {
  effective: 22,
  invalid: 22,
  data: [
    { name: "其他", value: 15 },
    { name: "套牌", value: 87 },
    { name: "在逃", value: 200 },
  ],
}

const handleData = () => {
  const data = [];
  for (let i = 0; i < 20; i += 1) {
    data.push({
      id: i,
      key: i,
      time: `2019-06-01 10:23:45`,
      level: "一级",
      type: "遗失物件",
      event: `现场身穿统一服装示威者游行，声援华为，抵制美货. ${i}`,
    });
  }
  return data;
}

const init = {
  dataList: [],
  warnEvent: warnEventData, // 预警事件
  alarmList: handleData(), // 报警事件
  // alarmList: alarmEventData, // 报警事件
  todayEvent: todayEventData, // 今日事件
  personnel: personnelData, // 重点人员预警
  warnCar: warnCarData, // 重点车辆预警
  alarmType: alarmTypeData, // 报警类型
};
export default {
  namespace: "zttsleft",
  state: {
    ...init,
  },
  effects: {
    *getImportEventPreInfo({ payload }, { call, put }) {
      const res = yield call(getImportEventPreInfo, payload);
      const { data = [] } = res || {};
      yield put({ type: "updateModels", payload: { dataList: data || [] } });
    },
  },
  reducers: {
    updateModels: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
    initModels: () => ({ ...init }),
  },
};
