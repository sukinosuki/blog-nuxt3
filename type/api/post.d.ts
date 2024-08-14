declare namespace API_Post {

    type Model = {
      tags?: API_Tag.Model[]
      category?: API_Category.Model
    } & typeof tables.post.$inferSelect

    type Add = {
      title: string
      category_id: number
      description: string
      tag_ids: number[]
      enabled: boolean
      is_sticky: boolean
      alias: string | null
    }

    type Update = {
      id: number
    } & Add

    type UpdateField<K = keyof Model> = {
      id: number
      field: K
      value: Model[K]
    }

    type Get = {
      category_id?: number | null
    } & Api_Query
}
