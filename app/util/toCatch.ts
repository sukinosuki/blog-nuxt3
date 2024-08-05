//
export const toCatch = <T>(promise: Promise<T>): Promise<[Error | null, T | null]> => {
  //
  return promise.then((res) => {
    // console.log('[catchUseFetch] res ', res)

    // console.log('[catchUseFetch] error ', error)
    // console.log('[catchUseFetch] data ', data)

    // if (status.value !== 'success') {

    //   return [error.value, null]
    // }

    console.log('成功返回')

    return [null, res]
  })
    .catch((err) => {
      return [err, null]
    })
}
