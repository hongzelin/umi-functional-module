/*
 * @Author: lin.zehong
 * @Date: 2019-08-06 15:26:13
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-20 10:18:41
 * @Desc: 审批意见
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import styles from './Idea.less';

export default class Idea extends Component {

  renderResult = (approvalState, approvalResult) => {
    if (approvalState === 0) {
      return "審批中...";
    }
    if (approvalState === 1) {
      const res = approvalResult === 1 ? "通過" : "不通過";
      return res;
    }
    // 撤回狀態，如果 approvalResult 為 1，就展示 審批通過，其他狀態都展示 ”審批中“
    if (approvalState === 2 && approvalResult === 1) {
      return "通過";
    }
    return "審批中..";
  }

  render() {
    const { title, data, isShowTitle, options={} } = this.props;
    return (
      <div className={styles.root} style={options.rootStyle}>
        { isShowTitle ? <Title title={title} /> : null }
        {
          (data || [{}]).map(item => (
            <div className={styles.idea} key={item.id} style={options.ideaStyle}>
              <p className={styles.field}>
                <span className={styles.label}>審批部門：</span>
                <span className={styles.value}>{item.approvalDeptName || '-'}</span>
                <span className={styles.label} style={{marginLeft: 200}}>審批時間：</span>
                <span className={styles.value}>{item.gmtModify || '-'}</span>
              </p>
              <p className={styles.field}>
                <span className={styles.label}>審批結果：</span>
                <span className={styles.value}>
                  {
                    this.renderResult(item.approvalState, item.approvalResult)
                  }
                </span>
              </p>
              <p className={styles.field}>
                <span className={styles.label}>審批意見：</span>
                <span className={styles.value}>{item.approvalOpinion || '審批中...'}</span>
              </p>
            </div>
          ))
        }
      </div>
    );
  }
}

Idea.propTypes = {
  title: PropTypes.string,
  isShowTitle: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.any),
  options: PropTypes.objectOf(PropTypes.any),
}

Idea.defaultProps = {
  title: '標題',
  isShowTitle: true,
  data: [],
  options: {},
}
