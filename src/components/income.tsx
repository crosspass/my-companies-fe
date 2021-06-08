import React from 'react';
// import the core library.
import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import charts, all with Chart suffix
import {
  LineChart,
} from 'echarts/charts';
// import components, all suffixed with Component
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendPlainComponent,
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer,
  // SVGRenderer,
} from 'echarts/renderers';

export default function Income({ incomes }) {
  const annual_income = incomes.filter(income => {
    return income.ReportName.includes('年')
  })
  if (incomes.length == 0) {
    return null;
  }

  const option = {
    title: {
      text: '费用'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['销售费用', '管理费用', '研发费用', '财务费用']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: annual_income.map(v => v.ReportName.substr(0,4))
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '销售费用',
        type: 'line',
        data: annual_income.map(v => v.SalesFee)
      },
      {
        name: '管理费用',
        type: 'line',
        data: annual_income.map(v => v.ManageFee)
      },
      {
        name: '研发费用',
        type: 'line',
        data: annual_income.map(v => v.RadCost)
      },
      {
        name: '财务费用',
        type: 'line',
        data: annual_income.map(v => v.FinancingExpenses)
      },
    ]
  };

  const optionTotal = {
    title: {
      text: '营业收入与成本'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['营业收入', '总成本', '营业利润', '利润总额', '净利润', '所有者的净利润', '', '']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: annual_income.map(v => v.ReportName.substr(0,4))
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '营业收入',
        type: 'line',
        data: annual_income.map(v => v.TotalRevenue)
      },
      {
        name: '总成本',
        type: 'line',
        data: annual_income.map(v => v.OperatingCosts)
      },
      {
        name: '营业利润',
        type: 'line',
        data: annual_income.map(v => v.Op)
      },
      {
        name: '利润总额',
        type: 'line',
        data: annual_income.map(v => v.ProfitTotalAmt)
      },
      {
        name: '净利润',
        type: 'line',
        data: annual_income.map(v => v.NetProfit)
      },
      {
        name: '所有者的净利润',
        type: 'line',
        data: annual_income.map(v => v.NetProfitAtsopc)
      },
    ]
  };

  const optionTotalProfit = {
    title: {
      text: '综合总收益'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['综合总收益', '归母股东收益', '其他综合收益', '少数股东收益']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: annual_income.map(v => v.ReportName.substr(0,4))
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '综合总收益',
        type: 'line',
        data: annual_income.map(v => v.TotalCompreIncome)
      },
      {
        name: '归母股东收益',
        type: 'line',
        data: annual_income.map(v => v.TotalCompreIncomeAtsopc)
      },
      {
        name: '其他综合收益',
        type: 'line',
        data: annual_income.map(v => v.OthrCompreIncome)
      },
      {
        name: '少数股东收益',
        type: 'line',
        data: annual_income.map(v => v.DltEarningsPerShare)
      },
    ]
  };

  const optionShare = {
    title: {
      text: '每股收益'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['基本每股收益', '稀释每股收益']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: annual_income.map(v => v.ReportName.substr(0,4))
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '基本每股收益',
        type: 'line',
        data: annual_income.map(v => v.BasicEps)
      },
      {
        name: '稀释每股收益',
        type: 'line',
        data: annual_income.map(v => v.DltEarningsPerShare)
      },
    ]
  };

  return (
    <section>
      <h1>利润表</h1>
      <ReactEChartsCore
        echarts={echarts}
        option={optionTotal}
        notMerge={true}
        lazyUpdate={true}
      />
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
      />
      <ReactEChartsCore
        echarts={echarts}
        option={optionTotalProfit}
        notMerge={true}
        lazyUpdate={true}
      />
      <ReactEChartsCore
        echarts={echarts}
        option={optionShare}
        notMerge={true}
        lazyUpdate={true}
      />
    </section>
  )
}