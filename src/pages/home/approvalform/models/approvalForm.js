import { Message } from 'antd';
import { routerRedux } from 'dva/router'
import { updateApprovalForm } from '../services/approvalApi';

const initData = {
};
export default {
  namespace: "approvalForm",
  state: {
    ...initData,
  },
  effects: {
    *updateApprovalForm({ payload }, { call, put }) {
      const { type } = payload;
      const { errCode } = yield call(updateApprovalForm, payload);
      if (errCode === '0' || errCode === 0) {
        Message.success('審批成功');
        if (type && type === "1") {
          return errCode; // 刷新表格數據
        }
        yield put(routerRedux.push({ // 如果是詳情，則跳轉到個人工作台
          pathname: '/workbench',
        }));
      } else {
        Message.error('審批失敗');
      }
    },
  },
  reducers: {
    clearData: () => ({ ...initData }),
  },
};
