import axios from 'axios';
import { getCredentials } from './StorageUtils';
import React from 'react';

const AxiosFileinstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
    },
    timeout: 3000000,
    transformRequest: [(data) => {
        if (data instanceof FormData) {
            return data;
        }
        return JSON.stringify(data);
    }],
    transformResponse: [(data) => {
        if (typeof data === 'string') {
            try {
                return JSON.parse(data);
            } catch (e) {
                return data;
            }
        }
        return data;
    }],
});


AxiosFileinstance.interceptors.request.use((config) => {
    const userInfo = getCredentials();
    if (userInfo?.accessToken) {
        config.headers.Authorization = `Bearer ${userInfo.accessToken}`;
    }
    return config;
});


export default AxiosFileinstance;