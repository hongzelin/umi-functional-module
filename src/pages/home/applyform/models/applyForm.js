import { Message } from "antd";
import { routerRedux } from "dva/router";
import {
  getInfo,
  applyFormDetail,
  approvalFormDetail,
  addApplyForm,
  countByState,
} from "../services/applyApi";

const initData = {
  baseInfo: {},
  businessNameList: [], // 事项
  dataDirectoryNameList: [], // 数据目录名称
  dataDirectoryList: [], // 数据目录列表
  approvalFormList: [], // 审批意见列表
  applyCount: {
    hasBeenApprovaledSum: 0, // 已審批
    canceledSum: 0, // 已撤銷
    toBeApprovaledSum: 0, // 待審批
  },
  approvalCount: {
    hasBeenApprovaledSum: 0, // 已審批
    toBeApprovaledSum: 0, // 待審批
  },
  type: "", // 区分从不同的入口进入详情（fromHome 事项目录申请, 默认从个人工作台进入）
};

export default {
  namespace: "applyForm",
  state: {
    ...initData,
  },
  effects: {
    *getInfo({ payload }, { call, put }) {
      const { type } = payload;
      // type: 1 審批單詳情，2 申請單詳情，0 事項目錄申請
      const fetchApi =
        type === 1
          ? approvalFormDetail
          : type === 2
          ? applyFormDetail
          : getInfo;
      const { errCode, data = {} } = yield call(fetchApi, payload);
      if ((errCode === "0" || errCode === 0) && data) {
        const {
          businessNameList,
          dataDirectoryNameList,
          dataDirectoryList,
          approvalFormList,
          ...baseInfo
        } = data;
        yield put({
          type: "dump",
          payload: {
            baseInfo,
            businessNameList,
            dataDirectoryNameList,
            dataDirectoryList,
            approvalFormList,
          },
        });
      }
    },
    *addApplyForm({ payload }, { call, put }) {
      const { errCode } = yield call(addApplyForm, payload);
      if (errCode === "0" || errCode === 0) {
        Message.success("提交申請成功");
        yield put(
          routerRedux.push({
            pathname: "/home",
          })
        );
      } else {
        Message.error("提交申請失敗");
      }
    },
    *countByState({ payload }, { call, put }) {
      const { errCode, data } = yield call(countByState, payload);
      if ((errCode === "0" || errCode === 0) && data) {
        yield put({
          type: "dump",
          payload: {
            ...data,
          },
        });
      }
    },
  },
  reducers: {
    dump: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    clearData: () => ({ ...initData }),
  },
};
