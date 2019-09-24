/*
 * @Author: lin.zehong
 * @Date: 2018-12-07 09:26:06
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-05-05 17:03:21
 * @Desc: 账号 services
 */

import { post } from "../../../../utils/request";

/**
* 新增角色
* @param {string} rolesName - 角色名称
* @param {string} comments - 角色描述
* @param {string} operateType - 类型
*/
export const addRoles = ({ rolesName, comments, operateType }) =>
  post('/system/rolesController/addRoles', { rolesName, comments, operateType });

/**
* 修改角色
* @param {number} rolesId - 角色id
* @param {string} rolesName - 角色名称
* @param {string} comments - 角色描述
* @param {string} operateType - 类型
*/
export const editRoles = ({ rolesId, rolesName, comments, operateType }) =>
  post('/system/rolesController/editRoles', { rolesId, rolesName, comments, operateType });

/**
* 删除角色
* @param {number} rolesId - 角色id
*/
export const delRoles = ({ rolesId }) =>
  post('/system/rolesController/delRoles', { rolesId });

/**
* 检查角色名称是否重复
* @param {number} rolesName - 角色名称
*/
export const checkRoleName = ({ rolesName }) =>
  post('/system/rolesController/checkSysRoleName', { rolesName });

/**
* 新增角色权限关联
* @param {array} list - ListMap，对象属性如下
*     @param {number} rolesId - 角色id
*     @param {number} privId - 权限id
*/
export const addRolePriv = ({ list }) =>
  post('/system/rolePrivController/addRolePriv', { list });

/**
* 删除角色权限关联
* @param {number} rolesId - 角色id
* @param {number} privId - 权限id
*/
export const delRolePriv = ({ rolesId, privId }) =>
  post('/system/rolePrivController/delRolePriv', { rolesId, privId });




  

/**
* 查询是否存在相同用户账号
* @param {string} userCode - 用户账号
* @param {string} useState - 用户状态
*/
export const checkUserCode = ({ userCode, useState }) =>
  post('/system/userController/checkUserCode', { userCode, useState });

/**
* 查询所有角色，在 Transfer 组件需要用到
* @param {string} pageSize - 每页多少条记录
* @param {string} pageNum - 当前页
*/
export const qryRolesPage = ({ pageSize, pageNum }) =>
  post('/system/rolesController/qryRolesPage', { pageSize, pageNum });

/**
* 查询用户角色关联列表
* @param {number} userId - 用户id
* @param {string} useState - 用户状态
* @param {string} queryType - 查询类型
* @param {string} pageNum - 当前页
* @param {string} pageSize - 每页多少条记录
*/
export const qryUserRolePage = ({ userId, useState, queryType, pageNum, pageSize }) =>
  post('/system/userController/qryUserRolePage', { userId, useState, queryType, pageNum, pageSize });

/**
* 新增用户
* @param {string} userName - 用户名称
* @param {string} userCode - 用户账号
* @param {string} password - 密码
* @param {string} nickName - 昵称
* @param {string} mobileNo - 电话
* @param {string} email - 邮箱
* @param {string} comments - 备注
* @param {string} userType - 用户类型
* @param {array} roleTargetKeys - 关联角色
*/
export const addUser = ({ userName, userCode, password, nickName, mobileNo, email, comments, userType, roleTargetKeys }) =>
  post('/system/userController/addUser', { userName, userCode, password, nickName, mobileNo, email, comments, userType, roleTargetKeys });

/**
* 修改用户
* @param {number} userId - 用户id
* @param {string} userName - 用户名称
* @param {string} userCode - 用户账号
* @param {string} password - 密码
* @param {string} nickName - 昵称
* @param {string} mobileNo - 电话
* @param {string} email - 邮箱
* @param {string} comments - 备注
* @param {array} roleTargetKeys - 关联角色
*/
export const editUser = ({ userId, userName, userCode, password, nickName, mobileNo, email, comments, roleTargetKeys }) =>
  post('/system/userController/editUser', { userId, userName, userCode, password, nickName, mobileNo, email, comments, roleTargetKeys });

/**
* 删除用户
* @param {number} userId - 用户id
*/
export const delUser = ({ userId }) =>
  post('/system/userController/delUser', { userId });

