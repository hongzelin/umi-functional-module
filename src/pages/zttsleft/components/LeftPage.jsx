/* eslint-disable */
/*
 * Author: lin.zehong
 * Date: 2019-09-21 22:12:15
 * Last Modified by: lin.zehong
 * Last Modified time: 2019-09-21 22:19:01
 * Desc: 整体态势--左边面板
 */
import React, { Component } from "react";
import { connect } from "dva";
import PropTypes from "prop-types";
import sjicon from "../../../assets/icons/dt1.gif";
import ryicon from "../../../assets/icons/dt2.gif";
import clicon from "../../../assets/icons/dt3.gif"
import Title from "../../../components/TsTitle";
import BarChart from "../../../components/Echarts/BarChart/BarChart";
import IconDesc from "./common/IconDesc";
import EventEcharts from "./common/EventEcharts";
import PieChart from "./common/PieChart";
import AlarmType from "./AlarmType"; // 报警类型
import AlarmEvent from "./common/AlarmEvent"; // 预警事件
import EventList from "./EventList"; // 预警事件（列表）
import ChartOptions from './ChartOptions';
import styles from './LeftPage.less';

const chartHeight = "20vh";

class LeftPage extends Component {

  render() {
    const { warnEvent, todayEvent, personnel, warnCar, alarmType } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <section className={styles.section}>
            <Title title="今日事件" type="1" />
            <div className={styles.content}>
              <IconDesc
                iconType={sjicon}
                title="事件总数"
                value={todayEvent.total}
              />
              <div className={styles.echarts}>
                <EventEcharts data={todayEvent.data} style={{ height: chartHeight }} />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <Title title="重点人员预警" type="2" />
            <div className={styles.content}>
              <IconDesc
                iconType={ryicon}
                title="人员预警总数"
                value={personnel.total}
              />
              <div className={styles.echarts}>
                <PieChart data={personnel.data} style={{ height: chartHeight }} />
              </div>
              <div className={styles.echarts}>
                <EventEcharts
                  option={ChartOptions.alarmBarOption(personnel.data)}
                  style={{ height: chartHeight }}
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <Title title="重点车辆预警" type="2" />
            <div className={styles.content}>
              <IconDesc
                iconType={clicon}
                title="车辆预警总数"
                value={warnCar.total}
              />
              <div className={styles.echarts}>
                <EventEcharts data={warnCar.data} style={{ height: chartHeight }} />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <Title title="报警类型" />
            <div className={styles.content}>
              <AlarmType
                effective={alarmType.effective}
                invalid={alarmType.invalid}
              />
              <div className={styles.echarts}>
                <BarChart
                  option={ChartOptions.barOption(alarmType.data)}
                  style={{ height: chartHeight }}
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <Title title="预警事件" />
            <div className={styles.content} style={{ justifyContent: "space-between" }}>
              <AlarmEvent warnEvent={warnEvent} />
            </div>
          </section>
        </div>

        <div className={styles.right}>
          <section className={`${styles.section} ${styles.bgevent}`}>
            <Title title="报警事件" />
            <div className={styles.content}>
              <EventList />
            </div>
          </section>

          <section className={`${styles.section} ${styles.bgfollow}`}>
            <Title title="重大事件关注" type="3" />
          </section>
        </div>
      </div>
    );
  }
}

LeftPage.propTypes = {
  warnEvent: PropTypes.arrayOf(PropTypes.any),
  todayEvent: PropTypes.objectOf(PropTypes.any),
  personnel: PropTypes.objectOf(PropTypes.any),
  warnCar: PropTypes.objectOf(PropTypes.any),
  alarmType: PropTypes.objectOf(PropTypes.any),
};

LeftPage.defaultProps = {
  warnEvent: [],
  todayEvent: {
    total: 0,
    data: [],
  },
  personnel: {
    total: 0,
    data: [],
  },
  warnCar: {
    total: 0,
    data: [],
  },
  alarmType: {
    effective: 0,
    invalid: 0,
    data: [],
  },
};

const mapStateToProps = ({ zttsleft }) => ({
  warnEvent: zttsleft.warnEvent,
  todayEvent: zttsleft.todayEvent,
  personnel: zttsleft.personnel,
  warnCar: zttsleft.warnCar,
  alarmType: zttsleft.alarmType,
});

const mapDispatchToProps = dispatch => ({
  countByState(payload) {
    dispatch({
      type: 'applyForm/countByState',
      payload,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftPage);
