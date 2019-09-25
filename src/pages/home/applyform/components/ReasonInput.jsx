import React, { Component } from 'react';
import { Input, Form } from 'antd';
import { Title } from 'components/Mattersform';
import styles from './ReasonInput.less';

const { TextArea } = Input;

class Reason extends Component {
  // 申請理由
  onText = (e) => {
    const { handleText } = this.props;
    handleText(e.target.value);
  }

  render() {
    const { title, form } = this.props;
    const { getFieldDecorator} = form;

    return (
      <div className={styles.root}>
        <Title title={title} />
        <div className={styles.reason}>
          <span className={styles.label}>申請理由：</span>
          <Form.Item>
            {getFieldDecorator('textArea', {
              rules: [{ max: 500, message: '最大長度為500' }],
            })(
              <TextArea
                placeholder="請輸入申請理由"
                rows={4}
                className={styles.textarea}
                onChange={this.onText}
              />
            )}
          </Form.Item>
        </div>
      </div>
    );
  }
}

export default  Form.create({})(Reason);
