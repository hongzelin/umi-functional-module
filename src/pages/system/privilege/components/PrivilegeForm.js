/*
 * @Author: lin.zehong chunxiong
 * @Date: 2018-07-26 15:46:25
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-01-05 22:03:01
 * @Desc: 权限弹出表单
 */

import React, { PureComponent } from 'react';
import { connect } from "dva";
import { Form, Input, Modal, message, Select } from 'antd';
import ParentTreeSelect from '../../common/ParentTreeSelect';

const FormItem = Form.Item;
// const { Option } = Select;
const actionTypeMap = {
  'A': '新增权限',
  'M': '修改权限',
  'V': '查看权限',
};

@Form.create({})
class PrivilegeForm extends PureComponent {

  state = {
    actionType: 'A',
    actionTypeName: actionTypeMap.A,
    disableFlag: false,
    loading: false,
    checkName: '',
    checkUrl: '',
    parentLabel: '',
    parentValue: '',
  }

  componentDidMount() {
    this.init();
  }

  // 初始化
  init = () => {
    const { menuSysData, thisTime } = this.props;
    this.setActionType();
    if (menuSysData && menuSysData.privId) { // 先判断是否为新增
      if (thisTime === '') { // 再根据thisTime判断查看还是修改
        this.editState(menuSysData);
      } else {
        this.detailState();
      }
      this.handleParentMenu(menuSysData);
    } else {
      this.addState();
    }
  }

  // 编辑状态
  editState = (menuSysData) => {
    this.setState({
      actionType: 'M',
      actionTypeName: '修改权限',
      disableFlag: false,
      checkName: menuSysData.menuName,
      checkUrl: menuSysData.menuUrl,
    });
  }

  // 详情状态
  detailState = () => {
    this.setState({
      actionType: 'V',
      actionTypeName: '查看权限',
      disableFlag: true,
    });
  }

  // 新增状态
  addState = () => {
    this.setState({
      actionType: 'A',
      actionTypeName: '新增权限',
      disableFlag: false,
    });
  }

  // 处理上级菜单
  handleParentMenu = (menuSysData) => {
    if (menuSysData.parentPrivId && (menuSysData.parentPrivId === -1 || menuSysData.parentPrivId === "-1")) {
      this.setState({ parentLabel: '根权限', parentValue: '-1' });
    } else {
      this.setState({ parentLabel: menuSysData.parentPrivname, parentValue: `${menuSysData.parentPrivId}` });
    }
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

  // 上级菜单改变时，更改层级
  parentSysOnChange = (value, label, extra) => {
    const { form } = this.props;
    if (value) {
      const level = extra.triggerNode.props.level + 1;
      form.setFieldsValue({ 'privLevel': level });
    }
  }

  // 提交按钮
  handleSubmit = (fields) => {
    const { actionType } = this.state;
    const { menuSysData } = this.props;
    const pId = fields.parentPrivId.value;
    fields.parentPrivId = pId;
    fields.privLevel = fields.privLevel ? `${fields.privLevel}` : '-1';
    if (actionType === 'A') { // 新增
      this.addPrivilege(fields);
    } else {
      this.EditPrivilege({ ...fields, privId: menuSysData.privId });
    }
  }

  // 新增菜单
  addPrivilege = (fields) => {
    this.formToSubmit('privilegeModel/addPrivileges', fields);
  }

  // 编辑菜单
  EditPrivilege = (fields) => {
    this.formToSubmit('privilegeModel/editPrivileges', fields);
  }

  // 编辑、新增功能提取，form表单提交
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

  // 校验系统菜单的唯一性
  handleCheckName = (rule, value, callback) => {
    const { checkName, actionType } = this.state;
    if (!this.trim(value) || (checkName && actionType === 'M' && this.trim(value) === checkName)) {
      callback();
      return;
    }
    const params = {
      menuName: value,
      state: "00A",
    };
    this.checkMethod('privilegeModel/checkMenuName', params, callback, '系统名称已存在！');
  }

  // 校验系统菜单路径
  handleCheckUrl = (rule, value, callback) => {
    const { checkUrl, actionType } = this.state;
    if (!this.trim(value) || (checkUrl && actionType === 'M' && this.trim(value) === checkUrl)) {
      callback();
      return;
    }
    const params = {
      menuUrl: value,
      state: "00A",
    };
    this.checkMethod('privilegeModel/checkMenuUrl', params, callback, '菜单路径已存在！');
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
    const { disableFlag, loading, actionTypeName, parentLabel, parentValue } = this.state;
    const { form, handleModalCancel, menuSysData, thisTime } = this.props;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 8 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 15 } },
    };
    const colums = {
      title: 'privName',
      key: 'privId',
      level: 'privLevel',
      value: 'privId',
      isLeaf: 'isLeaf',
    };

    return (
      <Modal
        title={actionTypeName}
        visible
        destroyOnClose
        onOk={this.okHandle}
        onCancel={() => handleModalCancel()}
        confirmLoading={loading}
        {...thisTime} // 使用thisTime控制按钮是否显示，footer 设为 null。同时，也区别查看和修改。
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="权限名称"
          >
            {form.getFieldDecorator('privName', {
              rules: [
                { required: true, message: '权限名称不能为空' },
                { type: 'string', max: 30, message: '权限名称过长' },
                { whitespace: true, message: '请输入非空白内容' },
                // { validator: this.handleCheckName },
              ],
              initialValue: menuSysData.privName,
            })(
              <Input disabled={disableFlag} />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="上级权限"
          >
            {form.getFieldDecorator('parentPrivId', {
              rules: [{ required: true, message: '请选择上级权限' }],
              initialValue: {
                'label': parentLabel,
                'value': parentValue,
              },
            })(
              <ParentTreeSelect
                initTitle="根权限"
                method="privilegeModel/qryPrivilegesByParent"
                paramKey="parentPrivId"
                colums={colums}
                placeholder="请选择上级权限"
                onChange={this.parentSysOnChange}
                disabled={disableFlag}
              />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="权限层级"
          >
            {form.getFieldDecorator('privLevel', {
              initialValue:
                (menuSysData && menuSysData.privLevel) ? menuSysData.privLevel : '',
              rules: [{ required: true, message: '请选择权限层级' }],
            })(
              <Select disabled />
            )}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}

export default connect()(PrivilegeForm);
