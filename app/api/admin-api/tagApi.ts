const admin_tagApi = {
  add: (data: API_Tag.Add) => $fetch('/api-admin/tag', {
    method: 'POST',
    body: data,
  }),

  get: () => $fetch<API_Tag.Model[]>('/api-admin/tag'),

  update: (data: API_Tag.Update) => $fetch<null>(`/api-admin/tag/${data.id}`, {
    method: 'PUT',
    body: data,
  }),

  delete: (id: number) => $fetch<null>(`/api-admin/tag/${id}`, {
    method: 'DELETE',
  }),

}

export default admin_tagApi
