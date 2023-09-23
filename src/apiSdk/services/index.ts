import axios from 'axios';
import queryString from 'query-string';
import { ServiceInterface, ServiceGetQueryInterface } from 'interfaces/service';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getServices = async (query?: ServiceGetQueryInterface): Promise<PaginatedInterface<ServiceInterface>> => {
  const response = await axios.get('/api/services', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createService = async (service: ServiceInterface) => {
  const response = await axios.post('/api/services', service);
  return response.data;
};

export const updateServiceById = async (id: string, service: ServiceInterface) => {
  const response = await axios.put(`/api/services/${id}`, service);
  return response.data;
};

export const getServiceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/services/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteServiceById = async (id: string) => {
  const response = await axios.delete(`/api/services/${id}`);
  return response.data;
};
