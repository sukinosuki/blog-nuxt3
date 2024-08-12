const admin_categoryApi = {
  add: (data: API_Category.Add) => $fetch<null>('/api-admin/category', {
    method: 'POST',
    body: data,
  }),

  get: () => $fetch<API_Category.Model[]>('/api-admin/category'),

  update: (data: API_Category.Update) => $fetch<null>(`/api-admin/category/${data.id}`, {
    method: 'PUT',
    body: data,
  }),

  delete: (id: number) => $fetch(`/api-admin/category/${id}`, {
    method: 'DELETE',
  }),
}

export default admin_categoryApi
