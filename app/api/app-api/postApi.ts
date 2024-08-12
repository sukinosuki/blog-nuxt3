const postApi = {
  get: (params: API_Post.Get) => $fetch<API_Post.Model[]>('/api/post', {
    params,
  }),

  getById: (id: number | string) => $fetch<API_Post.Model>(`/api/post/${id}`),

}

export default postApi
