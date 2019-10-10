import request from '@/utils/request';
import { sysUserListParams } from './data.d';

// 分类列表
export async function querySysUser(params: sysUserListParams) {
  return request('/api/sysuser', {
    params,
  });
}

