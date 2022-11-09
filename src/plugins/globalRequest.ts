import {extend} from 'umi-request';
import message from "antd/es/message";
import {stringify} from "querystring";

const request = extend({
  credentials: 'include',
  prefix: process.env.NODE_ENV === 'production' ? 'http://fenice.icu' : undefined
});

/**
 * 请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  return{

  }
})
/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {
  const res = await response.clone().json();
  if (res.code === 40100) {
    message.error('请先登录');
    // @ts-ignore
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: location.pathname,
      })
    })
  } else if (res.code === 40000) {
    message.error(res.description);
  }
  return res.data;
})
export default request;
