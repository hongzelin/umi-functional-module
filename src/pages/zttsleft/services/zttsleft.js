import { get } from "../../../utils/request";

/** 获取预警事件列表信息 */
const getImportEventPreInfo = data => get("/api/getImportEventPreInfo", data);

export default {
  getImportEventPreInfo,
};
