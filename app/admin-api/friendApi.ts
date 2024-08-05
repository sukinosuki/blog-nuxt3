const admin_friendApi = {

  add: (data: API_Friend.Add) => $fetch<null>('/api-admin/friend', {
    method: 'POST',
    body: data,
  }),

  get: (params: API_Friend.Get) => $fetch<Common.ListData<API_Friend.Model>>('/api-admin/friend', {
    params,
  }),

  delete: (id: number) => $fetch(`/api-admin/friend/${id}`, {
    method: 'DELETE',
  }),

  update: (data: API_Friend.Update) => $fetch(`/api-admin/friend/${data.id}`, {
    body: data,
    method: 'PUT',
  }),

  updateField: (data: API_Friend.UpdateField) => $fetch(`/api-admin/friend/${data.id}/${data.field}`, {
    body: data,
    method: 'PUT',
  }),
}

export default admin_friendApi
