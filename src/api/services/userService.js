import { apiClient } from '../client';
import { userEndpoints } from '../endpoints/userEndpoints';

export const userService = {
  getList: async (params = {}) => {
    const { url, params: queryParams } = userEndpoints.getList(params);
    return apiClient.get(url, queryParams);
  },

  getById: async (id) => {
    const { url } = userEndpoints.getById(id);
    return apiClient.get(url);
  },

  create: async (userData) => {
    const { url } = userEndpoints.create();
    return apiClient.post(url, userData);
  },

  update: async (id, userData) => {
    const { url } = userEndpoints.update(id);
    return apiClient.put(url, userData);
  },

  delete: async (id) => {
    const { url } = userEndpoints.delete(id);
    return apiClient.delete(url);
  },
};
