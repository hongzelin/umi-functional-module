/*
 * @Author: lin.zehong
 * @Date: 2019-08-07 11:29:26
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-14 16:22:51
 * @Desc: 個人工作台--审批单/申請單，头部按钮切换和搜索框
 */
import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Radio, Input, Form } from 'antd';
import styles from './RadioSearch.less';

const { Search } = Input;

class RadioSearch extends Component {

  onChange = (e) => {
    const { onChange } = this.props;
    onChange(e);
    const { form } = this.props;
    form.resetFields();
  }

  render() {
    const { placeholder, status, onSearch, form, countData = {} } = this.props;
    const { getFieldDecorator } = form;
    const { hasBeenApprovaledSum, canceledSum, toBeApprovaledSum } = countData;

    return (
      <div className={styles.root}>
        {
          status === "審批單" ?
            (
              <Radio.Group defaultValue="待審批" onChange={this.onChange}>
                <Radio.Button value="待審批">
                  待審批(
                  { toBeApprovaledSum || 0 }
                  )
                </Radio.Button>
                <Radio.Button value="已審批">
                  已審批(
                  {hasBeenApprovaledSum || 0}
                  )
                </Radio.Button>
              </Radio.Group>
            )
            :
            (
              <Radio.Group defaultValue="待審批" onChange={this.onChange}>
                <Radio.Button value="待審批">
                  待審批(
                  { toBeApprovaledSum || 0 }
                  )
                </Radio.Button>
                <Radio.Button value="已審批">
                  已審批(
                  {hasBeenApprovaledSum || 0}
                  )
                </Radio.Button>
                <Radio.Button value="已撤回">
                  已撤回(
                  { canceledSum || 0 }
                  )
                </Radio.Button>
              </Radio.Group>
            )
        }
        <Form>
          <Form.Item>
            {getFieldDecorator('Search', {
            })(
              <Search
                placeholder={placeholder}
                onSearch={onSearch}
                enterButton
                style={{width: 340}}
              />
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

RadioSearch.propTypes = {
  // data: PropTypes.objectOf(PropTypes.any),
  placeholder: PropTypes.string,
  status: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
}

RadioSearch.defaultProps = {
  placeholder: '請輸入需要搜索的內容',
  status: '審批單', // 審批單 / 申請單
  onChange: () => {},
  onSearch: () => {},
}

export default Form.create()(RadioSearch);
