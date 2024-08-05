export default {

  get: () => useFetch<API_Category.Model[]>('/api/category'),

}
