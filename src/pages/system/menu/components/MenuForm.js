/*
 * @Author: lin.zehong chunxiong
 * @Date: 2018-07-26 15:46:25
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-31 12:32:54
 * @Desc: 菜单弹出表单
 */

import React, { PureComponent } from 'react';
import { connect } from "dva";
import { Form, Input, InputNumber, Modal, message, Select } from 'antd';
import ParentTreeSelect from '../../common/ParentTreeSelect';

const FormItem = Form.Item;
const { Option } = Select;
const actionTypeMap = {
  'A': '新增菜单',
  'M': '修改菜单',
  'V': '查看菜单',
};

@Form.create({})
class MenuForm extends PureComponent {

  state = {
    actionType: 'A',
    actionTypeName: actionTypeMap.A,
    disableFlag: false,
    loading: false,
    checkName: '',
    checkUrl: '',
    parentMenuLabel: '',
    parentMenuValue: '',
  }

  componentDidMount() {
    this.init();
  }

  // 初始化
  init = () => {
    const { menuSysData, thisTime } = this.props;
    this.setActionType();
    if (menuSysData && menuSysData.menuId) { // 先判断是否为新增
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
      actionTypeName: '修改菜单',
      disableFlag: false,
      checkName: menuSysData.menuName,
      checkUrl: menuSysData.menuUrl,
    });
  }

  // 详情状态
  detailState = () => {
    this.setState({
      actionType: 'V',
      actionTypeName: '查看菜单',
      disableFlag: true,
    });
  }

  // 新增状态
  addState = () => {
    this.setState({
      actionType: 'A',
      actionTypeName: '新增菜单',
      disableFlag: false,
    });
  }

  // 处理上级菜单
  handleParentMenu = (menuSysData) => {
    if (menuSysData.parentMenuId && (menuSysData.parentMenuId === -1 || menuSysData.parentMenuId === "-1")) {
      this.setState({ parentMenuLabel: '根菜单', parentMenuValue: '-1' });
    } else {
      this.setState({ parentMenuLabel: menuSysData.parentMenuName, parentMenuValue: `${menuSysData.parentMenuId}` });
      // 这里其实上级菜单名称已经有了，不需要查询菜单详情
      /* const params = { menuId: menuSysData.menuId };
      const { dispatch } = this.props;
      dispatch({
        type: 'menuModel/DetailMenu',
        payload: params,
      }).then(result => {
        if (result && result.errCode === '0') {
          const { data } = result;
          const label = data.parentMenuName;
          const value = `${data.parentMenuId}`;
          this.setState({ parentMenuLabel: label, parentMenuValue: value });
        } else {
          message.error(result.message);
        }
      }); */
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
      form.setFieldsValue({ 'menuLevel': level });
    }
  }

  // 提交按钮
  handleSubmit = (fields) => {
    const { actionType } = this.state;
    const { menuSysData } = this.props;
    const pId = fields.parentMenuId.value;
    fields.parentMenuId = pId;
    fields.menuLevel = fields.menuLevel ? `${fields.menuLevel}` : '-1';
    if (actionType === 'A') { // 新增
      this.addMenu(fields);
    } else {
      this.EditMenu({ ...fields, menuId: menuSysData.menuId });
    }
  }

  // 新增菜单
  addMenu = (fields) => {
    this.formToSubmit('menuModel/AddMenu', fields);
  }

  // 编辑菜单
  EditMenu = (fields) => {
    this.formToSubmit('menuModel/EditMenu', fields);
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
    this.checkMethod('menuModel/checkMenuName', params, callback, '系统名称已存在！');
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
    this.checkMethod('menuModel/checkMenuUrl', params, callback, '菜单路径已存在！');
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
    const { disableFlag, loading, actionTypeName, parentMenuLabel, parentMenuValue } = this.state;
    const { form, handleModalCancel, menuSysData, thisTime } = this.props;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 8 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 15 } },
    };
    const colums = {
      title: 'menuName',
      key: 'menuId',
      level: 'menuLevel',
      value: 'menuId',
      isLeaf: 'isLeaf',
      isSpecialTitle: true,
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
            label="菜单名称"
          >
            {form.getFieldDecorator('menuName', {
              rules: [
                { required: true, message: '菜单名称不能为空' },
                { type: 'string', max: 30, message: '菜单名称过长' },
                // 由于这个系统有多个角色，每个角色还有相同的菜单，所以，暂时把是否重复菜单名称检验去掉
                { validator: this.handleCheckName },
                { whitespace: true, message: '请输入非空白内容' },
              ],
              initialValue: menuSysData.menuName,
            })(
              <Input disabled={disableFlag} />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="上级菜单"
          >
            {form.getFieldDecorator('parentMenuId', {
              rules: [{ required: true, message: '请选择上级菜单' }],
              initialValue: {
                'label': parentMenuLabel,
                'value': parentMenuValue,
              },
            })(
              <ParentTreeSelect
                initTitle="根菜单"
                method="menuModel/qryParMenuInfo"
                paramKey="parentMenuId"
                colums={colums}
                onChange={this.parentSysOnChange}
                disabled={disableFlag}
              />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="菜单层级"
          >
            {form.getFieldDecorator('menuLevel', {
              initialValue: menuSysData.menuLevel,
              rules: [{ required: true, message: '请先选择上级菜单' }],
            })(
              <Select disabled>
                <Option value={1}>一级菜单</Option>
                <Option value={2}>二级菜单</Option>
                <Option value={3}>三级菜单</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="菜单路径"
          >
            {form.getFieldDecorator('menuUrl', {
              rules: [
                { required: true, message: '菜单路径' },
                { type: 'string', max: 70, message: '菜单路径过长' },
                { validator: this.handleCheckUrl },
                { whitespace: true, message: '请输入非空白内容' },
              ],
              initialValue: menuSysData.menuUrl,
            })(
              <Input placeholder="请输入菜单路径" disabled={disableFlag} />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="菜单图标"
          >
            {form.getFieldDecorator('menuIcon', {
              rules: [
                { required: false, message: '菜单图标' },
                { whitespace: true, message: '请输入非空白内容' },
              ],
              initialValue: menuSysData.menuIcon,
            })(
              <Input placeholder="请输入菜单图标" disabled={disableFlag} />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="同级菜单排序"
          >
            {form.getFieldDecorator('orderId', {
              rules: [{ required: true, message: '请输入同级菜单排序' }],
              initialValue: menuSysData.orderId,
            })(
              <InputNumber
                min={1}
                max={100}
                formatter={value => value}
                parser={value => parseInt(value, 10) || ''}
                disabled={disableFlag}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default connect()(MenuForm);
