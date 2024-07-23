import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { performance } from 'perf_hooks';

class ApiHelper {
    private client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async get(endpoint: string, params: object = {}): Promise<AxiosResponse & { latency: number }> {
        const start = performance.now();
        try {
            const response = await this.client.get(endpoint, { params });
            const end = performance.now();
            return { ...response, latency: end - start };
        } catch (error: any) {
            const end = performance.now();
            throw { ...error.response, latency: end - start };
        }
    }

    async post(endpoint: string, data: object = {}): Promise<AxiosResponse & { latency: number }> {
        const start = performance.now();
        try {
            const response = await this.client.post(endpoint, data);
            const end = performance.now();
            return { ...response, latency: end - start };
        } catch (error: any) {
            const end = performance.now();
            throw { ...error.response, latency: end - start };
        }
    }
}

export default ApiHelper;
