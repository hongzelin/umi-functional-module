import React from "react";
import PropTypes from "prop-types";
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";

const BarChart = (props) => {
  const { data, xAxisTextColor, yAxisTextColor, ...otherProps } = props;


  const option = {
    grid: {
      left: "20%",
    },
    xAxis: {
      data: data.map(({ name }) => name),
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
    },
    yAxis: {
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
    },
    series: [
      {
        type: "bar",
        barWidth: "40%",
        label: {
          normal: {
            position: "top",
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
