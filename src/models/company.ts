import * as companyService from '../services/company'
import pathToRegexp from 'path-to-regexp'

// type interface Company {
// }

export default {
  namespace: 'company',
  state: {
    current: null,
    comments: [],
    reportSummaries: [],
    incomes: [],
    cashFlows: [],
    balances: [],
    articles: [],
  },
  effects: {
    *fetch({ payload: code }, { call, put }) {
      console.log('id', code);
      const { company, message } = yield call(companyService.fetchCompany, code);
      yield put({
        type: 'fetchCompany',
        payload: { company },
      });
    },
    *createComment({payload: values}, { call, put }) {
      const { company, message } = yield call(companyService.createComment, values);
      yield put({
        type: 'addComment',
        payload: { company },
      });
    },
    *fetchReportSummaries({payload: code}, { call, put }) {
      const { reportSummaries, message } = yield call(companyService.reportSummaries, code);
      console.log('fetch report summaries payload', code);
      yield put({
        type: 'addReportSummaries',
        payload: { reportSummaries },
      });
    },
    *fetchIncomes({payload: code}, { call, put }) {
      const { incomes, message } = yield call(companyService.incomes, code);
      console.log('fetch report summaries payload', code);
      yield put({
        type: 'addIncomes',
        payload: { incomes },
      });
    },
    *fetchCashFlows({payload: code}, { call, put }) {
      const { cashFlows, message } = yield call(companyService.cash_flows, code);
      console.log('fetch report summaries payload', code);
      yield put({
        type: 'addCashFlows',
        payload: { cashFlows },
      });
    },
    *fetchBalances({payload: code}, { call, put }) {
      const { balances, message } = yield call(companyService.balances, code);
      console.log('fetch report summaries payload', code);
      yield put({
        type: 'addBalances',
        payload: { balances },
      });
    },
    *fetchArticles({payload: code}, { call, put }) {
      const { articles, message } = yield call(companyService.articles, code);
      console.log('fetch report companies payload', code);
      yield put({
        type: 'addArticles',
        payload: { articles },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let match = pathToRegexp('/companies/:code/finances').exec(pathname);
        if (match) {
          const code = match[1];
          dispatch({ type: 'fetch', payload: code });
          dispatch({ type: 'fetchReportSummaries', payload: code });
          dispatch({ type: 'fetchIncomes', payload: code });
          dispatch({ type: 'fetchCashFlows', payload: code });
          dispatch({ type: 'fetchBalances', payload: code });
        }
        match = pathToRegexp('/companies/:code/articles').exec(pathname);
        if (match) {
          const code = match[1];
          dispatch({ type: 'fetchArticles', payload: code });
        }
      });
    },
  },
  reducers: {
    fetchCompany(state, { payload }) {
      return { ...state, current: payload.company };
    },
    addComment(state, { payload }) {
      return { ...state, comments: payload };
    },
    addReportSummaries(state, { payload }) {
      return { ...state, reportSummaries: payload.reportSummaries };
    },
    addIncomes(state, { payload }) {
      return { ...state, incomes: payload.incomes };
    },
    addCashFlows(state, { payload }) {
      return { ...state, cashFlows: payload.cashFlows };
    },
    addBalances(state, { payload }) {
      return { ...state, balances: payload.balances };
    },
    addArticles(state, { payload }) {
      return { ...state, articles: payload.articles };
    },
  },
}