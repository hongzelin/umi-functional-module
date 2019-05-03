/*
 * @Author: lin.zehong chunxiong
 * @Date: 2018-07-26 15:46:25
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-05-03 10:31:34
 * @Desc: 角色弹出表单
 */

import React, { PureComponent } from 'react';
import { connect } from "dva";
import { Form, Input, Modal, message } from 'antd';

const FormItem = Form.Item;
const actionTypeMap = {
  'A': '新增角色',
  'M': '修改角色',
  'V': '查看角色',
};

@Form.create({})
class PrivilegeForm extends PureComponent {

  state = {
    actionType: 'A',
    actionTypeName: actionTypeMap.A,
    disableFlag: false,
    loading: false,
    checkName: '',
  }

  componentDidMount() {
    this.init();
  }

  // 初始化
  init = () => {
    const { menuSysData, thisTime } = this.props;
    this.setActionType();
    if (menuSysData && menuSysData.rolesId) { // 先判断是否为新增
      if (thisTime === '') { // 再根据 thisTime 判断查看还是修改
        this.editState(menuSysData);
      } else {
        this.detailState();
      }
    } else {
      this.addState();
    }
  }

  // 编辑状态
  editState = (menuSysData) => {
    this.setState({
      actionType: 'M',
      actionTypeName: '修改角色',
      disableFlag: false,
      checkName: menuSysData.rolesName,
    });
  }

  // 详情状态
  detailState = () => {
    this.setState({
      actionType: 'V',
      actionTypeName: '查看角色',
      disableFlag: true,
    });
  }

  // 新增状态
  addState = () => {
    this.setState({
      actionType: 'A',
      actionTypeName: '新增角色',
      disableFlag: false,
    });
  }

  // 设置动作类型
  setActionType = () => {
    const { menuSysData } = this.props;
    let action = 'A';
    if (menuSysData && menuSysData.actionType) {
      action = menuSysData.actionType;
    }
    this.setState({
      actionType: action,
      actionTypeName: actionTypeMap[action],
    });
  }

  // 提交按钮
  handleSubmit = (fields) => {
    const { actionType } = this.state;
    const { menuSysData } = this.props;
    fields.operateType = "1";
    if (actionType === 'A') { // 新增
      this.addRoles(fields);
    } else {
      this.editRoles({ ...fields, rolesId: menuSysData.rolesId });
    }
  }

  // 新增菜单
  addRoles = (fields) => {
    this.formToSubmit('roleModel/addRoles', fields);
  }

  // 编辑菜单
  editRoles = (fields) => {
    this.formToSubmit('roleModel/editRoles', fields);
  }

  // 编辑、新增功能提取，form 表单提交
  formToSubmit = (api, params) => {
    const { dispatch } = this.props;
    const { actionTypeName } = this.state;
    dispatch({
      type: api,
      payload: params,
    }).then(result => {
      if (result && result.errCode === "0") {
        message.success(`${actionTypeName}成功`);
        const { handleModalVisible } = this.props;
        handleModalVisible();
      } else {
        message.error(`${actionTypeName}失败`);
      }
    });
  }

  // 校验角色名称的唯一性
  rolesNameValidator = (rule, value, callback) => {
    const { checkName, actionType } = this.state;
    if (!this.trim(value) || (checkName && actionType === 'M' && this.trim(value) === checkName)) {
      callback();
      return;
    }
    const params = {
      rolesName: value,
      state: "00A",
    };
    this.checkMethod('roleModel/checkRoleName', params, callback, '角色名称已存在！');
  }

  // 校验抽取的方法
  checkMethod = (api, params, callback, info) => {
    const { dispatch } = this.props;
    dispatch({
      type: api,
      payload: params,
    }).then(result => {
      if (!result) return;
      const { code } = result.data;
      if (code && code > 0) {
        callback(info);
      }
      callback();
    });
  }

  // modal 确定
  okHandle = () => {
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.handleSubmit(fieldsValue);
    });
  };

  // 判断字符串是否为空
  trim = (str) => {
    if (!str) return;
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }

  render() {
    const { disableFlag, loading, actionTypeName } = this.state;
    const { form, handleModalCancel, thisTime, menuSysData } = this.props;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 5 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 15 } },
    };

    return (
      <Modal
        title={actionTypeName}
        visible
        destroyOnClose
        onOk={this.okHandle}
        onCancel={() => handleModalCancel()}
        confirmLoading={loading}
        {...thisTime} // 使用 thisTime 控制按钮是否显示，footer 设为 null。同时，也区别查看和修改。
      >
        <Form>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label="角色名称"
            help={form.isFieldValidating('rolesName') ? '检查中...' : (form.getFieldError('rolesName') || []).join(', ')}
          >
            {form.getFieldDecorator('rolesName', {
              initialValue: menuSysData.rolesName,
              validateTrigger: ['onBlur'],
              rules: [{ required: true, message: '角色名称不能为空' },
              { whitespace: true, message: '请输入非空白内容' },
              { type: 'string', max: 30, message: '角色名称过长' },
              { validator: this.rolesNameValidator }],
            })(
              <Input placeholder="请输入角色名称" disabled={disableFlag} />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            hasFeedback
            label="角色描述"
          >
            {form.getFieldDecorator('comments', {
              initialValue: menuSysData.comments,
              rules: [{ required: true, message: '角色描述不能为空' },
              { whitespace: true, message: '请输入非空白内容' },
              { type: 'string', max: 255, message: '角色描述过长' }],
            })(
              <Input placeholder="请输入角色描述" disabled={disableFlag} />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default connect()(PrivilegeForm);
