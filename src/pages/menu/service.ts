import request from '@/utils/request';
import { menuListParams } from './data.d';

// 列表
export async function queryMenu(params: menuListParams) {
  return request('/api/menu', {
    params,
  });
}
// 加
export async function addMenu(params: menuListParams) {
  return request('/api/menu', {
    method: 'POST',
    data: {
      ...params
    },
  });
}
// 修改
export async function updateMenu(params: menuListParams) {
  return request('/api/menu', {
    method: 'PUT',
    data: {
      ...params
    },
  });
}
// 删除
export async function deleteMenu(params: any) {
  return request('/api/menu', {
    method: 'DELETE',
    data: {
      menuId: params.menuId
    },
  });
}
