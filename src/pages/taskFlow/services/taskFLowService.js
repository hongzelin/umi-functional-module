/* eslint-disable import/prefer-default-export */

import { post, get } from "../../../utils/request";

export const staticData = () => post('/taskflow/staticData'); // 任务管理静态数据

export const stategysForTask = () => get('/stategysForTask'); // 策略
export const algoForTask = () => get('/algorithmVersionsForTask'); // 算子
export const algorithmDetails = () => get('/algorithmDetails'); // 详情
export const upDownStream = () => post('/upDownStream'); // 保存流程编排
export const getupDownStream = () => get('/viewAlgorithmTaskStream'); // 查询流程编排
export const allStdoKey = () => get('/stdoKey'); // 获取所有是输出，作为策略端点的scope作用域，匹配所有算子输入。
export const online = () => post('/editAlgorithmTask'); // 上线
