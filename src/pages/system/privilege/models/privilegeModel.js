/*
 * @Author: lin.zehong
 * @Date: 2018-12-29 13:40:17
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-01-02 14:11:12
 * @Desc: 菜单管理
 */

import * as privilegeService from '../services/privilegeService';

const { qryPrivilegesByParent, addPrivileges, editPrivileges, delPrivileges, delPrivMenu, addPrivMenu } = privilegeService;

export default {
  namespace: 'privilegeModel',
  state: {
    clickedRow: {}, // 权限选择的行，用来关联菜单
  },
  reducers: {
    changeRow(state, { payload: { clickedRow } }) {
      return { ...state, clickedRow };
    },
  },
  effects: {
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
    *delPrivMenu({ payload }, { call }) {
      const data = yield call(delPrivMenu, payload);
      return data;
    },
    *addPrivMenu({ payload }, { call }) {
      const data = yield call(addPrivMenu, payload);
      return data;
    },
  },
};
