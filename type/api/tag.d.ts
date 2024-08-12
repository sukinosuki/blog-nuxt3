declare namespace API_Tag {
    type Model = typeof tables.tag.$inferSelect

    type Add = {
      name: string
    }

    type Update = {
      id: number
    } & Add
}
