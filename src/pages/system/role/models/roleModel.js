/*
 * @Author: lin.zehong
 * @Date: 2018-12-29 13:40:17
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-05-03 16:32:45
 * @Desc: 角色管理
 */

import * as roleService from '../services/roleService';

const { addRoles, editRoles, delRoles, checkRoleName, addRolePriv, delRolePriv } = roleService;

export default {
  namespace: 'roleModel',
  state: {
    clickedRow: {}, // 权限选择的行，用来关联权限
  },
  reducers: {
    changeRow(state, { payload: { clickedRow } }) {
      return { ...state, clickedRow };
    },
  },
  effects: {

    *addRoles({ payload }, { call }) {
      const data = yield call(addRoles, payload);
      return data;
    },
    *editRoles({ payload }, { call }) {
      const data = yield call(editRoles, payload);
      return data;
    },
    *delRoles({ payload }, { call }) {
      const data = yield call(delRoles, payload);
      return data;
    },
    *checkRoleName({ payload }, { call }) {
      const data = yield call(checkRoleName, payload);
      return data;
    },
    *addRolePriv({ payload }, { call }) {
      const data = yield call(addRolePriv, payload);
      return data;
    },
    *delRolePriv({ payload }, { call }) {
      const data = yield call(delRolePriv, payload);
      return data;
    },
  },
};
