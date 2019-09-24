/*
 * @Author: lin.zehong
 * @Date: 2018-12-07 09:26:06
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-05-03 16:33:30
 * @Desc: 角色 services
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
* @param {number} rolesId - 角色id
* @param {number} privId - 权限id
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
