/*
 * @Author: lin.zehong
 * @Date: 2019-08-07 14:35:43
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-07 14:43:44
 * @Desc: 申请方--个人工作台
 */
import React, { Component } from "react";
import Apply from '../Apply';
import styles from '../WorkbenchPage.less';

export default class AdminPage extends Component {
  render() {
    const { role } = this.props;
    return (
      <div className={styles.root}>
        <Apply role={role} />
      </div>
    );
  }
}
