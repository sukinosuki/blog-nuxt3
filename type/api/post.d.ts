declare namespace API_Post {

    type Model = {
      tags?: API_Tag.Model[]
      category?: API_Category.Model
    } & typeof tables.post.$inferSelect

    type Add = {
      tag_ids: number[]
    } & Pick<Model, 'title' | 'category_id' | 'description' | 'enabled' | 'is_pin_to_top' | 'alias' | 'cover'>

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
