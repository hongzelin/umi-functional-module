/*
 * @Author: lin.zehong
 * @Date: 2019-08-06 13:44:33
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-09-25 10:13:37
 * @Desc: 申请单
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "dva";
import router from "umi/router";
import { Button, Message, Spin } from 'antd';
import { FormHeader, CheckItem, SharedField, Idea, Reason } from 'components/Mattersform';
import ReasonInput from './ReasonInput';
import styles from './ApplyForm.less';

const ApplyForm = (props) => {
  const [textVal, setTextVal] = useState(null);
  const [data, setData] = useState([]);
  const { userId } = props;

  useEffect(() => {
    const { getInfo, location: { query = {} } = {} } = props;
    const { applyCode, type, businessIds, dataDirectoryIds } = query && JSON.parse(query.record) || {};
    if (!userId) return;
    if (type && type === "fromHome") {
      getInfo({ type: 0, userId, businessIds, dataDirectoryIds });
    } else {
      getInfo({
        type: 2,
        applyCode,
        userId,
      });
    }
  }, [userId]);

  const handleText = (param) => {
    setTextVal(param);
  }

  const onSure = () => {
    if (!textVal) {
      Message.warning('请输入申请理由！');
      return;
    }
    if (textVal.length > 500) {
      Message.warning('申请理由最大長度為500！');
      return;
    }

    const { addApplyForm, baseInfo, location: { query = {} } = {} } = props;
    const { applyCode } = baseInfo || {};
    const { businessIds, dataDirectoryIds } = query && JSON.parse(query.record) || {};

    const params = {
      applyCode,
      userId,
      applyReason: textVal,
      businessIds,
      dataDirectoryIds,
      paramIdsRelationList: data,
    }
    addApplyForm(params);
  }

  // 取消
  const onCancel = () => {
    const { location: { query = {} } = {} } = props;
    const { type } = query && JSON.parse(query.record) || {};
    if (type && type === "fromHome") {
      router.push("/home");
    } else {
      router.push("/workbench");
    }
  }

  // 共享栏位，勾选事项数据处理
  const handleOnSureData = (e, businessId, record) => {
    if (!businessId) {
      return;
    }
    const { paramCodeAlias, dataDirectoryId, paramId } = record || {};
    let index = 0;
    const newData = data.filter((item, i) => {
      if (item.paramCodeAlias === paramCodeAlias) {
        index = i;
        return true;
      }
      return false;
    });

    if (e.target.checked) { // 新增
      if (newData.length) { // 从已有的数组新增
        const { businessIds } = newData[0];
        businessIds.push(businessId);
        data.splice(index, 1, { paramCodeAlias, dataDirectoryId, paramId, businessIds });
      } else {
        data.push({
          paramCodeAlias,
          dataDirectoryId,
          businessIds: [businessId],
          paramId,
        });
      }
    } else { // 删除
      const { businessIds } = newData[0];
      const ids = businessIds.filter(item => item !== businessId);
      if (ids.length) {
        data.splice(index, 1, { paramCodeAlias, dataDirectoryId, paramId, businessIds: ids });
      } else {
        data.splice(index, 1);
      }
    }
    setData(data);
  }

  // 目录大厅入口 和 个人工作台入口，展示不一样
  const renderReason = () => {
    const { approvalFormList, location: { query = {} } = {} } = props;
    const { type } = query && JSON.parse(query.record) || {};
    const template = (type && type === "fromHome") ?
      (
        <>
          <ReasonInput title="申請理由" textVal={textVal} handleText={handleText} />
          <div className={styles.floor}>
            <Button onClick={onCancel}>取消</Button>
            <Button type="primary" onClick={onSure}>提交申請</Button>
          </div>
        </>
      )
      :
      (
        <>
          <Reason title="申請理由" data={baseInfo} />
          <Idea title="審批意見" data={approvalFormList} />
        </>
      );
    return template;
  }

  const {
    businessNameList, dataDirectoryNameList, dataDirectoryList,
    baseInfo, location: { query = {} } = {}, loading,
  } = props;
  const { applyCode } = baseInfo;
  const { stateAndResult: status, type } = query && JSON.parse(query.record) || {};
  return (
    <Spin spinning={!!loading}>
      <div className={styles.root}>
        <FormHeader title={`事項目錄申請單-${applyCode || ""}`} tipResult={type === "fromHome" ? null : status} />
        <CheckItem title="發起事項" data={businessNameList} type="business" />
        <CheckItem title="申請數據目錄" data={dataDirectoryNameList} type="catalog" />
        <SharedField
          title="共享欄位選擇"
          type="business"
          isFromHome={type === "fromHome"}
          columns={businessNameList}
          data={dataDirectoryList}
          handleOnSureData={handleOnSureData}
        />
        {renderReason()}
      </div>
    </Spin>
  );
}

ApplyForm.propTypes = {
  userId: PropTypes.string,
  businessNameList: PropTypes.arrayOf(PropTypes.any),
  dataDirectoryNameList: PropTypes.arrayOf(PropTypes.any),
  dataDirectoryList: PropTypes.arrayOf(PropTypes.any),
  approvalFormList: PropTypes.arrayOf(PropTypes.any),
}

ApplyForm.defaultProps = {
  userId: "",
  businessNameList: [],
  dataDirectoryNameList: [],
  dataDirectoryList: [],
  approvalFormList: [],
}

const mapStateToProps = ({ applyForm, publicModel, loading }) => ({
  userId: publicModel.userId,
  baseInfo: applyForm.baseInfo,
  businessNameList: applyForm.businessNameList,
  dataDirectoryNameList: applyForm.dataDirectoryNameList,
  dataDirectoryList: applyForm.dataDirectoryList,
  approvalFormList: applyForm.approvalFormList,
  loading: loading.effects['applyForm/getInfo'] ||
    loading.effects['applyForm/addApplyForm'],
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplyForm);
