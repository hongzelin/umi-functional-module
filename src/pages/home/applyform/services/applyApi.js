import { post } from "utils/request";

/**
 * 首頁，事項目錄申請
 * @param businessIds 事项 id 数组
 * @param dataDirectoryIds 数据目录 id 数组
 * @param userId 用户 id
 */
export const getInfo = ({ businessIds, dataDirectoryIds, userId }) =>
  post("/apply/businessDataApplyPage", { businessIds, dataDirectoryIds, userId });

/**
 * 個人工作台，申请单详情
 * @param applyCode 申請單標號
 * @param userId 用户 id
 */
export const applyFormDetail = ({ applyCode, userId }) =>
  post("/workplatform/applyFormDetail", { applyCode, userId });

/**
 * 個人工作台，審批單详情
 * @param approvalCode 審批單標號
 * @param userId 用户 id
 */
export const approvalFormDetail = ({ approvalCode, userId }) =>
  post("/workplatform/approvalFormDetail", { approvalCode, userId });

/**
 * 個人工作台，目錄頭部 radio 數量
 */
export const countByState = () =>
  post("/workplatform/countByState", {});

/**
 * 新增申请理由
 * @param applyCode 申請單編號
 * @param applyReason 申请理由
 * @param businessIds 事项 id 数组 [1, 2] 非必傳
 * @param dataDirectoryIds 数据目录 id 数组 [1, 2] 非必傳
 * @param paramIdsRelationList 数组对象
 *        @param businessIds     // 事项 id 数组 [1, 2]
 *        @param dataDirectoryId // 数据目录 id
 *        @param paramCodeAlias  // 欄位 CODE 別名
 * @param userId 用户 id
 */
export const addApplyForm = ({ applyCode, userId, applyReason, businessIds, dataDirectoryIds, paramIdsRelationList }) =>
  post("/apply/addApplyForm", { applyCode, userId, applyReason, businessIds, dataDirectoryIds, paramIdsRelationList });
