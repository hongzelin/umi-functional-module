/*
 * @Author: lin.zehong
 * @Date: 2019-08-06 13:44:33
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-08 15:08:35
 * @Desc: 申请单/审批单头部
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TitleResult from './TitleResult';
import styles from './FormHeader.less';

export default class FormHeader extends Component {
  render() {
    const { title, tipResult } = this.props;
    return (
      <h1 className={styles.title}>
        {title}
        { tipResult ? <TitleResult title={tipResult} /> : null }
      </h1>
    );
  }
}

FormHeader.propTypes = {
  title: PropTypes.string,
  tipResult: PropTypes.string,
};

FormHeader.defaultProps = {
  title: "事項目錄申請單",
  tipResult: "審批不通過",
};