/*
 * Author: lin.zehong 
 * Date: 2019-09-21 22:36:30 
 * Last Modified by:   lin.zehong 
 * Last Modified time: 2019-09-21 22:36:30 
 * Desc: 标题
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import titleicon from "../../assets/icons/titleicon.png";
import styles from './index.less';

export default class Title extends Component {
  render() {
    const { title, type } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.wrapName}>
          <img src={titleicon} alt={titleicon} className={styles.icon} />
          <span className={styles.title}>{title}</span>
        </div>
        {
          type === "1" ?
            (
              <div className={styles.wrapLine}>
                <span className={styles.lineColor} />
                <span className={styles.line} />
              </div>
            )
          :
            (type === "2" ? 
              (
                <div className={styles.wrapLine}>
                  <span className={styles.lineColorTitle}>今日数据</span>
                  <span className={styles.lineColor} />
                  <span className={styles.line} />
                </div>
              )
              :
              (
                <div className={styles.wrapLine}>
                  <span className={styles.lineColor} />
                  <span className={styles.name}>拉萨马拉松赛事</span>
                  <span className={styles.line} />
                </div>
              )
            )

        }
      </div>
    );
  }
}

Title.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
};

Title.defaultProps = {
  title: "标题",
  type: "1",
};