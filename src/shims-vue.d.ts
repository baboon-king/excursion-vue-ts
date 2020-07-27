import { AxiosInstance } from 'axios';
import Vue from 'vue';
import { _AxiosInstance } from './types';
import { utils } from './utils/utils';

declare module '*.vue' {
  export default Vue
}


declare global {
  interface Window {
    axios: AxiosInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $axios: _AxiosInstance & AxiosInstance,
    $utils: utils,
  }
  interface VueConstructor {
    $axios: AxiosInstance
    $utils: utils,
  }
}
