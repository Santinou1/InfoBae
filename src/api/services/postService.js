import { apiClient } from '../client';
import { postEndpoints } from '../endpoints/postEndpoints';

export const postService = {
  getList: async (params = {}) => {
    const { url, params: queryParams } = postEndpoints.getList(params);
    return apiClient.get(url, queryParams);
  },

  getListByUser: async (userId, params = {}) => {
    const { url, params: queryParams } = postEndpoints.getListByUser(userId, params);
    return apiClient.get(url, queryParams);
  },

  getListByTag: async (tagId, params = {}) => {
    const { url, params: queryParams } = postEndpoints.getListByTag(tagId, params);
    return apiClient.get(url, queryParams);
  },

  getById: async (id) => {
    const { url } = postEndpoints.getById(id);
    return apiClient.get(url);
  },

  create: async (postData) => {
    const { url } = postEndpoints.create();
    return apiClient.post(url, postData);
  },

  update: async (id, postData) => {
    const { url } = postEndpoints.update(id);
    return apiClient.put(url, postData);
  },

  delete: async (id) => {
    const { url } = postEndpoints.delete(id);
    return apiClient.delete(url);
  },
};
