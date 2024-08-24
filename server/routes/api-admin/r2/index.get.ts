export default eventHandler(async (event) => {
  const query = getQuery<API_R2.Get>(event)

  //   let cursor = 0
  const size = Number(query.size || 10)

  //   cursor = (page - 1) * size
  //   console.log('cursor ', cursor)

  const { blobs, cursor } = await hubBlob().list({
    limit: size,
    cursor: query.cursor || undefined,
  })

  return {
    cursor: cursor || null,
    list: blobs,
  }
})
