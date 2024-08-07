declare namespace API_Says {
  type Model = {
    id: number
    author: string
    source: string
    text: string
    enabled: boolean
    created_at: string
    updated_at: string
  }

  type Get = {} & Api_Query

  type Add = {
    author: string | null
    source: string | null
    text: string
    enabled: boolean
  }

  type Update = {
    id: number
  } & Add

  type UpdateField<K = keyof Pick<API_Says.Model, 'enabled'>> = {
    id: number
    field: K
    value: API_Says[K]
  }
}
