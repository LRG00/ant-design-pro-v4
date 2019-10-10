import request from '@/utils/request';
import { menuListParams } from './data.d';

// 分类列表
export async function queryMenu(params: menuListParams) {
  return request('/api/menu', {
    params,
  });
}

