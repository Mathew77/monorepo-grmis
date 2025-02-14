import { requests } from 'src/utils/axios';

export const countryApis = {
  list: (pageNumber?: number, pageSize?: number) =>
    requests.get(`Country?pageNumber=${pageNumber || 1}&pageSize=${pageSize || 100}`),
  details: (id: any) => requests.get(`Country/${id}`),
  post: (values: any) => requests.post('Country', values),
  update: (values: any, id: any) => requests.put(`Country/${id}`, values),
  delete: (id: any) => requests.del(`Country/${id}`),
};
