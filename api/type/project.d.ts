declare namespace API_Project {

    type Model = {
      id: number
      repository: string
      name: string
      description: string
      cover: string | null
      preview: string | null
      created_at: string
      updated_at: string
    }
    type Get = {} & Api_Query

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
