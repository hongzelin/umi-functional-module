/*
 * @Author: lin.zehong 
 * @Date: 2018-12-07 09:26:06 
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-20 17:01:24
 * @Desc: 在线摄像头 services 
 */

import { post } from "../../../utils/request";

/**
 * 查询地图摄像头
 * @param {object} data - 请求参数
 * @param {array} sxtxxIds - //可选，摄像头id数组 [1,2,3] 
 * @param {string} sbbm - 可选, 设备编码
 * @param {string} sbmc - 可选, 设备名称
 * @param {string} xzqh - 可选, 行政区划编码
 * @param {string} sxjlx - 可选, 摄像机类型
 * @param {string} azdz - 可选, 安装地址
 * @param {string} sbzt - 可选, 设备状态编码
*/
export const cameraQuery = ({ sxtxxIds, sbbm, sbmc, xzqh, sxjlx, azdz, sbzt }) =>
  post('/manage/sxt/gis/query', { sxtxxIds, sbbm, sbmc, xzqh, sxjlx, azdz, sbzt });

/**
 * 查询收藏夹树，包括摄像头
*/
export const collectTreeQuery = () =>
  post('/manage/select/favorites');

/**
 *  添加收藏夹
 * @param {object} data - 请求参数
 * @param {string} scjmc - 收藏夹名字 必填
 * @param {num} scjId - 当前所在文件夹的scjId, 必填
 * @param {string} scjjb - 可选, 收藏夹级别
 * @param {string} xzqh - 可选, 行政区划
 * @param {string} orgId - 可选, 归属组织 
 * @param {string} jybm - 可选, 归属警员
 * @param {string} zt - 可选, 状态
 * @param {string} scjlx - 可选, 收藏夹类型
*/
export const collectTreeCreate = ({ scjmc, scjId, scjjb, xzqh, orgId, jybm, zt, scjlx }) =>
  post('/manage/create/favorites', { scjmc, scjId, scjjb, xzqh, orgId, jybm, zt, scjlx });

/**
 * 修改收藏夹（重命名）
 * @param {object} data - 请求参数
 * @param {string} scjmc - 收藏夹名字 必填
 * @param {num} scjId - 当前所在文件夹的scjId, 必填
 * @param {string} scjjb - 可选, 收藏夹级别
 * @param {string} xzqh - 可选, 行政区划
 * @param {string} orgId - 可选, 归属组织 
 * @param {string} jybm - 可选, 归属警员
 * @param {string} zt - 可选, 状态
 * @param {string} scjlx - 可选, 收藏夹类型
*/
export const collectTreeUpdate = ({ scjmc, scjId, scjjb, xzqh, orgId, jybm, zt, scjlx }) =>
  post('/manage/update/favorites', { scjmc, scjId, scjjb, xzqh, orgId, jybm, zt, scjlx });

/**
 * 删除当前收藏夹及当前收藏夹下的摄像头和文件全部删除
 * @param {object} data - 请求参数
 * @param {num} scjId - 当前所在文件夹的scjId, 必填
*/
export const collectTreeDelete = ({ scjId }) =>
  post('/manage/delete/favorites', { scjId });

/**
 * 查询收藏夹下所有摄像头
 * @param {object} data - 请求参数
 * @param {num} scjId - 当前所在文件夹的scjId, 必填
*/
export const collectTreeSelectCamera = ({ scjId }) =>
  post('/manage/select/cameraList', { scjId });

/**
 * 取消收藏摄像头
 * @param {object} data - 请求参数
 * @param {num} id - 摄像头表的主键id    ,注释：并不是摄像头sxtId    必填
*/
export const cancelCamera = ({ id }) =>
  post('/manage/delete/camera', { id });

/**
 * 查询收藏夹下所有收藏夹及收藏夹信息
 * @param {object} data - 请求参数
*/
export const favoritesList = () =>
  post('/manage/select/favoritesList', {});

/**
 * 收藏夹中添加摄像头
 * @param {object} data - 请求参数
 * @param {string} sxtName - 摄像头名字 必填
 * @param {num} scjId - 摄像头所在文件夹的sdjId, 必填
 * @param {string} sxtId - 摄像头sxtId(编码)  必填
 * @param {string} sx - 顺序 非必填(可有可无)
 * @param {string} zt - 状态 非必填(可有可无)
 * @param {string} sxtxxId - 摄像头播放的id  必填
 * @param {string} jd - 摄像头jd  必填
 * @param {string} wd - 摄像头wd  必填
*/
export const insertCamera = ({ sxtName, scjId, sxtId, sx, zt, sxtxxId, jd, wd }) =>
  post('/manage/insert/camera', { sxtName, scjId, sxtId, sx, zt, sxtxxId, jd, wd });

/**
 * 获取摄像头播放地址
 * @param {object} data - 请求参数
 * @param {string} sxtxxId - 摄像头sxtId  必填
*/
export const getPlayerUrl = ({ sxtxxId }) =>
  post('/manage/sxt/playing', { sxtxxId });
