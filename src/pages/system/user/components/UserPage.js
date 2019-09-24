/*
 * @Author: lin.zehong
 * @Date: 2018-12-25 15:53:45
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-05-05 17:19:28
 * @Desc: 账号管理
 */

import React from 'react';
import { connect } from "dva";
import { Form, message, Modal, Tooltip, Button, Row, Col, Icon, Input } from 'antd';
import HeaderSearch from '../../common/HeaderSearch';
import Table from '../../../../components/table/Table';
import UserColumns from './UserColumns';
import UserForm from './UserForm';
import styles from './UserPage.less';

const { confirm } = Modal;
const FormItem = Form.Item;

@Form.create()
class UserPage extends React.Component {

  state = {
    selectedRows: [],
    modalVisible: false,
    expandForm: false,    // 是否召开高级查询表单
    menuSysData: {},
    thisTime: '', // 判断查看还是修改
    query: {},
  };

  componentWillUnmount = () => {
    this.onRowClick();
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
      fieldsValue.userCode = params.userCode ? params.userCode : fieldsValue.userCode;
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
        params = { rolesId: row[i] };
        this.toDelete(params);
      }
    } else {
      params = { rolesId: row.rolesId }; // 角色id，必填
      this.toDelete(params);
    }
    this.handleSelectRows([]);
  }

  // 删除菜单抽取的方法
  toDelete = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'roleModel/delRoles',
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

  // antd Table onRow事件
  onRow = (record, index) => {
    return {
      onClick: () => { this.onRowClick(record, index); }, // 点击行
    };
  }

  // 角色点击事件，关联权限
  onRowClick = (record, index) => {
    if (record) {
      this.handleSelectRows([record.privId]); // 点击的时候，同时选中，增加样式
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'roleModel/changeRow',
      payload: {
        clickedRow: record || {},
        index,
      },
    })
  }

  // 收缩展开查询表单
  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  }

  // 根据需要显示 toolTip 标签
  tooltipRender = (text) => {
    if (text === null || text.length === 0) return '--';
    if (text.length < 15) return text;
    return (
      <Tooltip placement="top" title={text}>
        {text.substring(0, 15)}
        <span>...</span>
      </Tooltip>
    );
  };

  // 渲染简单查询表单
  renderSimpleForm = () => {
    return (
      <HeaderSearch
        title="账号管理"
        placeholder="请输入账号"
        btnText="新增账号"
        fieldName="userCode"
        handleAdd={this.handleAdd}
        handleFormReset={this.handleFormReset}
        handleSearch={this.handleSearch}
      >
        <a style={{ float: "right", margin: "6px 0 0 8px" }} onClick={this.toggleForm}>
          展开
          <Icon type="down" />
        </a>
      </HeaderSearch>
    );
  }

  // 渲染高级查询表单
  renderAdvancedForm = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="账号">
              {getFieldDecorator('userCode')(
                <Input placeholder="请输入账号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="用户名称">
              {getFieldDecorator('userName')(
                <Input placeholder="请输入用户名称" />
              )}
            </FormItem>
          </Col>

          <Col md={8} sm={24} style={{ overflow: 'hidden' }}>
            <span style={{ float: 'right', marginBottom: 24 }}>
              <Button type="primary" onClick={() => this.handleSearch()}>查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起
                <Icon type="up" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  // 判断渲染哪个查询表单（简单查询，还是高级查询）
  renderForm = () => {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { selectedRows, query, modalVisible, menuSysData, thisTime } = this.state;
    const columns = UserColumns(this.handleView, this.handleUpdate, this.handleDelete, this.tooltipRender);

    const UserFormContent = (
      <UserForm
        userData={menuSysData}
        thisTime={thisTime}
        handleModalVisible={this.handleModalVisible}
        handleModalCancel={this.handleModalCancel}
      />
    );

    return (
      <div className={styles.root}>
        <div className={styles.tableList}>
          <div className={`${styles.tableListForm} ${styles.tdWidth}`}>
            {this.renderForm()}
          </div>
          <div className={styles.tableListOperator}>
            {
              selectedRows.length > 0 && (
                <span>
                  <Button type="danger" onClick={() => { this.handleDeleteBatch(); }}>批量删除</Button>
                </span>
              )
            }
          </div>
          <Table
            api='/system/userController/qryUserPage'
            columns={columns}
            rowKey="userId"
            pagination
            query={query}
            selectedRows={selectedRows}
            onRow={this.onRow}
          />
        </div>
        {/* {UserFormContent} */}
        {modalVisible ? UserFormContent : null}
      </div>
    )
  }
}

export default connect()(UserPage);
