declare namespace API_Tag {
    type Model = {
      id: number
      name: string
      created_at: string
    }

    type Add = {
      name: string
    }

    type Update = {
      id: number
    } & Add
}
