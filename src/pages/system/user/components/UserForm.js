/*
 * @Author: lin.zehong
 * @Date: 2019-05-04 15:16:36
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-05-05 17:20:26
 * @Desc: 用户表单
 */
import React, { PureComponent } from 'react';
import { connect } from "dva";
import { Row, Col, Form, Input, Modal, message, Transfer } from 'antd';
import StaticSelect from '../../../../components/static/StaticSelect';
// import SysUserMgService from '../../../services/system/SysUserMgService';
// import SysRoleMgService from '../../../services/system/RoleMgService';
// import CheckRule from '../../../common/checkRule';
// import Degugger from '../../../common/debugger';

const FormItem = Form.Item;

const actionTypeMap = {
  'A': '新增账号',
  'M': '修改账号',
  'V': '查看账号',
};

@Form.create()
class UserForm extends PureComponent {
  state = {
    disableFlag: false,
    // loading: false,
    actionType: 'A',
    actionTypeName: actionTypeMap.A,
    submitting: false,    // 表单提交状态
    roleTargetKeys: [],   // 角色已选择项（当前最新）
    // roleTargetKeysInitData: [], // 角色已选择项
    roleList: [],         // 角色可选列表
    // picture: '0',
    previewImage: '',
    previewVisible: false,
    // fileList: [],
    account: false,
    // rolesId: ''
  }

  componentDidMount() {
    const { form } = this.props;
    form.resetFields();
    this.qryRolesTransfer();
  }

  // 获取初始数据， 调用两个接口，一个是获取所有角色列表，一个获取挂关联的角色
  qryRolesTransfer = () => {
    const { form, dispatch } = this.props;
    const userId = form.getFieldValue("userId");
    const params = {
      pageNum: '1',
      pageSize: '50',
      useState: '10301',
      userId,
    };
    dispatch({
      type: 'userModel/qryRolesTransfer',
      payload: params,
    }).then(({ dataSource, targetkeys }) => {
      this.setState({
        roleList: dataSource,
        roleTargetKeys: targetkeys,
      })
    })
  }
  /*
    componentWillReceiveProps(props) {
      // 每次打开窗口，重新获取关联数据
      const { modalVisible } = this.props;
      if (props.modalVisible && props.modalVisible !== modalVisible) {
        this.initRelatedData();
      }
    }
   */

  // 设置动作类型
  setActionType = () => {
    const { userData } = this.props;
    let action = 'A';
    if (userData && userData.actionType) {
      action = userData.actionType;
    }
    this.setState({
      actionType: action,
      actionTypeName: actionTypeMap[action],
    });
    if (action === 'V') {
      this.setState({
        footer: null,
        disableFlag: true,
        account: true,
        // picture: '0',
      });
    } else if (action === 'M') {
      this.setState({
        footer: undefined,
        disableFlag: false,
        account: true,
      });
    } else {
      this.setState({
        footer: undefined,
        disableFlag: false,
        account: false,
      });
    }
  }

  // 用户账号校验
  usercodeValidator = (rule, value, callback) => {
    const { userData, dispatch } = this.props;
    if (!value) {
      callback('内容不能为空');
      return;
    }
    const reg = /[\u4E00-\u9FA5]{1,4}/;   // 定义验证表达式
    if (reg.test(value)) { // 进行验证
      callback('账号不能为中文');
      return;
    }
    if (userData.userCode === value) {
      callback();
    }
    else {
      const params = {
        userCode: `${value}`,  // 查一下有没有这个编码
        useState: '10301',
      };
      dispatch({
        type: "userModel/checkUserCode",
        payload: params,
      }).then(({ data = {} }) => {
        if (data.code === '0') {
          callback();
        } else {
          callback('该账号已存在');
        }
      })
    }
  }

  // 角色穿梭框选项在两栏之间转移时的回调函数
  handleTransferChange = (nextTargetKeys) => {
    this.setState({ roleTargetKeys: nextTargetKeys });
  }

