declare namespace API_Post {

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
      alias: string | null

      tags: API_Tag.Model[]
      category: API_Category.Model
    }

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
      page: number
      size: number
      category_id?: number | null
    }
}
