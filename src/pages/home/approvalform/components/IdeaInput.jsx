import React, { Component } from 'react';
import { Input, Radio, Form } from 'antd';
import { Title } from 'components/Mattersform';
import { ADMIN } from '../../../workbench/constants'
import styles from './IdeaInput.less';

const { TextArea } = Input;
const options = [
  { label: '通過', value: 1 },
  { label: '不通過', value: 0 },
];

class IdeaInput extends Component {
  // 審批結果
  onRadio = (e) => {
    const { handleRadio } = this.props;
    handleRadio(e.target.value);
  }

  // 審批意見
  onText = (e) => {
    const { handleText } = this.props;
    handleText(e.target.value);
  }

  render() {
    const { title, role, form } = this.props;
    const { getFieldDecorator} = form;
    return (
      <div className={styles.root}>
        <Title title={title} />
        <div className={styles.ideaIpt}>
          <span className={styles.label}>審批結果：</span>
          <Radio.Group options={options} disabled={role === ADMIN} onChange={this.onRadio} />
        </div>
        <div className={styles.ideaIpt}>
          <span className={styles.label}>審批意見：</span>
          <Form.Item>
            {getFieldDecorator('textArea', {
              rules: [{ max: 500, message: '最大長度為500' }],
            })(
              <TextArea
                placeholder="請輸入審批意見"
                rows={4}
                className={styles.textarea}
                disabled={role === ADMIN}
                onChange={this.onText}
              />
            )}
          </Form.Item>
        </div>
      </div>
    );
  }
}

export default  Form.create({})(IdeaInput);
