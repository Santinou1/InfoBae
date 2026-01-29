export const userEndpoints = {
  getList: (params) => ({
    url: '/user',
    params,
  }),
  getById: (id) => ({
    url: `/user/${id}`,
  }),
  create: () => ({
    url: '/user/create',
  }),
  update: (id) => ({
    url: `/user/${id}`,
  }),
  delete: (id) => ({
    url: `/user/${id}`,
  }),
};
