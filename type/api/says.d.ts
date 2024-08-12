declare namespace API_Says {
  type Model = typeof tables.says.$inferSelect

  type Get = Api_Query

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
