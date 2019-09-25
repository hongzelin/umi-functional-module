/*
 * Author: lin.zehong 
 * Date: 2019-09-22 15:59:17 
 * Last Modified by:   lin.zehong 
 * Last Modified time: 2019-09-22 15:59:17 
 * Desc: 今日事件、人员预警总数 -- 柱状图（EventEcharts 组件中引入）
 */
import React from "react";
import PropTypes from "prop-types";
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";

const BarChart = (props) => {
  const { data, xAxisTextColor, yAxisTextColor, ...otherProps } = props;

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'shadow',
      },
    },
    grid: {
      top: 5,
      bottom: 0,
      left: 10,
      containLabel: true,
    },
    xAxis: {
      show: false,
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLabel: {
        textStyle: {
          color: xAxisTextColor,
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "rgba(255,255,255,0.3)",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: yAxisTextColor,
        },
      },
      type: 'category',
      data: data.map(({ name }) => name),
    },
    series: [
      {
        type: "bar",
        stack: 'chart',
        z: 3,
        label: {
          normal: {
            position: 'right',
            show: true,
            color: "#fff",
          },
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: "#00CCFF" },
                { offset: 1, color: "#2A54B4" },
              ]
            ),
          },
        },
        barWidth: 2,
        data: data.map(({ value }) => value),
      },
    ],
  };

  return (
    <ReactEchartsCore
      echarts={echarts}
      option={option}
      notMerge
      lazyUpdate
      {...otherProps}
    />
  );
};


BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number,
  })),
  xAxisTextColor: PropTypes.string,
  yAxisTextColor: PropTypes.string,
};

BarChart.defaultProps = {
  data: [],
  xAxisTextColor: "#C9DDFC",
  yAxisTextColor: "#FFFFFF",
};

export default BarChart;
