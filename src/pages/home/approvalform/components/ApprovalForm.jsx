/*
 * @Author: lin.zehong
 * @Date: 2019-08-06 13:44:53
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-20 13:53:07
 * @Desc: 审批单
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "dva";
import router from "umi/router";
import { Button, Message, Spin } from 'antd';
import { FormHeader, CheckItem, SharedField, Reason, Idea } from 'components/Mattersform';
import IdeaInput from './IdeaInput';
import styles from './ApprovalForm.less';

const ApprovalForm = (props) => {
  const [textVal, setTextVal] = useState(null);
  const [radioVal, setRadioVal] = useState(null);
  const { userId } = props;

  useEffect(() => {
    const { getInfo, location: { query = {} } = {} } = props;
    const { approvalCode } = query && JSON.parse(query.record) || {};
    if (!userId) return;
    getInfo({
      type: 1,
      approvalCode,
      userId,
    });
  }, [userId]);

  const handleRadio = (param) => {
    setRadioVal(param);
  }

  const handleText = (param) => {
    setTextVal(param);
  }

  const onSure = () => {
    const { updateApprovalForm, location: { query = {} } = {} } = props;
    const { approvalCode } = query && JSON.parse(query.record) || {}; // 個人工作台 -》 審批單詳情接口
    if (radioVal === null) {
      Message.warning("請選擇審批結果");
      return;
    }
    if (!textVal) {
      Message.warning("請輸入審批意見");
      return;
    }
    if (textVal.length > 500) {
      Message.warning("審批意見最大長度為500");
      return;
    }
    updateApprovalForm({
      approvalCode,
      approvalResult: radioVal,
      approvalOpinion: textVal,
    })
  }

  // 取消
  const onCancel = () => {
    router.push("/workbench");
  }

  // 渲染審批意見
  const renderIdea = () => {
    const {
      approvalFormList, role, location: { query = {} } = {},
    } = props;
    const { stateAndResult: status } = query && JSON.parse(query.record) || {};
    const template = status === "待審批" ?
      (
        <IdeaInput
          radioVal={radioVal}
          textVal={textVal}
          title="審批意見"
          role={role}
          handleRadio={handleRadio}
          handleText={handleText}
        />
      )
      :
      (
        <Idea title="審批意見" data={approvalFormList} />
      )
    return template;
  }

  const {
    businessNameList, dataDirectoryNameList, dataDirectoryList,
    baseInfo, location: { query = {} } = {}, loading,
  } = props;
  const { approvalCode } = baseInfo;
  const { stateAndResult: status } = query && JSON.parse(query.record) || {};

  return (
    <Spin spinning={!!loading}>
      <div className={styles.root}>
        <FormHeader title={`事項目錄審批單-${approvalCode || ""}`} tipResult={status} />
        <CheckItem title="發起事項" data={businessNameList} type="business" />
        <CheckItem title="申請數據目錄" data={dataDirectoryNameList} type="catalog" />
        <SharedField
          title="共享欄位選擇"
          type="business"
          columns={businessNameList}
          data={dataDirectoryList}
        />

        <Reason title="申請理由" data={baseInfo} />
        {renderIdea()}
        {
          status === "待審批" ?
            (
              <div className={styles.floor}>
                <Button onClick={onCancel}>取消</Button>
                <Button type="primary" onClick={onSure}>確定</Button>
              </div>
            )
            : null
        }
      </div>
    </Spin>
  );
}

ApprovalForm.propTypes = {
  role: PropTypes.string,
  userId: PropTypes.string,
  businessNameList: PropTypes.arrayOf(PropTypes.any),
  dataDirectoryNameList: PropTypes.arrayOf(PropTypes.any),
  dataDirectoryList: PropTypes.arrayOf(PropTypes.any),
  approvalFormList: PropTypes.arrayOf(PropTypes.any),
}

ApprovalForm.defaultProps = {
  role: 'deptNormalUser', // 申請方 deptNormalUser / 委辦局 deptAdminUser / 系統管理員 sysAdmin
  userId: '',
  businessNameList: [],
  dataDirectoryNameList: [],
  dataDirectoryList: [],
  approvalFormList: [],
}


const mapStateToProps = ({ applyForm, publicModel, loading }) => ({
  userId: publicModel.userId,
  role: publicModel.roleCharacter,
  baseInfo: applyForm.baseInfo,
  businessNameList: applyForm.businessNameList,
  dataDirectoryNameList: applyForm.dataDirectoryNameList,
  dataDirectoryList: applyForm.dataDirectoryList,
  approvalFormList: applyForm.approvalFormList,
  loading: loading.effects['applyForm/getInfo'] ||
    loading.effects['applyForm/addApplyForm'] ||
    loading.effects['approvalForm/updateApprovalForm'],
});

const mapDispatchToProps = dispatch => ({
  getInfo(payload) {
    dispatch({
      type: 'applyForm/getInfo',
      payload,
    });
  },
  addApplyForm(payload) {
    dispatch({
      type: 'applyForm/addApplyForm',
      payload,
    });
  },
  updateApprovalForm(payload) {
    dispatch({
      type: 'approvalForm/updateApprovalForm',
      payload,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalForm);
