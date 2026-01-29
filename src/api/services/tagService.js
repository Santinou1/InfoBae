import { apiClient } from '../client';
import { tagEndpoints } from '../endpoints/tagEndpoints';

export const tagService = {
  getList: async () => {
    const { url } = tagEndpoints.getList();
    return apiClient.get(url);
  },
};
