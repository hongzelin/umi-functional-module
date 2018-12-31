/*
 * @Author: lin.zehong
 * @Date: 2018-12-25 15:53:45
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-31 23:14:53
 * @Desc: 菜单管理
 */

import React from 'react';
import { connect } from "dva";
import { Form, message, Button, Modal } from 'antd';
import HeaderSearch from '../../common/HeaderSearch';
import Table from '../../../../components/table/Table';
import ApiColumns from './ApiColumns';
import MenuForm from './MenuForm';
import styles from './ApiPage.less';

const { confirm } = Modal;

@Form.create()
class MenuPage extends React.Component {

  state = {
    selectedRows: [],
    modalVisible: false,
    menuSysData: {},
    thisTime: '', // 判断查看还是修改
    query: {},
  };

  // 表头重置
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.handleSearch({ isReset: true });
  }

  // 查询方法
  handleSearch = (params = {}) => {
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.menuName = params.menuName ? params.menuName : fieldsValue.menuName;
      fieldsValue.isReset = !!params.isReset;
      const values = {
        ...fieldsValue,
        t: Math.random(),
      };
      this.setState({
        query: values,
      });
    });
  }

  // 新增方法
  handleAdd = () => {
    this.setState({
      menuSysData: {},
      thisTime: '',
    });
    this.handleModalVisible(true);
  }

  // 修改方法
  handleUpdate = (row) => {
    this.setState({
      menuSysData: row,
      thisTime: '',
    });
    this.handleModalVisible(true);
  }

  // 查看方法
  handleView = (row) => {
    this.setState({
      menuSysData: row,
      thisTime: { footer: null },
    });
    this.handleModalVisible(true);
  }

  // 删除方法
  handleDelete = (row) => {
    let params = {};
    if (Array.isArray(row)) {
      for (let i = 0; i < row.length; i += 1) {
        params = { menuId: row[i] };
        this.toDelete(params);
      }
    } else {
      params = { menuId: row.menuId }; // 菜单id，必填
      this.toDelete(params);
    }
    this.handleSelectRows([]);
  }

  // 删除菜单抽取的方法
  toDelete = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menuModel/DelMenu',
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

  // 批量删除
  handleDeleteBatch = () => {
    const { selectedRows } = this.state;
    const _this = this;
    if (!selectedRows) return;
    confirm({
      title: '确定批量删除记录吗?',
      content: '删除后无法恢复',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        _this.handleDelete(selectedRows);
      },
    });
  }

  // 复选框选择
  handleSelectRows = (selectedRows) => {
    this.setState({ selectedRows });
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

  render() {
    const { selectedRows, query, modalVisible, menuSysData, thisTime } = this.state;
    const apiColumns = ApiColumns(this.handleView, this.handleUpdate, this.handleDelete);
    const rowSelection = {
      selectedRowKeys: selectedRows,
      onChange: this.handleSelectRows,
    };
    const MenuFormContent = (
      <MenuForm
        menuSysData={menuSysData}
        thisTime={thisTime}
        handleModalVisible={this.handleModalVisible}
        handleModalCancel={this.handleModalCancel}
      />
    );

    return (
      <div className={styles.root}>
        <HeaderSearch
          title="API管理"
          placeholder="请输入API名称"
          btnText="新增API"
          fieldName="menuName"
          handleAdd={this.handleAdd}
          handleFormReset={this.handleFormReset}
          handleSearch={this.handleSearch}
        />
        <div className={styles.tableListOperator}>
          {
            // 控制批量删除按扭的显示和隐藏
            selectedRows.length > 0 && (
              <span>
                <Button type="danger" onClick={() => { this.handleDeleteBatch(); }}>批量删除</Button>
              </span>
            )
          }
        </div>
        <Table
          api='/system/apiController/qryApiPage' // 请求接口
          columns={apiColumns} // 表字段
          rowKey="apiId" // 表数据key字段
          pagination // 是否展示分页
          query={query} // 查询条件
          rowSelection={rowSelection} // 是否展示复选框，参数参考antd table 组件 rowSelection
          isShowTip
          selectKeysNums={selectedRows.length}
          handleSelectRows={this.handleSelectRows}
        />
        {modalVisible ? MenuFormContent : null}
      </div>
    )
  }
}

export default connect()(MenuPage);
