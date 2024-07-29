const useArticleApi = () => {
  const add = (data: API_Article.Add) => useFetch('/api/article', {
    method: 'POST',
    body: data,
  })

  const get = () => useFetch<API_Article.Model[]>('/api/article')

  const getById = (id: number) => useFetch<API_Article.Model>(`/api/article/${id}`)

  const _delete = (id: number) => useFetch(`/api/article/${id}`, {
    method: 'DELETE',
  })

  const update = (data: API_Article.Update) => useFetch(`/api/article/${data.id}`, {
    body: data,
    method: 'PUT',
  })

  const updateField = (data: API_Article.UpdateField) => useFetch(`/api/article/${data.id}/${data.field}`, {
    method: 'PUT',
    body: data,
  })

  return {
    add,
    get,
    getById,
    delete: _delete,
    update,
    updateField,
  }
}

export default useArticleApi
