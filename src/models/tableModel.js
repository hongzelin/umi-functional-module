/*
 * @Author: lin.zehong
 * @Date: 2018-12-26 22:17:14
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-28 16:43:32
 * @Desc: Table 组件
 */

import apis from "../services/publicService";

const { tableApi } = apis;

export default {
  namespace: 'tableModel',
  state: {
  },
  reducers: {
    save(state, { payload: { data, total, current, pageSize } }) {
      return { ...state, list: data, total, current, pageSize };
    },
  },
  effects: {
    *fetch({ payload }, { call }) {
      const { api, pageSize, pageNum, query } = payload;
      let result = {}
      result = yield call(tableApi, { api, pageNum, pageSize, query });
      if(result.errCode === "0") {
        return result;
      } else {
        return {};
      }
    },
  },
};
