declare namespace API_Project {

    type Model = typeof tables.project.$inferSelect

    type Get = Api_Query

    type Add = {
      repository: string
      name: string
      description: string
      cover: string
      preview: string
    }

    type Update = {
      id: number
    } & Update

}
