import request from '@/utils/request';
import { editcodeListParams } from './data';

// 列表
export async function queryEditcode(params: editcodeListParams) {
  return request('/api/editcode', {
    params,
  });
}
// 加
export async function addEditcode(params: editcodeListParams) {
  return request('/api/editcode', {
    method: 'POST',
    data: {
      ...params
    },
  });
}
// 修改
export async function updateEditcode(params: editcodeListParams) {
  return request('/api/editcode', {
    method: 'PUT',
    data: {
      ...params
    },
  });
}
// 删除
export async function deleteEditcode(params: any) {
  return request('/api/editcode', {
    method: 'DELETE',
    data: {
      editcodeId: params.editcodeId
    },
  });
}
