/*
 * @Author: lin.zehong
 * @Date: 2018-12-29 13:40:17
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-01-02 14:11:12
 * @Desc: 菜单管理
 */

import * as privilegeService from '../services/privilegeService';

const { AddMenuSys, DelMenuSys, EditMenuSys, qryMenuDetail, qryParMenuInfo, checkMenuName, checkMenuUrl,
  qryPrivilegesByParent, addPrivileges, editPrivileges, delPrivileges,
} = privilegeService;

export default {
  namespace: 'privilegeModel',
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



    *qryPrivilegesByParent({ payload }, { call }) {
      const data = yield call(qryPrivilegesByParent, payload);
      return data;
    },
    *addPrivileges({ payload }, { call }) {
      const data = yield call(addPrivileges, payload);
      return data;
    },
    *editPrivileges({ payload }, { call }) {
      const data = yield call(editPrivileges, payload);
      return data;
    },
    *delPrivileges({ payload }, { call }) {
      const data = yield call(delPrivileges, payload);
      return data;
    },
  },
};
