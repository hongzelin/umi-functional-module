/*
 * Author: lin.zehong
 * Date: 2019-09-21 22:12:15
 * Last Modified by: lin.zehong
 * Last Modified time: 2019-09-21 22:19:01
 * Desc: 整体态势--左边面板--报警事件（列表）
 */
import React, { Component } from "react";
import { connect } from "dva";
import styles from './EventList.less';

class EventList extends Component {

  componentDidMount = () => {
    const listDom = document.getElementById("eventList");
    const cHeight = listDom.scrollHeight; // 内容整体高度
    const vHeight = listDom.clientHeight; // 可见区域高度，同时作为轮播的高度
    const time = 2000; // 每隔多少秒移动一次

    if (cHeight > vHeight) { // 如果内容大于可见区域，才需要滚动
      this.timer = setInterval(() => {
        const sHeight = listDom.scrollTop; // 获取滚动的高度
        if ((sHeight + vHeight + 10) > cHeight) { // 滚动的高度 + 可见内容的高度 + 误差，如果大于整体内容的高度，则为已滚到最底部，需要回到内容最上面
          listDom.scrollTo(0, 0);
        } else {
          // this.scrollAnimation(0, vHeight + sHeight); // 新增动画
          listDom.scrollTo(0, vHeight + sHeight);
        }
      }, time);
    }
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  /**
   * 对 scrollTo 方法新增滚动动画
   * @param { numeber } currentY 需要移动的 dom 当前位置离网页顶端的距离
   * @param { number } targetY 需要移动的 dom 当前位置离要移到的位置的距离
   */
  scrollAnimation = (currentY, targetY) => {
    const listDom = document.getElementById("eventList");
    const needScrollTop = targetY - currentY; // 计算需要移动的距离
    let _currentY = currentY;
    this.timeout = setTimeout(() => {
      const dist = Math.ceil(needScrollTop / 10); // 一次调用滑动帧数，每次调用会不一样
      _currentY += dist;
      listDom.scrollTo(_currentY, currentY);
      if (needScrollTop > 10 || needScrollTop < -10) { // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
        this.scrollAnimation(_currentY, targetY)
      } else {
        listDom.scrollTo(_currentY, targetY)
      }
    }, 1);
  };

  render() {
    const { alarmList } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <span className={styles.title}>时间</span>
          <span className={styles.title}>级别</span>
          <span className={styles.title}>类型</span>
          <span className={styles.title}>事件</span>
        </div>
        <div className={styles.content} id="eventList">
          {
            alarmList.map(item => (
              <p className={styles.field} key={item.id}>
                <span className={styles.time}>{item.date}</span>
                <span className={item.level === "1" ? styles.level1 : styles.level2}>
                  {item.level === "1" ? "一级" : "二级"}
                </span>
                <span className={styles.type}>{item.type}</span>
                <span className={styles.event}>{item.event}</span>
              </p>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ zttsleft }) => ({
  alarmList: zttsleft.alarmList,
});

const mapDispatchToProps = dispatch => ({
  countByState(payload) {
    dispatch({
      type: 'applyForm/countByState',
      payload,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
