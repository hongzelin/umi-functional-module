/*
 * @Author: lin.zehong 
 * @Date: 2018-12-02 15:52:07 
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-19 14:06:47
 * @Desc: 在线摄像头--头部搜索
 */

import React from 'react';
import { connect } from 'dva';
import { Select, Radio, Modal, Form, Input } from 'antd';
import styles from './TreeModal.less';

const { Option } = Select;
const FormItem = Form.Item;

class TreeModal extends React.Component {

  state = {
    selValue: 10,
    time: '10',
    activeStyle: true,
  }

  componentDidMount = () => {
    const { time } = this.state;
    const formatTime = this.formatTime(time);
    this.setState({ time: formatTime });
  }

  handleRadio = (event) => {
    const { value } = event.target;
    const formatTime = this.formatTime(value);
    this.setState({ selValue: value, time: formatTime, activeStyle: true });
  }

  handleSel = (value) => {
    const formatTime = this.formatTime(value);
    this.setState({ selValue: value, time: formatTime, activeStyle: false });
  }

  formatTime = (value) => {
    const { cameraNum } = this.props;
    const minute = Math.floor((value * cameraNum) / 60);
    const second = Math.floor((value * cameraNum) % 60);
    let time = 0;
    if (minute > 0) {
      time = `${minute}分钟${second}秒`
    } else {
      time = `${second}秒`
    }
    return time;
  }

  handleOk = () => {
    const { menuKey, form, handleInspection } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        if (menuKey === "1") {
          const { selValue } = this.state;
          this.handleCancel();
          handleInspection(selValue);
        } else if (menuKey === "2") {
          this.onRename(values.rename);
        } else if (menuKey === "3" || menuKey === "4") {
          this.onAddDirectory(values.directoryName);
        }
      }
    });
  }

  // 添加同级或者子集目录
  onRename = (name) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'onlineCamera/collectUpdateEff',
      payload: { name },
    })
  }

  // 添加同级或者子集目录
  onAddDirectory = (directoryName) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'onlineCamera/collectCreateEff',
      payload: { directoryName },
    })
  }

  handleCancel = () => {
    const { dispatch, hideTreeRight } = this.props;
    dispatch({ type: 'onlineCamera/hideModal' })
    hideTreeRight();
  }

  render() {
    const { cameraNum, form, menuKey, modalTitle, visible } = this.props;
    const { time, activeStyle } = this.state;
    // 自动巡查
    const autoInspection = (
      <div className={styles.content}>
        <div className={styles.topWrap}>
          <span className={styles.numWrap}>
            摄像头数量：共
            <span className={styles.num}>{cameraNum}</span>
            个
          </span>
          <span className={styles.timeWrap}>
            巡查一轮大概需要：
            <span className={styles.time}>{time}</span>
          </span>
        </div>
        <div className={styles.botWrap}>
          <span>间隔时间：</span>
          <div className={styles.tabGroup}>
            <Radio.Group defaultValue={10} className={activeStyle ? styles.none : styles.grp} onChange={(value) => this.handleRadio(value)}>
              <Radio.Button value={10}>10s</Radio.Button>
              <Radio.Button value={15}>15s</Radio.Button>
              <Radio.Button value={20}>20s</Radio.Button>
            </Radio.Group>
            <Select placeholder="请选择" className={styles.slt} style={{ width: 90 }} onChange={(value) => this.handleSel(value)}>
              <Option value={25}>25s</Option>
              <Option value={30}>30s</Option>
              <Option value={35}>35s</Option>
              <Option value={40}>40s</Option>
              <Option value={45}>45s</Option>
              <Option value={50}>50s</Option>
              <Option value={55}>55s</Option>
              <Option value={60}>60s</Option>
            </Select>
          </div>
        </div>
      </div>
    );

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    // 重命名
    const rename = (
      <div className={styles.content}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="重命名为："
          >
            {form.getFieldDecorator('rename', {
              rules: [],
            })(
              <Input placeholder="请输入" />
            )}
          </FormItem>
        </Form>
      </div>
    );

    // 添加同级目录
    const addPeerDirectory = (
      <div className={styles.content}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="目录名称为："
          >
            {form.getFieldDecorator('directoryName', {
              rules: [],
            })(
              <Input placeholder="请输入" />
            )}
          </FormItem>
        </Form>
      </div>
    );

    // 添加子目录
    const addChildDirectory = (
      <div className={styles.content}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="目录名称为："
          >
            {form.getFieldDecorator('directoryName', {
              rules: [],
            })(
              <Input placeholder="请输入" />
            )}
          </FormItem>
        </Form>
      </div>
    );

    const content =
      menuKey === '1' ? autoInspection :
        menuKey === '2' ? rename :
          menuKey === '3' ? addPeerDirectory : addChildDirectory;

    return (
      <Modal
        destroyOnClose
        title={modalTitle}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        className={styles.root}
        width={400}
      >
        {content}
      </Modal>
    );
  }
}

function mapStateToProps({ onlineCamera }) {
  return {
    favorites: onlineCamera.favorites,
    cameraNum: onlineCamera.cameraNum,
  };
}

export default connect(mapStateToProps)(Form.create()(TreeModal));
