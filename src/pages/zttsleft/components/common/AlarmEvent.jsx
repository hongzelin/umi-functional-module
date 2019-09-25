/*
 * Author: lin.zehong
 * Date: 2019-09-21 22:36:30
 * Last Modified by:   lin.zehong
 * Last Modified time: 2019-09-21 22:36:30
 * Desc: 报警事件
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import car from "../../../../assets/icons/car.png";
import caricon from "../../../../assets/icons/caricon.png";
import styles from './AlarmEvent.less';

export default class AlarmEvent extends Component {
  render() {
    const { warnEvent } = this.props;

    return (
      <>
        {
          warnEvent.map((item) => (
            <div className={styles.root} key={item.id}>
              <div className={styles.top}>
                <img src={caricon} alt={caricon} className={styles.icon} />
                <span className={styles.title}>{item.title}</span>
                <span className={item.level === "1" ? styles.level1 : styles.level2}>
                  {item.level === "1" ? "一级" : "二级"}
                </span>
              </div>
              <div className={styles.detail}>
                <img src={car} alt={car} className={styles.icon} />
                <p className={styles.title}>
                  {item.type === "1" ? `车主：${item.name}` : item.name}
                </p>
                <p className={styles.num}>{item.number}</p>
                {
                  item.type === "1" ?
                    (
                      <div className={styles.list}>
                        <p className={styles.item}>
                          <span className={styles.label}>时间</span>
                          <span className={styles.val}>{item.time}</span>
                        </p>
                        <p className={styles.item}>
                          <span className={styles.label}>车牌</span>
                          <span className={styles.val}>{item.carplate}</span>
                        </p>
                        <p className={styles.item}>
                          <span className={styles.label}>车型</span>
                          <span className={styles.val}>{item.cartype}</span>
                        </p>
                      </div>
                    )
                    :
                    (
                      <div className={styles.list}>
                        <p className={styles.item}>
                          <span className={styles.label}>时间</span>
                          <span className={styles.val}>{item.time}</span>
                        </p>
                        <p className={styles.item}>
                          <span className={styles.label}>出生年月</span>
                          <span className={styles.val}>{item.birth}</span>
                        </p>
                        <p className={styles.item}>
                          <span className={styles.label}>民族</span>
                          <span className={styles.val}>{item.nation}</span>
                        </p>
                      </div>
                    )
                }
              </div>
            </div>
          ))
        }
      </>
    );
  }
}

AlarmEvent.propTypes = {
  warnEvent: PropTypes.arrayOf(PropTypes.any),
};

AlarmEvent.defaultProps = {
  warnEvent: [],
};
