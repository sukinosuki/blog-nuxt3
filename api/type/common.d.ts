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
