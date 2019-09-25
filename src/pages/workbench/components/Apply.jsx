/*
 * @Author: lin.zehong
 * @Date: 2019-08-07 11:27:36
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-20 14:21:29
 * @Desc: 個人工作台--申請單
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "dva";
import TitlePage from 'components/Title';
import Table from 'components/Table';
import RadioSearch from './RadioSearch';
import Columns from './ApplyColumns';
import ApplyIdeaModal from './ApplyIdeaModal';
import styles from './Apply.less';

class Apply extends Component {
  state = {
    visible: false,
    query: { applyState: 0 },
    radioVal: "待審批",
    searchVal: "",
    statusVal: null,
    deptVal: "",
    record: {},
  };

  // 详情，申請单
  handleView = (record) => {
    window.open(`/home/applyform?record=${JSON.stringify(record)}`, '_blank');
  }

  // 審批意見
  handleIdea = (record) => {
    this.setState({ record });
    this.handleVisible(true);
  }

  // 審批意見彈出窗
  handleVisible = (param) => {
    this.setState({ visible: param });
  }

  // 撤回
  handleGoBack = (record = {}) => {
    const { applyCode } = record || {};
    const { goback, UpdateCountByState } = this.props;
    goback({ applyCode }).then(errCode => {
      if (errCode === 0) {
        const { radioVal, searchVal, statusVal } = this.state;
        const params = {
          radioVal,
          searchVal,
          statusVal,
        };
        UpdateCountByState();
        this.updateTable(params);
      }
    });
  }

  // Radio 切換
  onChange = e => {
    const { statusVal, deptVal } = this.state;
    // const { searchVal, statusVal, deptVal } = this.state;
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
    const result = radioVal === "已審批" ? { applyResult: statusVal } : {};
    this.setState({
      radioVal,
      searchVal,
      statusVal,
      query: {
        applyState: radioVal === "已審批" ? 1 : (radioVal === "待審批" ? 0 : 2), // 0 待审批, 1 已审批，2 已撤回
        ...result,
        keyWord: searchVal,
        t: Math.random(),
      },
    });
  }

  render() {
    const { query, radioVal, visible, record } = this.state;
    const { role, applyCount } = this.props;
    const options = {
      role,
      status: radioVal,
    }
    const columns = Columns(this.handleView, this.handleIdea, this.handleGoBack, options);
    return (
      <div className={styles.root}>
        <TitlePage title="申請單" />
        <div className={styles.content}>
          <RadioSearch
            placeholder="申請單編碼/申請理由/發起事項關鍵字"
            status="申請單"
            onChange={this.onChange}
            onSearch={this.onSearch}
            countData={applyCount}
          />
          <Table
            api='/workplatform/listApplyForm'
            columns={columns}
            rowKey="applyCode"
            pagination
            query={query}
            options={{
              onChange: this.onChangeTab,
              isList: true,
            }}
          />
        </div>
        {visible ? <ApplyIdeaModal type="apply" record={record} handleVisible={this.handleVisible} /> : null}
      </div>
    );
  }
}

Apply.propTypes = {
  applyCount: PropTypes.objectOf(PropTypes.any),
}

Apply.defaultProps = {
  applyCount: {},
}

const mapStateToProps = ({ applyForm }) => ({
  applyCount: applyForm.applyCount,
});

const mapDispatchToProps = dispatch => ({
  goback(payload) {
    return dispatch({
      type: 'workbench/goback',
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

export default connect(mapStateToProps, mapDispatchToProps)(Apply);
