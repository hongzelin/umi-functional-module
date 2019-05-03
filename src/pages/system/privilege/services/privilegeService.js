/*
 * @Author: lin.zehong
 * @Date: 2018-12-07 09:26:06
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-31 11:16:03
 * @Desc: 权限 services
 */

import { post } from "../../../../utils/request";

/**
* 查询子权限
* @param {number} parentPrivId - 权限id
*/
export const qryPrivilegesByParent = ({ parentPrivId }) =>
  post('/system/privilegesController/qryPrivilegesByParent', { parentPrivId });

/**
 * 删除权限
 * @param {number} privId - 权限id
*/
export const delPrivileges = (data) =>
  post('/system/privilegesController/delPrivileges', data);

/**
 * 修改权限
 * @param {number} privId - 权限id
 * @param {string} privName - 权限名称
 * @param {string} privLevel - 权限层级
 * @param {string} parentPrivId - 上级权限id
*/
export const editPrivileges = ({ privId, privName, privLevel, parentPrivId }) =>
  post('/system/privilegesController/editPrivileges', { privId, privName, privLevel, parentPrivId });

/**
 * 新增权限
 * @param {string} privLevel - 权限层级
 * @param {string} privName - 权限名称
 * @param {string} parentPrivId -  上级权限id
*/
export const addPrivileges = ({ privLevel, privName, parentPrivId }) =>
  post('/system/privilegesController/addPrivileges', { privLevel, privName, parentPrivId });

/**
* 权限详情
* @param {number} privId - 权限Id
*/
export const qryPrivilegesDetail = ({ menuId }) =>
  post('/system/privilegesController/qryPrivilegesDetail', { menuId });

/**
* 删除权限菜单关联
* @param {number} privId - 权限Id
* @param {number} menuId - 菜单Id
*/
export const delPrivMenu = ({ privId, menuId }) =>
  post('/system/privMenuController/delPrivMenu', { privId, menuId });

/**
* 新增权限菜单关联
* @param {array} list - ListMap，对象属性如下
*     @param {number} privId - 权限id
*     @param {number} menuId - 菜单id
*     @param {string} privObjectId - 菜单id
*/
export const addPrivMenu = ({ list }) =>
  post('/system/privMenuController/addPrivMenu', { list });
