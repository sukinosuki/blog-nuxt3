export default {

  get: () => $fetch<API_Project.Model[]>('/api/project'),
}
