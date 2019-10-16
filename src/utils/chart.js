/**
 *
 *
 * @export 创建单线折线图
 * @param {sting} title 标题
 * @param {array} xAxis x轴的间隔文字
 * @param {array} series 显示在图标的数据
 * @param {array} [yAxis=[]] y轴间隔的文字
 * @returns {object} echart需要的option对象
 */
export function create_options_single_line(title, xAxis, series, yAxis = []) {
  series = series.map(item => {
    return Number(item)
  })
  return {
    title: {
      text: title
    },
    xAxis: {
      type: 'category',
      data: xAxis,
      axisLabel: {
        interval: 0, // 横轴信息全部显示
        rotate: 38, // 角度倾斜显示
        textStyle: {
          color: 'black'
        }
      }
      // inverse:true
    },
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
      type: 'value',
      data: yAxis
    },
    backgroundColor: 'transparent',
    series: [{
      data: series,
      type: 'line',
      boundaryGap: ['20%', '20%'],
      offset: 0,
      itemStyle: { normal: { label: { show: true }}}
    }]
  }
}
/**
 *
 *
 * @export 创建堆折线图表
 * @param {string} title 标题
 * @param {array} xAxis x轴的间隔的文字
 * @param {array} series 显示在图标的数据
 * @param {array} legend 每条线的名字
 * @param {array} [yAxis={type: 'value'}] y轴间隔的文字
 * @returns {object} echart堆折线图的option
 */
export function create_options_stack_line(title, xAxis, series, legend, yAxis = { type: 'value' }) {
  series = series.map((item, index) => {
    return {
      name: legend[index],
      type: 'line',
      data: item
    }
  })
  return {
    title: {
      text: title
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: legend
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {
          show: false
        }
      }
    },
    backgroundColor: 'transparent',
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxis,
      axisLabel: {
        interval: 0, // 横轴信息全部显示
        rotate: 38, // 角度倾斜显示
        textStyle: {
          color: 'black'
        }
      }
    },
    yAxis,
    series
  }
}
