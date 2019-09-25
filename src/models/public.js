import apis from "../services/publicService";

const {
  xzqhQuery,
  getSxjlx,
  getUserInfo,
} = apis;

export default {
  namespace: "publicModel",
  state: {
    xzqhData: [], // 行政区划
    SxjLxData: [], // 摄像机类型
    _isCollapsed: false, // 首页菜单是否收缩
    userId: "", // 用户唯一id
    userName: "", // 用户名
    roleCharacter: "", // sysAdmin-系統管理員-目錄管理員  deptAdminUser-部門管理用戶-XX局admin 	deptNormalUser-部門普通用戶-申請人
    menuData: [],
  },
  effects: {
    *getUserInfo({ payload }, { call, put }) {
      const { errCode, data = {} } = yield call(getUserInfo, { payload });
      if (errCode === 0 && data) {
        const { userInfo, permissions } = data;
        yield put({
          type: 'dump',
          payload: {
            ...userInfo,
            menuData: permissions,
          },
        })
      }
    },
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
    dump: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
};
