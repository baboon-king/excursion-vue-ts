import Vue, { PluginObject } from 'vue';
import axios, { AxiosResponse } from 'axios';
import { Message } from 'element-ui';
import { ResponseData } from '@/types';
const lastData: boolean = true

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || 'http://39.100.31.213:8088/';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || "http://39.100.31.213:8088/",
  timeout: 60 * 1000, // Timeout
  // 跨域请求时是否需要凭证
  withCredentials: true, // Check cross-site Access-Control

  heards: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      // 将普适性的请求头作为基础配置。当需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
      // 将普适性的请求头作为基础配置。当需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置
    }
  },
  // 在向服务器发送请求前，对数据进行处理，axios默认会序列化数据
  // transformRequest:[function(data){
  //
  // }],
  // 在传递给 then/catch 前，修改响应数据
  // transformResponse:[function(data){
  //
  // }]

};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (cfg) => {
    // Do something before request is sent
    return cfg;
  },
  (err) => {
    // Do something with request error
    return Promise.reject(err);
  },
);

// Add a response interceptor
_axios.interceptors.response.use(
  (res: AxiosResponse<ResponseData>) => {
    // Do something with response   
    const data: ResponseData = res.data
    if (res.status === 200) {
      if (data.status === 0) {
        // 是否直接返回业务Response中的data
        if (lastData) {
          return data.data;
        }
        return data;
      } else {
        Message.error(data.massage)
      }
    } else {
      Message.error('网络异常！')
      return Promise.reject(new Error(data.massage || "Error"));
    }

  },
  (err: Error) => {
    // Do something with response error
    if (err) {
      // 请求已发出，但不在2xx范围内
      Message.error(err.message)
      return Promise.reject(err);
    } else {
      // 断网
      Message.error('网络错误')
      return Promise.reject(err);
    }

  },
);

const Plugin: PluginObject<any> = {
  install: (Vue) => {
    Vue.$axios = _axios;
  },
};
Plugin.install = (Vue) => {
  Vue.$axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
