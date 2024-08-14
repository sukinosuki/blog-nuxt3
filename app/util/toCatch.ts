import useAppStore from '~/store/app.store'

//
export const toCatch = <T>(promise: Promise<T>): Promise<[FetchError | null, T | null]> => {
  //
  return promise.then((res) => {
    return [null, res] as [FetchError | null, T | null]
  })
    .catch((err: FetchError) => {
      console.log('err ', err)

      useAppStore().setFetchError(err)

      return [err, null]
    })
}
