import * as services from '../services/taskFLowService'

const initialState = {
  staticData: {}, // 静态数据
}

export default {
  namespace: 'taskFlowStaticModel',
  state: initialState,
  reducers: {
    dump(state, action) {
      const { payload = {} } = action
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    * staticData({ payload }, { call, put }) {
      const { errCode, data } = yield call(services.staticData, payload);
      if (errCode === '0') {
        yield put({
          type: 'dump',
          payload: { staticData: data },
        });
      }
    },
  },
  subscriptions: {},
}
