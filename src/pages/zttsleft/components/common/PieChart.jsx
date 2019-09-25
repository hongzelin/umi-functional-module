/*
 * @Author: lin.zehong 
 * @Date: 2019-09-22 21:53:44 
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-09-24 10:43:55
 * @Desc: 重点人员预警--饼图
 */
import React from "react";
import PropTypes from "prop-types";
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pie";

const PieChart = (props) => {
  const { data, ...otherProps } = props;

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: "{b}: {c} ({d}%)",
      // formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    series: [
      {
        // name:'访问来源',
        type: 'pie',
        radius: ['30%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            formatter: "{d}%",
            position: 'inside',
            textStyle: {
              fontSize: '12',
              color: '#fff',
            },
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
              color: '#fff',
            },
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        itemStyle: {
          normal: {
            color: (params) => {
              const colors = ["#3FC3D0", "#3E90F7", "#6CDABD", "#E99D3A", "#E4CA51"];
              return colors[params.dataIndex]
            },
          },
        },
        data,
      },
    ],
  };

  return (
    <ReactEchartsCore
      echarts={echarts}
      option={option}
      notMerge
      lazyUpdate
      style={{ height: '35vh' }}
      {...otherProps}
    />
  );
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number,
  })),
};

PieChart.defaultProps = {
  data: [],
};

export default PieChart;
