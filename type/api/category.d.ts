declare namespace API_Category {
  type Model = typeof tables.category.$inferSelect

  type Add = {
    alias: string | null
    name: string
  }

  type Update = {
    id: number
  } & Add
}
