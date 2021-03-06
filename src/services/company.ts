import { request } from 'umi';

import { PAGE_SIZE } from '../constants';

export function fetch(query: { page: number }) {
  return request(`/api/companies?_page=${query.page}&_limit=${PAGE_SIZE}`);
}

export function remove(id: number) {
  return request(`/api/companies/${id}`, {
    method: 'DELETE',
  });
}

export function fetchCompany(id: number) {
  return request(`/api/companies/${id}`);
}

export function reportSummaries(code: string) {
  return request(`/api/reportSummary?code=${code}`);
}

export function incomes(code: string) {
  return request(`/api/incomes?code=${code}`);
}

export function cash_flows(code: string) {
  return request(`/api/cashFlows?code=${code}`);
}

export function balances(code: string) {
  return request(`/api/balances?code=${code}`);
}

export function createComment(payload) {
  return request(`/api/comments`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function articles(code:string) {
  return request(`/api/companies/${code}/articles`)
}