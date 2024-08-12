const useAppStore = defineStore('app', () => {
  console.log('app store setup!')

  const fetchError = ref<FetchError | null>(null)

  const setFetchError = (err: FetchError) => {
    fetchError.value = err
  }

  return { fetchError, setFetchError }
})

export default useAppStore
