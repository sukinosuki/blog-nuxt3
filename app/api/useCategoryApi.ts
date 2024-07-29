const useCategoryApi = () => {
  const add = (data: API_Category.Add) => useFetch('/api/category', {
    method: 'POST',
    body: data,
  })

  const get = () => useFetch<API_Category.Model[]>('/api/category')

  const update = (data: API_Category.Update) => useFetch(`/api/category/${data.id}`, {
    method: 'PUT',
    body: data,
  })

  const _delete = (id: number) => useFetch(`/api/category/${id}`, {
    method: 'DELETE',
  })

  return {
    get,
    add,
    update,
    delete: _delete,
  }
}

export default useCategoryApi
