export const commentEndpoints = {
  getList: (params) => ({
    url: '/comment',
    params,
  }),
  getListByPost: (postId, params) => ({
    url: `/post/${postId}/comment`,
    params,
  }),
  getListByUser: (userId, params) => ({
    url: `/user/${userId}/comment`,
    params,
  }),
  create: () => ({
    url: '/comment/create',
  }),
  delete: (id) => ({
    url: `/comment/${id}`,
  }),
};
