/*
 * @Author: lin.zehong
 * @Date: 2018-12-25 15:53:45
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-01-07 10:32:26
 * @Desc: 权限关联菜单
 */

import React from 'react';
import { connect } from "dva";
import { Form, message, Button, Tabs } from 'antd';
import Table from '../../../../components/table/Table';
import { RelMenuColumns } from './PrivilegeColumns';
import PrivilegeRelMenuForm from './PrivilegeRelMenuForm';
import styles from './PrivilegePage.less';

const { TabPane } = Tabs;

@Form.create()
class PrivilegeRelMenuPage extends React.Component {

  state = {
    modalVisible: false,
    query: {},
  };

  componentWillReceiveProps = () => {
    const { clickedRow } = this.props;
    this.handleSearch(clickedRow);
  };

  // 查询方法
  handleSearch = (record = {}) => {
    const params = {
      currentPage: '1',
      pageSize: '5',
      privId: record.privId,
      queryType: '1', // 1——已关联，2——未关联，必填
      t: Math.random(),
    };
    this.setState({ query: params });
  }

  // 删除方法
  handleDelete = (row) => {
    const { clickedRow } = this.props;
    if (!clickedRow) return;
    const params = {
      privId: clickedRow.privId, // 权限id，必填
      menuId: row.menuId,
    };
    this.toDelete(params);
  }

  // 删除菜单抽取的方法
  toDelete = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'privilegeModel/delPrivMenu',
      payload: params,
    }).then(result => {
      if (result && result.errCode === "0") {
        if (!this.flag) { // message弹出次数限制
          this.flag = true;
          message.success('删除成功', 3, () => {
            this.flag = false;
          });
          this.handleSearch();
        }
      } else {
        message.error('删除失败');
      }
    })
  }

  // 控制弹出框的显示状态
  handleModalVisible = (flag) => {
    const visible = !!flag;
    this.setState({ modalVisible: visible });
    if (!visible) { // 新增或者修改，需要重新查询
      this.handleSearch();
    }
  }

  // 关闭弹出窗，不需要重新查询
  handleModalCancel = () => {
    this.setState({ modalVisible: false });
  }

  // 控制关联菜单弹出框的显示状态
  handleMenuModalVisible = (flag) => {
    const { clickedRow } = this.props;
    if (flag && !clickedRow) {
      message.error('请选择需要关联菜单的权限！');
      return;
    }
    this.setState({ modalVisible: flag });
  }

  render() {
    const { query, modalVisible } = this.state;
    const { clickedRow } = this.props;
    const columns = RelMenuColumns(this.handleDelete);
    const PrivilegeFormContent = (
      <PrivilegeRelMenuForm
        handleMenuModalVisible={this.handleMenuModalVisible}
        privData={clickedRow}
      />
    );

    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="关联菜单" key="1">
          <div className={styles.root}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" disabled={!clickedRow.privName} onClick={() => this.handleMenuModalVisible(true)}>
                新增
              </Button>
              <div className="nameWrap">
                <span className="nameLabel">当前关联名称:</span>
                <span className="nameText">{clickedRow.privName || ""}</span>
              </div>
            </div>
            <Table
              api='/system/privMenuController/qryPrivMenuPage'
              columns={columns}
              rowKey="menuId"
              pagination
              query={query}
              isShowTip={false}
            />
            {modalVisible ? PrivilegeFormContent : null}
          </div>
        </TabPane>
      </Tabs>
    )
  }
}

function mapStateToProps({ privilegeModel }) {
  return {
    clickedRow: privilegeModel.clickedRow,
  };
}

export default connect(mapStateToProps)(PrivilegeRelMenuPage);
