import { apiClient } from '../client';
import { commentEndpoints } from '../endpoints/commentEndpoints';

export const commentService = {
  getList: async (params = {}) => {
    const { url, params: queryParams } = commentEndpoints.getList(params);
    return apiClient.get(url, queryParams);
  },

  getListByPost: async (postId, params = {}) => {
    const { url, params: queryParams } = commentEndpoints.getListByPost(postId, params);
    return apiClient.get(url, queryParams);
  },

  getListByUser: async (userId, params = {}) => {
    const { url, params: queryParams } = commentEndpoints.getListByUser(userId, params);
    return apiClient.get(url, queryParams);
  },

  create: async (commentData) => {
    const { url } = commentEndpoints.create();
    return apiClient.post(url, commentData);
  },

  delete: async (id) => {
    const { url } = commentEndpoints.delete(id);
    return apiClient.delete(url);
  },
};
