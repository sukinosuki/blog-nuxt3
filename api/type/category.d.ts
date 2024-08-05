declare namespace API_Category {
  type Model = {
    id: number
    name: string
    alias: string
    created_at: string
  }

  type Add = {
    alias: string | null
    name: string
  }

  type Update = {
    id: number
  } & Add
}
