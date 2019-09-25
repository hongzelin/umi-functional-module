/*
 * Author: lin.zehong 
 * Date: 2019-09-22 15:59:17 
 * Last Modified by:   lin.zehong 
 * Last Modified time: 2019-09-22 15:59:17 
 * Desc: 今日事件、人员预警总数 -- 柱状图
 */
import React, { Component } from "react";
import BarChart from "./BarChart";
import styles from "./EventEcharts.less";

class EventEcharts extends Component {
  render() {
    const { data, ...otherProps } = this.props;

    return (
      <div className={styles.root}>
        <BarChart data={data} {...otherProps} />
      </div>
    );
  }
}

export default EventEcharts;
