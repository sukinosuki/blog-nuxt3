const admin_projectApi = {

  add: (data: API_Project.Add) => $fetch('/api-admin/project', {
    method: 'POST',
    body: data,
  }),

  get: (params: API_Project.Get) => $fetch<Common.ListData<API_Project.Model>>('/api-admin/project', {
    params,
  }),

  update: (data: API_Project.Update) => $fetch(`/api-admin/project/${data.id}`, {
    body: data,
    method: 'PUT',
  }),

  delete: (id: number) => $fetch(`/api-admin/project/${id}`, {
    method: 'DELETE',
  }),
}

export default admin_projectApi
