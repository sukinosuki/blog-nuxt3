const useTagApi = () => {
  const add = (data: API_Category.Add) => useFetch('/api/tag', {
    method: 'POST',
    body: data,
  })

  const get = () => useFetch<API_Category.Model[]>('/api/tag')

  const update = (data: API_Category.Update) => useFetch<null>(`/api/tag/${data.id}`, {
    method: 'PUT',
    body: data,
  })

  const _delete = (id: number) => useFetch<null>(`/api/tag/${id}`, {
    method: 'DELETE',
  })

  return {
    get,
    add,
    update,
    delete: _delete,
  }
}

export default useTagApi
