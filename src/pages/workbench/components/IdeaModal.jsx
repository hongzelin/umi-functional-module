/*
 * @Author: lin.zehong
 * @Date: 2019-08-07 11:28:12
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-19 18:55:42
 * @Desc: 個人工作台--审批意见 / 审批 modal
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Modal, Radio, Input, Message, Form } from 'antd';
import styles from './IdeaModal.less';

const { TextArea } = Input;
const options = [
  { label: '通過', value: 1 },
  { label: '不通過', value: 0 },
];

class IdeaModal extends Component {
  state = {
    radioVal: null,
    textVal: null,
  }

  componentDidMount() {
    const { record } = this.props;
    const { stateAndResult } = record || {};
    this.setState({ radioVal: stateAndResult === "審批不通過" ? 0 : 1 });
  }

  // 審批結果
  onRadio = (e) => {
    this.setState({ radioVal: e.target.value });
  }

  // 審批意見
  onText = (e) => {
    this.setState({ textVal: e.target.value });
  }

  handleOk = () => {
    const { radioVal, textVal } = this.state;
    const { type, onSure } = this.props;
    if (type === "審批") {
      if (radioVal === null) {
        Message.warning("請選擇審批結果");
        return;
      }
      if (!textVal) {
        Message.warning("請輸入審批意見");
        return;
      }
      if (textVal.length > 500) {
        return;
      }
      onSure(radioVal, textVal);
    }
    this.handleCancel();
  };

  handleCancel = () => {
    const { handleVisible } = this.props;
    handleVisible(false);
  };

  render() {
    const { title, record, type, form } = this.props;
    const { approvalCode, stateAndResult, approvalOpinion } = record || {};
    const { getFieldDecorator} = form;

    return (
      <div className={styles.root}>
        <Modal
          title={`${approvalCode || title}-審批意見`}
          visible
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className={styles.IdeaModal}>
            <p className={styles.field}>
              <span className={styles.label}>審批結果：</span>
              <Radio.Group
                options={options}
                defaultValue={stateAndResult === "審批不通過" ? 0 : 1}
                disabled={type === "審批意見"}
                onChange={this.onRadio}
              />
            </p>
            <p className={styles.field}>
              <span className={styles.label}>審批意見：</span>
              {
                type === "審批意見" ?
                  <span className={styles.value}>{approvalOpinion || '-'}</span>
                  :
                  (
                    <Form.Item>
                      {getFieldDecorator('textArea', {
                        rules: [{ max: 500, message: '最大長度為500' }],
                      })(
                        <TextArea
                          placeholder="請輸入審批意見"
                          rows={4}
                          className={styles.textarea}
                          onChange={this.onText}
                        />
                      )}
                    </Form.Item>
                  )
              }
            </p>
          </div>
        </Modal>
      </div>
    );
  }
}

IdeaModal.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  record: PropTypes.objectOf(PropTypes.any),
}

IdeaModal.defaultProps = {
  title: '標題',
  type: '審批', // 審批 / 審批意見
  record: {},
}

export default  Form.create({})(IdeaModal);
