export const postEndpoints = {
  getList: (params) => ({
    url: '/post',
    params,
  }),
  getListByUser: (userId, params) => ({
    url: `/user/${userId}/post`,
    params,
  }),
  getListByTag: (tagId, params) => ({
    url: `/tag/${tagId}/post`,
    params,
  }),
  getById: (id) => ({
    url: `/post/${id}`,
  }),
  create: () => ({
    url: '/post/create',
  }),
  update: (id) => ({
    url: `/post/${id}`,
  }),
  delete: (id) => ({
    url: `/post/${id}`,
  }),
};
