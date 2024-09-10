import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { AbstractService, Service } from '@cmmv/core';

@Service('http')
export class HttpService extends AbstractService {
    public name = 'http';

    request<T = any>(config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return Axios.request<T>(config);
    }

    get<T = any>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return Axios.get<T>(url, config);
    }

    delete<T = any>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return Axios.delete<T>(url, config);
    }

    head<T = any>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return Axios.head<T>(url, config);
    }

    post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return Axios.post<T>(url, data, config);
    }

    put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return Axios.put<T>(url, data, config);
    }

    patch<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return Axios.patch<T>(url, data, config);
    }
}
