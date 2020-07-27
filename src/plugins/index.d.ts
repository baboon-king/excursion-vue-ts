import { AxiosInstance } from 'axios';
import { _AxiosInstance } from '@/types';

declare global {
  interface Window {
    axios: AxiosInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance & _AxiosInstance
  }
  interface VueConstructor {
    $axios: AxiosInstance
  }
}