  // 弹出框确定按钮回调函数
  okHandle = () => {
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.handleSubmit(fieldsValue);
    });
  };  

  // 提交按钮
  handleSubmit = (fields) => {
    const { actionTypeName, actionType, roleTargetKeys } = this.state;
    const { handleModalVisible, userData } = this.props;
    // 判断穿梭框是否有值
    if (roleTargetKeys.length === 0) {
      return message.warning('请选择角色到右边');
    }
    if (actionType === 'A') {
      this.addUser(fields); // 新增
    } else {
      this.editUser({ ...fields, userId: userData.userId }); // 编辑
    }
    // 提交中
    // this.setState({ 'submitting': true });
    // promise.then(result => {
    //   this.setState({ 'submitting': false });
    //   if (!result) return;
    //   const success = result.code;
    //   const remark = result.message;
    //   if (success !== '0') {
    //     message.error(remark);
    //   } else {
    //     message.success(`${actionTypeName}成功`);
    //     handleModalVisible(false, true); // 隐藏弹出框
    //   }
    // });
  }

  addUser = (params) => {
    const { dispatch, handleModalVisible } = this.props;
    dispatch({
      type: 'userModel/addUser',
      payload: params,
    }).then(({ errCode }) => {
      if (errCode === "0") {
        message.success("新增成功");
        handleModalVisible();
      } else {
        message.error("新增失败");
      }
    })
  }

  editUser = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userModel/editUser',
      payload: params,
    });
  }

  render() {
    const { form, handleModalCancel } = this.props;
    const { disableFlag, previewVisible, previewImage,
      account, actionTypeName, footer, submitting, actionType,
      roleList, roleTargetKeys, roleSelectedKeys,
    } = this.state;

    this.setActionType();
    const checkMobileno = (rule, value, callback) => {
      if (/^1[3|4|5|7|8][0-9]{9}$/.test(value) || !value) callback();
      callback('手机号码输入格式不正确');
    };
    return (
      <div>
        <Modal
          width="650px"
          title={actionTypeName}
          visible
          destroyOnClose
          footer={footer}
          onOk={this.okHandle}
          confirmLoading={submitting}
          onCancel={() => handleModalCancel()}
        >
          <div className="table-container" style={{ background: '#fff' }}>
            <Form>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={12} sm={24}>
                  {/* --工号-- */}
                  <FormItem
                    hasFeedback={!disableFlag}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    label="账号"
                  >
                    {form.getFieldDecorator('userCode', {
                      initialValue: '',
                      rules: [
                        { required: !disableFlag, validator: this.usercodeValidator },
                        { type: 'string', max: 30, message: '账号过长' },
                        { whitespace: true, message: '内容不能为空' },
                      ],
                    })(
                      <Input placeholder="请输入账号" disabled={account} maxLength="30" autoComplete="off" />)}
                  </FormItem>
                  <FormItem
                    hasFeedback={!disableFlag}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    label={actionType === 'M' ? '新密码' : "密码"}
                  >
                    {form.getFieldDecorator('password', {
                      initialValue: "",
                      rules: [
                        {
                          required: actionType === 'M' ? false : !disableFlag,
                          message: '密码不能为空',
                        },
                        { whitespace: true, message: '内容不能为空' },
                      // { validator: CheckRule.handlePassWordCheck }
                      ],
                    })(
                      <Input
                        type="password"
                        placeholder={actionType === 'M' ? '需修改时可填写' : "请输入密码"}
                        disabled={disableFlag}
                        minLength="8"
                        autoComplete="off"
                      />)}
                  </FormItem>
                  {/* --用户名称-- */}
                  <FormItem
                    hasFeedback={!disableFlag}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    label="用户名称"
                  >
                    {form.getFieldDecorator('userName', {
                      rules: [
                        { required: !disableFlag, message: '用户名称不能为空' },
                        { type: 'string', max: 30, message: '用户名称过长' },
                        { whitespace: true, message: '内容不能为空' },
                      ],
                    })(<Input placeholder="请输入用户名称" disabled={disableFlag} />)}
                  </FormItem>
                </Col>
                <Col md={12} sm={24}>
                  {/* --用户昵称-- */}
                  <FormItem
                    hasFeedback={!disableFlag}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    label="用户昵称"
                  >
                    {form.getFieldDecorator('nickName', {
                      rules: [
                        { required: !disableFlag, message: '用户昵称不能为空' },
                        { type: 'string', max: 30, message: '用户昵称过长' },
                        { whitespace: true, message: '内容不能为空' },
                      ],
                    })(<Input placeholder="请输入用户昵称" disabled={disableFlag} />)}
                  </FormItem>
                </Col>
                <Col md={12} sm={24}>
                  {/* --用户类型-- */}
                  <FormItem
                    hasFeedback={!disableFlag}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    label="用户类型"
                  >
                    {form.getFieldDecorator('userType', {
                      rules: [
                        { required: !disableFlag, message: '用户类型不能为空' },
                      ],
                    })(
                      <StaticSelect code="userType" disabled={account} allowClear />
                    )}
                  </FormItem>
                </Col>
                <Col md={12} sm={24}>
                  {/* --邮箱-- */}
                  <FormItem
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    label="邮箱"
                  >
                    {form.getFieldDecorator('email', {
                      rules: [
                        { type: 'email', message: '邮箱格式不正确' },
                        { type: 'string', max: 48, message: '邮箱过长' },
                      ],
                    })(<Input placeholder="请输入邮箱" disabled={disableFlag} />)}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={12} sm={24}>
                  {/* --备注-- */}
                  <FormItem
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    label="备注"
                  >
                    {form.getFieldDecorator('comments', {
                      rules: [
                        { type: 'string', max: 250, message: '备注过长' },
                      ],
                    })(<Input placeholder="备注" disabled={disableFlag} />)}
                  </FormItem>
                </Col>
                <Col md={12} sm={24}>
                  {/* --手机-- */}
                  <FormItem
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    label="手机"
                  >
                    {form.getFieldDecorator('mobileNo', {
                      rules: [{ validator: checkMobileno },
                      ],
                    })(
                      <Input placeholder="请输入手机号" disabled={disableFlag} />
                    )}
                  </FormItem>
                </Col>
              </Row>

              {/* --用户角色关联管理-- */}
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={24} sm={24}>
                  <Row>
                    <FormItem
                      style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      {form.getFieldDecorator('roleTargetKeys')(
                        <Transfer
                          disabled={disableFlag}
                          dataSource={roleList}
                          rowKey={row => row.rolesId}
                          titles={['可选角色', '已选角色']}
                          targetKeys={roleTargetKeys}
                          selectedKeys={roleSelectedKeys}
                          onChange={this.handleTransferChange}
                          render={item => ({ label: item.rolesName, value: item.rolesId })}
                        />
                      )}
                    </FormItem>
                  </Row>
                </Col>
              </Row>

            </Form>
          </div>
        </Modal>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="产品图标" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }

}

export default connect()(UserForm);