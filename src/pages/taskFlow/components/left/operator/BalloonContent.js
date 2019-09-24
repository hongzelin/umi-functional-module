/*
 * @Author: lin.zehong
 * @Date: 2019-03-29 16:14:27
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-06-27 11:21:40
 * @Desc: 筛选气泡弹出内容
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'antd'
import Stdio from './Stdio'
import Styles from './Operator.less'

class BalloonContent extends React.Component {
  cancel = () => {
    const { handleVisible } = this.props;
    handleVisible(false);
  }

  sure = (flag) => {
    const { form, handleList } = this.props;
    if (flag) {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        handleList({ stdioKey: `${fieldsValue.stdioInput}:${fieldsValue.stdioOutput}` })
        this.cancel();
      });
    } else {
      handleList();
      this.cancel();
    }
  }

  render() {
    const { form } = this.props;
    return (
      <div>
        <Form
          size='medium'
          className={Styles.wrapForm}
        >
          <Stdio
            form={form}
            data={{}}
            isUpgrade={false}
          />
        </Form>
        <div className={Styles.balloon_footer}>
          <Button
            size="small"
            className={Styles.btn}
            onClick={() => this.sure(false)}
          >
            清空
          </Button>
          <Button
            size="small"
            className={Styles.btn}
            onClick={this.cancel}
          >
            取消
          </Button>
          <Button
            type="primary"
            size="small"
            className={Styles.btn}
            onClick={this.sure}
          >
            确定
          </Button>
        </div>
      </div>
    )
  }
}

BalloonContent.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  handleVisible: PropTypes.func,
  handleList: PropTypes.func,
}

BalloonContent.defaultProps = {
  form: {},
  handleVisible: () => { },
  handleList: () => { },
}

export default Form.create()(BalloonContent)
