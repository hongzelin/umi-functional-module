/*
 * @Author: lin.zehong
 * @Date: 2019-08-06 15:30:44
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-07 10:13:10
 * @Desc: 表单二级小标题，如：发起事项、申请数据目录等
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './Title.less';

export default class Title extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className={styles.title}>{title}</div>
    );
  }
}

Title.propTypes = {
  title: PropTypes.string,
};

Title.defaultProps = {
  title: "標題",
};