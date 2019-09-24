/*
 * @Author: lin.zehong
 * @Date: 2018-12-26 22:17:14
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-05-05 14:19:52
 * @Desc: 静态数据下拉组件
 */

import apis from "../services/publicService";

const { selectApi } = apis;

export default {
  namespace: 'staticSelectModel',
  state: {
  },
  reducers: {
  },
  effects: {
    *fetch({ payload }, { call }) {
      const { paramKey, query } = payload;
      let result = {}
      result = yield call(selectApi, { paramKey, query });
      if (result.errCode === "0") {
        return result;
      } else {
        return {};
      }
    },
  },
};
