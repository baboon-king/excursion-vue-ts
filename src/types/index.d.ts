import { AxiosInterceptorManager, AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ResponseData<T = any> {
    status: 0 | 1,
    massage: string,
    data: T,
    total: number
}

export interface UserInfo {

    id?: number,
    _id?: number,
    name?: string,
    password?: string,
    phone?: string,
    sex?: string,
    uname?: string
    loginStatus?: boolean
}

export interface Prodeuct {
    id?: number,
    name?: string,
    price?: number,
    brief?: string,
    details?: string,
    picUrl?: string
}
export interface Attraction {
    id?: number
    name?: string
    price?: number
    brief?: string
    details?: string
    picUrl?: string
    enableLevel?: number,
    enableType?: number,
    custrom?: number
}
export interface Custom {
    id?: number
    name?: string
    enabled?: number
}

export interface ResponsePage<E> {
    page: number,
    total: number,
    records: number,
    rows: E[],
}

export interface Order {
    id?: number,
    gmtCreate?: number | Date, // 创建时间
    gmtModified?: number | Date, // 下单时间
    name?: string, // 订单名称
    remark?: string, // 备注
    userId?: number, // 用户id编号
    destination?: string, // 目的地
    outTime?: number | Date, // 出行时间
    getTime?: number | Date, // 回游时间
    countPrice?: number, // 总价格
    outNum?: number,
    peopleNum?: number, // 出行人数
    enablePeople?: number, // 人员类型
    enableStay?: number, // 住宿类型
    enableTraffic?: number, // 交通类型
    enableDining?: number, // 用餐类型
    budget?: number, // 预算价格
    username?: string, // 联系人
    phone?: string, // 联系电话
    orderEnable?: number
}
export interface _AxiosInstance {
    // (config: AxiosRequestConfig): AxiosPromise;
    // (url: string, config?: AxiosRequestConfig): AxiosPromise;
    // defaults: AxiosRequestConfig;
    // interceptors: {
    //     request: AxiosInterceptorManager<AxiosRequestConfig>;
    //     response: AxiosInterceptorManager<AxiosResponse>;
    // };
    // request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
    // get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    // delete(url: string, config?: AxiosRequestConfig): AxiosPromise;
    // head(url: string, config?: AxiosRequestConfig): AxiosPromise;
    // put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> & Promise<ResponsePage<T>> & Promise<T[]>;
    // patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
}