import request from '@/utils/request';
import { TableListParams } from './data.d';

// 分类列表
export async function queryTags(params: TableListParams) {
  return request('/api/tags', {
    params,
  });
}

export async function queryArtile(params: TableListParams) {
  return request('/api/articles', {
    params,
  });
}

export async function removeArtile(params: TableListParams) {
  return request(`/api/articles/${params.slugs[0]}`, {
    method: 'delete',
  });
}

export async function addArtile(params: TableListParams) {
  return request('/api/articles', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
