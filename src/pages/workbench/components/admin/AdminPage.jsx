/*
 * @Author: lin.zehong
 * @Date: 2019-08-07 14:38:37
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-07 14:44:10
 * @Desc: 系统管理员--个人工作台
 */
import React, { Component } from "react";
import Inventory from '../Inventory';
import Approval from '../Approval';
import Apply from '../Apply';
import styles from '../WorkbenchPage.less';

export default class AdminPage extends Component {
  render() {
    const { role } = this.props;
    return (
      <div className={styles.root}>
        <Inventory />
        <Approval role={role} />
        <Apply role={role} />
      </div>
    );
  }
}
