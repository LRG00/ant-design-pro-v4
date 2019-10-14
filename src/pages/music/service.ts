import request from '@/utils/request';
import { menuListParams } from './data';

// 列表
export async function queryMenu(params: menuListParams) {
  return request('/api/music', {
    params,
  });
}
// 加
export async function addMenu(params: menuListParams) {
  return request('/api/music', {
    method: 'POST',
    data: {
      ...params
    },
  });
}
// 修改
export async function updateMenu(params: menuListParams) {
  return request('/api/music', {
    method: 'PUT',
    data: {
      ...params
    },
  });
}
// 删除
export async function deleteMenu(params: any) {
  return request('/api/music', {
    method: 'DELETE',
    data: {
      menuId: params.menuId
    },
  });
}
