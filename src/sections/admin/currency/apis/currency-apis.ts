import { requests } from 'src/utils/axios';

export const currencyApis = {
  list: (pageNumber?: number, pageSize?: number) =>
    requests.get(`currency?pageNumber=${pageNumber || 1}&pageSize=${pageSize || 100}`),
  details: (id: any) => requests.get(`currency/${id}`),
  post: (values: any) => requests.post('currency', values),
  update: (values: any, id: any) => requests.put(`currency/${id}`, values),
  delete: (id: any) => requests.del(`currency/${id}`),
};
