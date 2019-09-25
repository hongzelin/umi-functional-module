/*
 * @Author: lin.zehong
 * @Date: 2019-08-06 15:26:53
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-12 15:30:17
 * @Desc: 申请理由
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import styles from './Reason.less';

export default class Reason extends Component {
  render() {
    const { title, data } = this.props;
    return (
      <div className={styles.root}>
        <Title title={title} />
        <div className={styles.reason}>
          <p className={styles.field}>
            <span className={styles.label}>申請理由：</span>
            <span className={styles.value}>{data.applyReason || '-'}</span>
          </p>
          <p className={styles.field}>
            <span className={styles.label}>申請人：</span>
            <span className={styles.value}>{data.userId || '-'}</span>
          </p>
          <p className={styles.field}>
            <span className={styles.label}>申請時間：</span>
            <span className={styles.value}>{data.gmtCreate || '-'}</span>
          </p>
        </div>
      </div>
    );
  }
}

Reason.propTypes = {
  title: PropTypes.string,
  data: PropTypes.objectOf(PropTypes.any),
}

Reason.defaultProps = {
  title: '標題',
  data: {},
}
