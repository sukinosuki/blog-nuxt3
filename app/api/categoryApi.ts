export default {

  get: () => useFetch<API_Category.Model[]>('/api/category'),

  getPostById: (id: number | string) => $fetch<API_Post.Model[]>(`/api/category/${id}/post`),
}
