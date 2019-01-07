/*
 * @Author: lin.zehong
 * @Date: 2018-08-23 09:54:49
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-01-07 14:19:19
 * @Desc: 权限关联菜单
 */
import React, { PureComponent } from 'react';
import { connect } from "dva";
import { Row, Col, Card, Form, Input, Button, Modal, message } from 'antd';
import Table from '../../../../components/table/Table';
import styles from './PrivilegeRelMenuForm.less';

const FormItem = Form.Item;

@Form.create()
class PrivilegeRelMenuForm extends PureComponent {
  state = {
    selectedRows: [],
    query: {},
  };

  componentWillMount() {
    this.handleSearch();
  }

  // 查询方法
  handleSearch = () => {
    const { form, privData } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const params = {
        ...fieldsValue,
        state: '00A',
        privId: privData.privId,
        queryType: '2',
      };
      this.setState({ query: params });
    });
  }

  // 提交按钮
  handleSubmit = () => {
    const { handleMenuModalVisible, privData, dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows || selectedRows.length === 0) {
      message.error('请至少选择一行！');
      return;
    }
    const list = [];
    for (let i = 0; i < selectedRows.length; i += 1) {
      list.push({
        privObjectId: selectedRows[i],
        menuId: selectedRows[i],
        privId: privData.privId,
      });
    }
    dispatch({
      type: 'privilegeModel/addPrivMenu',
      payload: { list },
    }).then(result => {
      if (!result) return;
      if (result.errCode !== '0') {
        message.error(result.message);
      } else {
        message.success('关联成功');
        handleMenuModalVisible(false);
      }
    });
  }

  // 复选框选择
  handleSelectRows = (selectedRows) => {
    this.setState({ selectedRows });
  }

  renderForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <Row gutter={24}>
          <Col md={12} sm={24}>
            <FormItem label="菜单名称">
              {getFieldDecorator('menuName')(
                <Input placeholder="请输入菜单名称" />
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" onClick={() => this.handleSearch()}>查询</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { handleMenuModalVisible } = this.props;
    const { selectedRows } = this.state;
    const { query } = this.state;
    const rowSelection = {
      selectedRowKeys: selectedRows,
      onChange: this.handleSelectRows,
      getCheckboxProps: record => ({
        disabled: record.related === '1', // 配置行为disabled，不可选择
        name: record.menuName,
      }),
    };
    const columns = [
      {
        title: '菜单名称',
        dataIndex: 'menuName',
      },
      {
        title: '菜单路径',
        dataIndex: 'menuUrl',
      },
    ];

    return (
      <Modal
        title="新增关联菜单"
        visible
        destroyOnClose
        onOk={() => this.handleSubmit()}
        onCancel={() => handleMenuModalVisible(false)}
        width={680}
      >
        <Card bordered={false} bodyStyle={{ padding: '0 24px' }}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <Table
              api='/system/privMenuController/qryPrivMenuPageCascade'
              columns={columns}
              rowKey="menuId"
              pagination
              query={query}
              isShowTip
              selectKeysNums={selectedRows.length}
              handleSelectRows={this.handleSelectRows}
              rowSelection={rowSelection}
            />
          </div>
        </Card>
      </Modal>
    );
  }
}

export default connect()(PrivilegeRelMenuForm);
