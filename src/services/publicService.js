import { post } from "../utils/request";

const xzqhQuery = data => post("/manage/xzqh/query", data); // 行政区划
const getSxjlx = data => post("/manage/sxt/sxjlx", data); // 摄像机类型

/**
 * 表格数据
 * @param {object} data - 请求参数
 * @param {string} api - 请求接口
 * @param {number} pageSize - 每页多少条
 * @param {number} pageNum - 当前第几页
 * @param {object} query - 查询条件
*/
const tableApi = ({ api, pageSize, pageNum, query }) =>
  post(api, { pageSize, pageNum, ...query });

export default {
  xzqhQuery,
  getSxjlx,
  tableApi,
};
