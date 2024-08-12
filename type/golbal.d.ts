declare type KeyOfType<T, K extends keyof T> = T[K]

// TODO:
declare type FetchError = KeyOfType<KeyOfType<ReturnType<typeof useFetch<number, ServerErrorRes>>, 'error'>, 'value'>
// declare type FetchError = ReturnType<typeof useFetch<number, ServerErrorRes>>
// declare type FetchError = FetchResult

declare type ServerErrorRes = {
  message: string
  stack?: string
  statusCode?: number
  statusMessage?: string
  url?: string
}

declare type Api_Query = {
  page: number | string
  size: number | string
}

declare namespace Common {
  type ListData<T = unknown> = {
    list: T[]
    total: number
  }
}
