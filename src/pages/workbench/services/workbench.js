import { get, post } from "utils/request";

/**
 * 资源盘点
 */
export const getResource = () => get("/resource");

/**
 * 申请单，撤回
 * @param applyCode 申请单编号
 */
export const goback = ({ applyCode }) => post("/workplatform/cancelApplyForm", { applyCode });
