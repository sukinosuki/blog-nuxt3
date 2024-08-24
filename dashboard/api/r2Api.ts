export default {

  get: (params: API_R2.Get) => $fetch<API_R2.ListData>('/api-admin/r2', {
    params,
  }),

  upload: (data: FormData) => $fetch<API_R2.Model>('/api-admin/r2', {
    method: 'POST',
    body: data,
  }),

  delete: (pathname: string) => $fetch<null>(`/api-admin/r2/${pathname}`, {
    method: 'DELETE',
  }),
}
