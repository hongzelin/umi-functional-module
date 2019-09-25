/*
 * Author: lin.zehong 
 * Date: 2019-09-23 00:36:57 
 * Last Modified by:   lin.zehong 
 * Last Modified time: 2019-09-23 00:36:57 
 * Desc: 整体态势--左边面板--图表配置 
 */
import echarts from "echarts/lib/echarts";

// 报警类型
const barOption = (data) => ({
  grid: {
    left: "20%",
  },
  xAxis: {
    data: data.map(({ name }) => name),
    axisLabel: {
      textStyle: {
        color: "#C9DDFC",
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
        color: "#FFFFFF",
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#ccc'],
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
});

const barSetDifferentColor = (data) => {
  const colors = ["#3FC3D0", "#3E90F7", "#6CDABD", "#E99D3A", "#E4CA51"];
  const result = data.map((item, index) => ({
    value: item.value,
    itemStyle: {
      normal: {
        color: colors[index],
      },
    },
  }));
  return result;
}

const alarmBarOption = (data) => ({
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
        color: "#C9DDFC",
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
        color: "#fff",
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
      barWidth: 2,
      data: barSetDifferentColor(data),
    },
  ],
});

const ChartOptions = {
  alarmBarOption,
  barOption,
}

export default ChartOptions;
