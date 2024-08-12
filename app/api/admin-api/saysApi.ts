const admin_saysApi = {

  get: (params: API_Says.Get) => $fetch<Common.ListData<API_Says.Model>>('/api-admin/says', {
    params,
  }),

  add: (data: API_Says.Add) => $fetch('/api-admin/says', {
    body: data,
    method: 'POST',
  }),

  update: (data: API_Says.Update) => $fetch<null>(`/api-admin/says/${data.id}`, {
    body: data,
    method: 'PUT',
  }),

  updateField: (data: API_Says.UpdateField) => $fetch<null>(`/api-admin/says/${data.id}/${data.field}`, {
    body: data,
    method: 'PUT',
  }),

  delete: (id: number) => $fetch<null>(`/api-admin/says/${id}`, {
    method: 'DELETE',
  }),
}

export default admin_saysApi
