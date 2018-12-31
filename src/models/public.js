import apis from "../services/publicService";

const {
  xzqhQuery,
  getSxjlx,
} = apis;

export default {
  namespace: "publicModel",
  state: {
    xzqhData: [], // 行政区划
    SxjLxData: [], // 摄像机类型
    _isCollapsed: false, // 首页菜单是否收缩
  },
  effects: {
    *handleXzqhQuery({ payload }, { call, put }) {
      const XZdata = yield call(xzqhQuery, payload);
      const xzD = XZdata.data;
      yield put({ type: "handlezqhQ", payload: xzD });
    },
    *handleGetSxjlx({ payload }, { call, put }) {
      const sxjLxData = yield call(getSxjlx, payload);
      const typeData = sxjLxData.data;
      yield put({ type: "handleSxjLx", payload: typeData });
    },
  },
  reducers: {
    handlezqhQ: (state, { payload }) => ({
      ...state,
      xzqhData: payload,
    }),
    handleSxjLx: (state, { payload }) => ({
      ...state,
      SxjLxData: payload,
    }),
    handleHomeLeft: (state, { payload }) => ({
      ...state,
      _isCollapsed: payload,
    }),
  },
};
