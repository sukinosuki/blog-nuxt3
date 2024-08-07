export default {

  get: (params: Api_Query) => $fetch<API_Says.Model[]>('/api/says', {
    params,
  }),
}
