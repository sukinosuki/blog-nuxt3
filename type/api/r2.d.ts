declare namespace API_R2 {
    type Get = {
      size: number | string
      cursor: string | null
    }

    type ListData = {
      list: Model[]
      cursor: string | null
    }

    type Model = {
      pathname: string
      size: number
      uploadedAt: string
      customMetadata: object
      contentType: string
    }

}
