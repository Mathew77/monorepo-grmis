import { requests } from 'src/utils/axios';

export const sectorsApis = {
  list: (pageNumber?: number, pageSize?: number) =>
    requests.get(`sectors?pageNumber=${pageNumber || 1}&pageSize=${pageSize || 100}`),
  details: (id: any) => requests.get(`sectors/${id}`),
  post: (values: any) => requests.post('sectors', values),
  update: (values: any, id: any) => requests.put(`sectors/${id}`, values),
  delete: (id: any) => requests.del(`sectors/${id}`),
};
