/*
 * @Author: lin.zehong
 * @Date: 2018-12-29 13:40:17
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-05-05 16:43:32
 * @Desc: 账号管理
 */

import * as userService from '../services/userService';

const { addRoles, editRoles, delRoles, checkRoleName, addRolePriv, delRolePriv,
  checkUserCode, qryRolesPage, qryUserRolePage, addUser, editUser, delUser,
} = userService;

export default {
  namespace: 'userModel',
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




    *checkUserCode({ payload }, { call }) {
      const data = yield call(checkUserCode, payload);
      return data;
    },
    *qryRolesTransfer({ payload }, { call }) {
      let roles = yield call(qryRolesPage, payload);
      const { errCode, total, data = [] } = roles;
      if (data.length < total) { // 不分页，查询所有结果
        const params = { pageNum: "1", pageSize: total };
        roles = yield call(qryRolesPage, params);
      }
      const rolesData = roles.data;
      let dataSource = [];
      if (errCode === "0") {
        dataSource = rolesData.map(item => {
          return { title: item.rolesName, ...item }
        })
      }

      const userRole = yield call(qryUserRolePage, payload);
      const targetkeys = userRole.data.map(item => item.rolesId);

      return {dataSource, targetkeys};
    },
    *addUser({ payload }, { call }) {
      const data = yield call(addUser, payload);
      return data;
    },
    *editUser({ payload }, { call }) {
      const data = yield call(editUser, payload);
      return data;
    },
    *delUser({ payload }, { call }) {
      const data = yield call(delUser, payload);
      return data;
    },
  },
};
