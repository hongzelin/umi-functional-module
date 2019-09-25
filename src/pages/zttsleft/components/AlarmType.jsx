/*
 * Author: lin.zehong 
 * Date: 2019-09-21 22:12:15 
 * Last Modified by: lin.zehong
 * Last Modified time: 2019-09-21 22:19:01
 * Desc: 整体态势--左边面板--报警类型
 */
import React, { Component } from "react";
import { connect } from "dva";
import PropTypes from "prop-types";
import styles from './AlarmType.less';

@connect(({ zttsleft }) => ({ zttsleft }))
class AlarmType extends Component {
  render() {
    const { effective, invalid } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <p className={styles.title}>有效警情</p>
          <p className={styles.num}>{effective}</p>
        </div>
        <div className={styles.content}>
          <p className={styles.title} style={{color: "#999"}}>无效警情</p>
          <p className={styles.num}>{invalid}</p>
        </div>
      </div>
    );
  }
}

AlarmType.propTypes = {
  effective: PropTypes.number,
  invalid: PropTypes.number,
};

AlarmType.defaultProps = {
  effective: 0,
  invalid: 0,
};

export default AlarmType;
