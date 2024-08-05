declare namespace API_Friend {
    type Model = {
      id: number
      nickname: string
      email: string
      created_at: string
      updated_at: string
      blog_name: string
      link: string
      introduction: string
      avatar: string
      status: number
    }

    type Get = Api_Query

    type Add = {
      nickname: string
      email: string
      blog_name: string
      link: string
      introduction: string
      avatar: string
      status: number
    }

    type Update = {
      id: number
    } & Add

    type UpdateField<K = keyof Model> = {
      id: number
      field: K
      value: Model[k]
    }
}
