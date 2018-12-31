/*
 * @Author: lin.zehong
 * @Date: 2018-12-29 13:40:17
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-31 21:34:27
 * @Desc: 菜单管理
 */

import * as menuService from '../services/menuService';

const { AddMenuSys, DelMenuSys, EditMenuSys, qryMenuDetail, qryParMenuInfo, checkMenuName, checkMenuUrl } = menuService;

export default {
  namespace: 'menuModel',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *AddMenu({ payload }, { call }) {
      const data = yield call(AddMenuSys, payload);
      return data;
    },
    *DelMenu({ payload }, { call }) {
      const data = yield call(DelMenuSys, payload);
      return data;
    },
    *EditMenu({ payload }, { call }) {
      const data = yield call(EditMenuSys, payload);
      return data;
    },
    *DetailMenu({ payload }, { call }) {
      const data = yield call(qryMenuDetail, payload);
      return data;
    },
    *qryParMenuInfo({ payload }, { call }) {
      const data = yield call(qryParMenuInfo, payload);
      return data;
    },
    *checkMenuName({ payload }, { call }) {
      const data = yield call(checkMenuName, payload);
      return data;
    },
    *checkMenuUrl({ payload }, { call }) {
      const data = yield call(checkMenuUrl, payload);
      return data;
    },
  },
};
