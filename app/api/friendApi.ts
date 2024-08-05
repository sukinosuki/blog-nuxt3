export default {

  get: () => $fetch<API_Friend.Model[]>('/api/friend'),

}
