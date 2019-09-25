import { Message } from 'antd';
import { getResource, goback } from "../services/workbench";

const initData = {
  resourceData: {},
};
export default {
  namespace: "workbench",
  state: {
    ...initData,
  },
  effects: {
    *getResource({ payload }, { call, put }) {
      const { errCode, data = {} } = yield call(getResource, payload);
      if ((errCode === '0' || errCode === 0) && data) {
        yield put({
          type: 'dump',
          payload: {
            resourceData: data || {},
          },
        })
      }
    },
    *goback({ payload }, { call }) {
      const { errCode } = yield call(goback, payload);
      if (errCode === '0' || errCode === 0) {
        Message.success("撤回成功");
      } else {
        Message.error("撤回失敗");
      }
      return errCode;
    },
  },
  reducers: {
    dump: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    clearData: () => ({ ...initData }),
  },
};
