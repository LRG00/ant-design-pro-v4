import request from '@/utils/request';
import { roleListParams } from './data.d';

// 分类列表
export async function queryRole(params: roleListParams) {
  return request('/api/role', {
    params,
  });
}

