const postApi = {
  // add: (data: API_Post.Add) => $fetch<null>('/api/post', {
  //   method: 'POST',
  //   body: data,
  // }),

  get: (params: API_Post.Get) => $fetch<Common.ListData<API_Post.Model>>('/api/post', {
    params,
  }),

  getById: (id: number) => $fetch<API_Post.Model>(`/api/post/${id}`),

  // delete: (id: number) => $fetch(`/api/post/${id}`, {
  //   method: 'DELETE',
  // }),

  // update: (data: API_Post.Update) => $fetch(`/api/post/${data.id}`, {
  //   body: data,
  //   method: 'PUT',
  // }),

  // updateField: (data: API_Post.UpdateField) => $fetch(`/api/post/${data.id}/${data.field}`, {
  //   method: 'PUT',
  //   body: data,
  // }),

}

export default postApi
