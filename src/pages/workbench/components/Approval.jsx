/*
 * @Author: lin.zehong
 * @Date: 2019-08-07 11:28:49
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-19 19:13:54
 * @Desc: 個人工作台--审批单
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "dva";
import TitlePage from 'components/Title';
import Table from 'components/Table';
import RadioSearch from './RadioSearch';
import Columns from './ApprovalColumns';
import IdeaModal from './IdeaModal';
import ApplyIdeaModal from './ApplyIdeaModal';
import styles from './Approval.less';

class Approval extends Component {
  state = {
    visible: false,
    record: {},
    type: '審批',
    query: { approvalState: 0 },
    radioVal: "待審批",
    searchVal: "",
    statusVal: null,
    deptVal: "",
  };

  // 详情，审批单
  handleView = (record) => {
    window.open(`/home/approvalform?record=${JSON.stringify(record)}`, '_blank');
  }

  // 審批意見彈出窗
  handleVisible = (param) => {
    this.setState({ visible: param });
  }

  // 審批意見
  handleIdea = (record) => {
    this.setState({ record, type: '審批意見' });
    this.handleVisible(true);
  }

  // 審批
  handleApproval = (record) => {
    this.setState({ record, type: '審批' });
    this.handleVisible(true);
  }

  // 確定
  onSure = (result, opinion) => {
    const { record } = this.state;
    const { updateApprovalForm, UpdateCountByState } = this.props;
    const { approvalCode } = record || {};
    updateApprovalForm({
      approvalCode,
      approvalResult: result,
      approvalOpinion: opinion,
      type: "1", // 在 model 處理，表示直接點擊表格操作 “審批” 功能，跟 “審批單詳情” 的審批區分。
    }).then(errCode => {
      if (errCode === 0) {
        const { radioVal, searchVal, statusVal, deptVal } = this.state;
        const params = { radioVal, searchVal, statusVal, deptVal };
        UpdateCountByState();
        this.updateTable(params);
      }
    })
  }

  // Radio 切換
  onChange = e => {
    const { statusVal, deptVal } = this.state;
    const params = {
      radioVal: e.target.value || "待審批",
      searchVal: "",
      statusVal,
      deptVal,
    };
    this.updateTable(params);
  };

  // InputSearch 搜索
  onSearch = value => {
    const { radioVal, statusVal, deptVal } = this.state;
    const params = {
      searchVal: value || "",
      radioVal,
      statusVal,
      deptVal,
    };
    this.updateTable(params);
  };

  // 分页、排序、筛选变化时触发
  onChangeTab = (pagination, filters = {}) => {
    const { stateAndResult: status, launchDeptName: dept } = filters;
    let statusVal = null;
    let deptVal = null;
    if (status && status.length) {
      [statusVal] = status;
    }
    if (dept && dept.length) {
      [deptVal] = dept;
    }
    const { radioVal, searchVal } = this.state;
    const params = {
      searchVal,
      radioVal,
      statusVal,
      deptVal,
    };
    this.updateTable(params);
  }

  // 更新表格數據
  updateTable = (params = {}) => {
    const { radioVal, searchVal, statusVal } = params;
    const result = radioVal === "已審批" ? { approvalResult: statusVal } : {};
    const { userId } = this.props;
    this.setState({
      radioVal,
      searchVal,
      statusVal,
      query: {
        approvalState: radioVal === "已審批" ? 1 : 0, // 0 待审批, 1 代表已审批
        keyWord: searchVal,
        ...result,
        userId, // 用戶 ID
        t: Math.random(),
      },
    });
  }

  render() {
    const { query, radioVal, visible, record, type } = this.state;
    const { role, approvalCount } = this.props;
    const options = {
      role,
      status: radioVal,
    }
    const columns = Columns(this.handleView, this.handleIdea, this.handleApproval, options);
    return (
      <div className={styles.root}>
        <TitlePage title="審批單" />
        <div className={styles.content}>
          <RadioSearch
            placeholder="審批單編碼/申請理由/發起事項關鍵字"
            status="審批單"
            onChange={this.onChange}
            onSearch={this.onSearch}
            countData={approvalCount}
          />
          <Table
            api='/workplatform/listApprovalForm'
            columns={columns}
            rowKey="approvalCode"
            pagination
            query={query}
            options={{
              onChange: this.onChangeTab,
              isList: true,
            }}
          />
        </div>
        {visible && type === "審批" ?
          (
            <IdeaModal
              type={type}
              record={record}
              handleVisible={this.handleVisible}
              onSure={this.onSure}
            />
          )
          : null}

        {/* 審批單的審批意見展示，跟申請單的一樣 */}
        {visible && type === "審批意見" ?
          <ApplyIdeaModal type="approval" record={record} handleVisible={this.handleVisible} />
          : null}
      </div>
    );
  }
}

Approval.propTypes = {
  userId: PropTypes.string,
  approvalCount: PropTypes.objectOf(PropTypes.any),
}

Approval.defaultProps = {
  approvalCount: {},
  userId: "",
}

const mapStateToProps = ({ applyForm, publicModel }) => ({
  userId: publicModel.userId,
  approvalCount: applyForm.approvalCount,
});

const mapDispatchToProps = dispatch => ({
  updateApprovalForm(payload) {
    return dispatch({
      type: 'approvalForm/updateApprovalForm',
      payload,
    });
  },
  UpdateCountByState(payload) {
    dispatch({
      type: 'applyForm/countByState',
      payload,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Approval);
