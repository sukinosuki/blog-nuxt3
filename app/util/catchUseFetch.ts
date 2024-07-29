import useAppStore from '~/store/app.store'

//
export const catchUseFetch = <T>(promise: ReturnType<typeof useFetch<T>>): Promise<[Error | null | undefined, T | null | undefined]> => {
  // TODO: 可以在这里使用book吗
  const appStore = useAppStore()

  //
  return promise.then((res) => {
    console.log('[catchUseFetch] res ', res)

    const { error, data, status } = res
    console.log('[catchUseFetch] error ', error)
    console.log('[catchUseFetch] data ', data)

    if (status.value !== 'success') {
      console.log('错误返回, error !== null, ', appStore.fetchError.value)
      appStore.fetchError.value = error
      appStore.count.value++

      return [error.value, null]
    }

    console.log('成功返回')

    return [null, data.value]
  })
    .catch((err) => {
      return [err, null]
    })
}
