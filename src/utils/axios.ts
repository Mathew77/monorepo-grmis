import type { AxiosResponse, AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.backendServer });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axiosInstance.get(url, { params }).then(responseBody),
  post: (url: string, body: object) => axiosInstance.post(url, body).then(responseBody),
  put: (url: string, body: object, params?: URLSearchParams) =>
    axiosInstance.put(url, body, { params }).then(responseBody),
  del: (url: string) => axiosInstance.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) =>
    axiosInstance
      .post(url, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody),
  putForm: (url: string, data: FormData) =>
    axiosInstance
      .put(url, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody),
};

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = {
      user: {
        id: '8864c717-587d-472a-929a-8e5f298024da-0',
        displayName: 'Fred Fund',
        photoURL: 'https://api-dev-minimal-v630.pages.dev/assets/images/avatar/avatar-25.webp',
        phoneNumber: '+1 416-555-0198',
        country: 'Canada',
        address: '90210 Broadway Blvd',
        state: 'California',
        city: 'San Francisco',
        zipCode: '94116',
        about:
          'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
        role: 'admin',
        isPublic: true,
      },
    };

    return res;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    signIn: '/api/auth/sign-in',
    signUp: '/api/auth/sign-up',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
