/*
 * @Author: lin.zehong
 * @Date: 2018-12-07 09:26:06
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-31 11:16:03
 * @Desc: 在线摄像头 services
 */

import { post } from "../../../../utils/request";

/**
 * 平台菜单删除
 * @param {object} data - 请求参数
*/
export const DelMenuSys = (data) =>
  post('/system/menuController/delMenu', data);

/**
 * 平台菜单修改
 * @param {object} data - 请求参数
*/
export const EditMenuSys = (data) =>
  post('/system/menuController/editMenu', data);

/**
 * 平台菜单新增
 * @param {string} menuIcon - 菜单图标
 * @param {string} menuLevel - 菜单层级
 * @param {string} menuName - 菜单名称
 * @param {string} menuUrl -  菜单url
 * @param {number} orderId - 菜单排序
 * @param {string} parentMenuId - 父级菜单ID
*/
export const AddMenuSys = ({ menuIcon, menuLevel, menuName, menuUrl, orderId, parentMenuId }) =>
  post('/system/menuController/addMenu', { menuIcon, menuLevel, menuName, menuUrl, orderId, parentMenuId });

/**
* 平台菜单详情
* @param {number} menuId - 菜单Id
*/
export const qryMenuDetail = ({ menuId }) =>
  post('/system/menuController/qryMenuDetail', { menuId });

/**
* 根据父级ID，查询子集菜单，异步树用到
* @param {number} parentMenuId - 父菜单Id
*/
export const qryParMenuInfo = ({ parentMenuId }) =>
  post('/system/menuController/qryParMenuInfo', { parentMenuId });

/**
* 菜单名称重复性校验
* @param {string} menuName - 菜单名称
* @param {string} state - 菜单状态
*/
export const checkMenuName = ({ menuName, state }) =>
  post('/system/menuController/checkMenuName', { menuName, state });

/**
* 菜单路径重复性校验
* @param {number} menuId - 菜单Id，修改菜单的时候调用此接口需要带上id，后端查询重复的范围不包含本身，新增则不用；MenuForm修改重复已经在前端处理了！！！
* @param {string} menuUrl - 菜单名称
* @param {string} state - 菜单状态
*/
export const checkMenuUrl = ({ menuId, menuUrl, state }) =>
  post('/system/menuController/checkMenuUrl', { menuId, menuUrl, state });

// 权限

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
