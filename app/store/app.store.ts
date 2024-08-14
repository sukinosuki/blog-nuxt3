const useAppStore = defineStore('app', () => {
  const fetchError = ref<FetchError | null>(null)

  const setFetchError = (err: FetchError) => {
    fetchError.value = err
  }

  return { fetchError, setFetchError }
})

export default useAppStore
