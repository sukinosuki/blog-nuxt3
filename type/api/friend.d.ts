declare namespace API_Friend {
    type Model = typeof tables.friend.$inferSelect

    type Get = Api_Query

    type Add = Pick<Model, 'avatar' | 'status' | 'nickname' | 'email' | 'link' | 'introduction' | 'site_name'>

    type Update = {
      id: number
    } & Add

    type UpdateField<K = keyof Model> = {
      id: number
      field: K
      value: Model[k]
    }
}
