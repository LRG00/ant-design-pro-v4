import request from 'umi-request';
import { FormDataType } from './index';

export async function fakeAccountLogin(params: FormDataType) {
  return request('/api/users/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
