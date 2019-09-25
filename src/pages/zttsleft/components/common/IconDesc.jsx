/*
 * Author: lin.zehong
 * Date: 2019-09-21 22:36:30
 * Last Modified by:   lin.zehong
 * Last Modified time: 2019-09-21 22:36:30
 * Desc: 图标 + 描述信息
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import sjicon from "../../../../assets/icons/dt1.gif";
import styles from './IconDesc.less';

export default class IconDesc extends Component {
  render() {
    const { title, value, iconType } = this.props;
    return (
      <div className={styles.root}>
        <img src={iconType} alt={iconType} className={styles.icon} />
        <div className={styles.desc}>
          <h1 className={styles.desc}>{title}</h1>
          <p className={styles.num}>{value}</p>
          {/* <div className={styles.radioWrap}>
            <span className={styles.radioTitle}>环比昨日</span>
            <div className={styles.radioContent}>
              <span className={styles.symbol}>+</span>
              <span className={styles.ratio}>{ratio}</span>
              <img src={radiodwon} alt={radiodwon} className={styles.radioicon} />
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

IconDesc.propTypes = {
  iconType: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.number,
};

IconDesc.defaultProps = {
  iconType: sjicon,
  title: "标题总数",
  value: 0,
};
