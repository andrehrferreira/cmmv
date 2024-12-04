import { AbstractService, Service } from '@cmmv/core';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Service('http')
export class HttpService extends AbstractService {
    public name = 'http';

    async request<T = any>(
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        const Axios = (await import('axios')).default;
        return Axios.request<T>(config);
    }

    async get<T = any>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        const Axios = (await import('axios')).default;
        return Axios.get<T>(url, config);
    }

    async delete<T = any>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        const Axios = (await import('axios')).default;
        return Axios.delete<T>(url, config);
    }

    async head<T = any>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        const Axios = (await import('axios')).default;
        return Axios.head<T>(url, config);
    }

    async post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        const Axios = (await import('axios')).default;
        return Axios.post<T>(url, data, config);
    }

    async put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        const Axios = (await import('axios')).default;
        return Axios.put<T>(url, data, config);
    }

    async patch<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        const Axios = (await import('axios')).default;
        return Axios.patch<T>(url, data, config);
    }
}
