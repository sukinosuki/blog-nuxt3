declare namespace API_Article {

    type Model = {
      id: number
      title: string
      content: string
      description: string
      created_at: string
      updated_at: string
      category_id: number
      enabled: boolean
      is_sticky: boolean

      tags: API_Tag.Model[]
      category: API_Category.Model
    }

    type Add = {
      title: string
      category_id: number
      description: string
      // content: string
      tag_ids: number[]
      enabled: boolean
      is_sticky: boolean
    }

    type Update = {
      id: number
    } & Add

    type UpdateField<K = keyof Model> = {
      id: number
      field: K
      value: Model[K]
    }
}
