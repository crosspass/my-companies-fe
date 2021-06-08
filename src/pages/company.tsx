import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

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

import { Modal, Button, Form, Input } from 'antd';

import styles from './index.less';
import Income from '../components/income';
import Summary from '../components/summary';

const App = ({dispatch, companyId, chart}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log('form values', form.getFieldsValue(true))
    const payload = form.getFieldsValue(true)
    payload['company_id'] = companyId
    payload['chart'] = chart
   
    dispatch({
      type: 'company/createComment',
      payload: payload,
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <>
      <Button type="primary" onClick={showModal}>
        点评利润
      </Button>
      <Modal title="点评利润表" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          layout="vertical"
          form={form}
        >
          <Form.Item label="点评利润表" name="content">
            <Input.TextArea rows={10} placeholder="input placeholder" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

// Register the required components
echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, LegendPlainComponent, LineChart, CanvasRenderer]
);

// The usage of ReactEChartsCore are same with above.

const YingShouLine: React.FC = ({ data }) => {
  if (!data) {
    return null;
  }
  const option = {
    title: {
      text: '营收'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['营业收入', '利润']
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
      data: data.map(v => v.Year)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '营业收入',
        type: 'line',
        data: data.map(v => v.YingShou / 100)
      },
      {
        name: '利润',
        type: 'line',
        data: data.map(v => v.LiRun / 100)
      },
      {
        name: '现金净流入',
        type: 'line',
        data: data.map(v => v.LiRun / 100)
      },
    ]
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
    />
  )
};

const LiRunRateChart: React.FC = ({ data }) => {
  const option = {
    title: {
      text: '利润率'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['毛利率', '净利率']
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
      data: data.map(v => v.Year)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '营业收入',
        type: 'line',
        data: data.map(v => v.YingShou / 100)
      },
      {
        name: '利润',
        type: 'line',
        data: data.map(v => v.LiRun / 100)
      },
      {
        name: '现金净流入',
        type: 'line',
        data: data.map(v => v.LiRun / 100)
      },
    ]
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
    />
  )
};

const KuCunChart: React.FC = ({ data }) => {
  const option = {
    title: {
      text: '库存'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['毛利率', '净利率']
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
      data: data.map(v => v.Year)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '营业收入',
        type: 'line',
        data: data.map(v => v.YingShou / 100)
      },
      {
        name: '利润',
        type: 'line',
        data: data.map(v => v.LiRun / 100)
      },
      {
        name: '现金净流入',
        type: 'line',
        data: data.map(v => v.LiRun / 100)
      },
    ]
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
    />
  )
};


function Profit({ profits, comments }) {
  console.log('profits', profits);
  console.log('comments', comments);
  return (
    <section>
      <h1>营业收入</h1>
      <YingShouLine data={profits} />
      { comments.length > 0 &&
        <p>{comments.lastItem.Content}</p>
      }
    </section>
  )
}

function Asset({ company }) {
  return (
    <Link to={`/companies/${company.ID}`}>{company.Name}</Link>
  )
}

function Crash({ company }) {
  return (
    <Link to={`/companies/${company.ID}`}>{company.Name}</Link>
  )
}

function TotalRevenue({ reportSummary }) {
  console.log('comments', reportSummary);
  const annual_summary = reportSummary.filter(summary => {
    return summary.ReportName.includes('年')
  })
  if (reportSummary.length == 0) {
    return null;
  }
  const option = {
    title: {
      text: '营收'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['营业收入', '净利润', '扣非净利润']
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
      data: annual_summary.map(v => v.ReportName.substr(0,4))
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '营业收入',
        type: 'line',
        data: annual_summary.map(v => v.TotalRevenue)
      },
      {
        name: '净利润',
        type: 'line',
        data: annual_summary.map(v => v.NetProfitAtsopc)
      },
      {
        name: '扣非净利润',
        type: 'line',
        data: annual_summary.map(v => v.NetProfitAfterNrgalAtsolc)
      },
    ]
  };

  return (
    <section>
      <h1>营业收入</h1>
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
      />
    </section>
  )
}

function Increase({ reportSummary }) {
  console.log('comments', reportSummary);
  const annual_summary = reportSummary.filter(summary => {
    return summary.ReportName.includes('年')
  })
  if (reportSummary.length == 0) {
    return null;
  }
  const option = {
    title: {
      text: '增长率'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['营业收入同比增长', '净利润同比增长', '扣非净利润同比增长']
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
      data: annual_summary.map(v => v.ReportName.substr(0,4))
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '营业收入同比增长',
        type: 'line',
        data: annual_summary.map(v => (+v.TotalRevenueIncrease * 100).toFixed(2))
      },
      {
        name: '净利润同比增长',
        type: 'line',
        data: annual_summary.map(v => (+v.NetProfitAtsopcIncrease * 100).toFixed(2))
      },
      {
        name: '扣非净利润同比增长',
        type: 'line',
        data: annual_summary.map(v => (+v.NetProfitAfterNrgalAtsolcIncrease * 100).toFixed(2))
      },
    ]
  };

  return (
    <section>
      <h1>营业收入</h1>
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
      />
    </section>
  )
}

