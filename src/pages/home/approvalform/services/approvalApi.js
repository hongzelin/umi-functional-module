import { post } from "utils/request";

/**
 * 审批
 * @param approvalCode 审批编码
 * @param approvalResult 审批结果
 * @param approvalOpinion 审批意见
 */
export const updateApprovalForm = ({ approvalCode, approvalResult, approvalOpinion }) =>
  post("/workplatform/updateApprovalForm", { approvalCode, approvalResult, approvalOpinion });
