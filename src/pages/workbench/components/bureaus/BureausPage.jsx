/*
 * @Author: lin.zehong
 * @Date: 2019-08-07 14:37:55
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-07 16:51:36
 * @Desc: 委办局--个人工作台
 */
import React, { Component } from "react";
import Approval from '../Approval';
import Apply from '../Apply';
import styles from '../WorkbenchPage.less';

export default class BureausPage extends Component {
  render() {
    const { role } = this.props;
    return (
      <div className={styles.root}>
        <Approval role={role} />
        <Apply role={role} />
      </div>
    );
  }
}