function ProfitAbility({ reportSummary }) {
  console.log('comments', reportSummary);
  const annual_summary = reportSummary.filter(summary => {
    return summary.ReportName.includes('年')
  })
  if (reportSummary.length == 0) {
    return null;
  }
  const option = {
    title: {
      text: '盈利能力'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['净资产收益率', '净资产收益率-摊薄', '总资产报酬率', '人力投入回报率', '销售毛利率', '销售净利率']
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
      data: annual_summary.map(v => v.ReportName.substr(0,4))
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '净资产收益率',
        type: 'line',
        data: annual_summary.map(v => v.AvgRoe)
      },
      {
        name: '净资产收益率-摊薄',
        type: 'line',
        data: annual_summary.map(v => v.OreDlt)
      },
      {
        name: '总资产报酬率',
        type: 'line',
        data: annual_summary.map(v => v.NetInterestOfTotalAssets)
      },
      {
        name: '人力投入回报率',
        type: 'line',
        data: annual_summary.map(v => v.Rop)
      },
      {
        name: '销售毛利率',
        type: 'line',
        data: annual_summary.map(v => v.GrossSellingRate)
      },
      {
        name: '销售净利率',
        type: 'line',
        data: annual_summary.map(v => v.NetSellingRate)
      },
    ]
  };

  return (
    <section>
      <h1>盈利能力</h1>
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
      />
    </section>
  )
}

function OperationAbility({ reportSummary }) {
  console.log('comments', reportSummary);
  const annual_summary = reportSummary.filter(summary => {
    return summary.ReportName.includes('年')
  })
  if (reportSummary.length == 0) {
    return null;
  }
  const option = {
    title: {
      text: '周转天数'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['存货周转天数', '应收账款周转天数', '应付账款周转天数', '现金循环周期', '营业周期']
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
      data: annual_summary.map(v => v.ReportName.substr(0,4))
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '存货周转天数',
        type: 'line',
        data: annual_summary.map(v => v.InventoryTurnoverDays)
      },
      {
        name: '应收账款周转天数',
        type: 'line',
        data: annual_summary.map(v => v.ReceivableTurnoverDays)
      },
      {
        name: '应付账款周转天数',
        type: 'line',
        data: annual_summary.map(v => v.AccountsPayableTurnoverDays)
      },
      {
        name: '现金循环周期',
        type: 'line',
        data: annual_summary.map(v => v.CashCycle)
      },
      {
        name: '营业周期',
        type: 'line',
        data: annual_summary.map(v => v.OperatingCycle)
      },
    ]
  };

  const cycleOption = {
    title: {
      text: '周转率'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['总资产周转率', '存货周转率', '应收账款周转率', '应付账款周转率', '流动资产周转率', '固定资产周转率']
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
      data: annual_summary.map(v => v.ReportName.substr(0,4))
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '总资产周转率',
        type: 'line',
        data: annual_summary.map(v => v.TotalCapitalTurnover)
      },
      {
        name: '存货周转率',
        type: 'line',
        data: annual_summary.map(v => v.InventoryTurnover)
      },
      {
        name: '应收账款周转率',
        type: 'line',
        data: annual_summary.map(v => v.AccountReceivableTurnover)
      },
      {
        name: '应付账款周转率',
        type: 'line',
        data: annual_summary.map(v => v.AccountsPayableTurnover)
      },
      {
        name: '流动资产周转率',
        type: 'line',
        data: annual_summary.map(v => v.CurrentAssetTurnoverRate)
      },
      {
        name: '固定资产周转率',
        type: 'line',
        data: annual_summary.map(v => v.FixedAssetTurnoverRatio)
      },
    ]
  };

  return (
    <section>
      <h1>运营能力</h1>
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
      />
      <ReactEChartsCore
        echarts={echarts}
        option={cycleOption}
        notMerge={true}
        lazyUpdate={true}
      />
    </section>
  )
}

function FinaRisk({ reportSummary }) {
  const annual_summary = reportSummary.filter(summary => {
    return summary.ReportName.includes('年')
  })
  if (reportSummary.length == 0) {
    return null;
  }

  const assetLiabOption = {
    title: {
      text: '资产负债率'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['资产负债率']
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
      data: annual_summary.map(v => v.ReportName.substr(0,4))
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '资产负债率',
        type: 'line',
        data: annual_summary.map(v => v.AssetLiabRatio)
      },
    ]
  };

  const option = {
    title: {
      text: '财务风险'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['流动比率', '速动比率', '权益乘数', '产权比率', '现金流量比率']
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
      data: annual_summary.map(v => v.ReportName.substr(0,4))
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '流动比率',
        type: 'line',
        data: annual_summary.map(v => v.CurrentRatio)
      },
      {
        name: '速动比率',
        type: 'line',
        data: annual_summary.map(v => v.QuickRatio)
      },
      {
        name: '权益乘数',
        type: 'line',
        data: annual_summary.map(v => v.EquityMultiplier)
      },
      {
        name: '产权比率',
        type: 'line',
        data: annual_summary.map(v => v.EquityRatio)
      },
      {
        name: '现金流量比率',
        type: 'line',
        data: annual_summary.map(v => v.NcfFromOaToTotalLiab)
      },
    ]
  };


  return (
    <section>
      <h1>财务风险</h1>
      <ReactEChartsCore
        echarts={echarts}
        option={assetLiabOption}
        notMerge={true}
        lazyUpdate={true}
      />
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
      />
    </section>
  )
}

function Page({ dispatch, company }) {
  console.log('company', company)
  const { current } = company
  if (!company) {
    return null;
  }
  const getChartComments = (chartName:string) => {
    if (company && company.Comments) {
      return company.Comments.filter(v => v.Chart == chartName )
    } else {
      return []
    }
  }
  return (
    <div className={styles.mainContainer}>
      <h1>{current && current.Name}</h1>
      <Summary summary={company.reportSummaries} />
      <Income incomes={company.incomes} />
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  console.log('state.company', state.company)
  return {
    loading: state.loading.global,
    company: state.company
  };
}

export default connect(mapStateToProps)(Page);
