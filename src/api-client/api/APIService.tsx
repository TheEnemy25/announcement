import axios, { AxiosResponse } from 'axios';

const APIService = {
    get: async (url: string, params: Record<string, unknown> = {}): Promise<any> => {
        try {
            const response: AxiosResponse = await axios.get(url, { params });
            return response.data;
        } catch (error) {
            console.error(`GET request to ${url} failed:`, error);
            throw error;
        }
    },

    post: async (url: string, data: any): Promise<any> => {
        try {
            const response: AxiosResponse = await axios.post(url, data);
            return response.data;
        } catch (error) {
            console.error(`POST request to ${url} failed:`, error);
            throw error;
        }
    },

    put: async (url: string, data: any): Promise<any> => {
        try {
            const response: AxiosResponse = await axios.put(url, data);
            return response.data;
        } catch (error) {
            console.error(`PUT request to ${url} failed:`, error);
            throw error;
        }
    },

    delete: async (url: string): Promise<any> => {
        try {
            const response: AxiosResponse = await axios.delete(url);
            return response.data;
        } catch (error) {
            console.error(`DELETE request to ${url} failed:`, error);
            throw error;
        }
    }
}

export default APIService;
