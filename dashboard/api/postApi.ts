export default {
  add: (data: API_Post.Add) => $fetch<null>('/api-admin/post', {
    method: 'POST',
    body: data,
  }),

  get: (params: API_Post.Get) => $fetch<Common.ListData<API_Post.Model>>('/api-admin/post', {
    params,
  }),

  getById: (id: number) => $fetch<API_Post.Model>(`/api-admin/post/${id}`),

  delete: (id: number) => $fetch(`/api-admin/post/${id}`, {
    method: 'DELETE',
  }),

  update: (data: API_Post.Update) => $fetch(`/api-admin/post/${data.id}`, {
    body: data,
    method: 'PUT',
  }),

  updateField: (data: API_Post.UpdateField) => $fetch(`/api-admin/post/${data.id}/${data.field}`, {
    method: 'PUT',
    body: data,
  }),

}
