export default eventHandler(async (event) => {
  const form = await readFormData(event)

  const category = form.get('category') || 'other'

  const file = form.get('file') as File
  const date = new Date()
  const timestamp = date.getTime()
  const year = date.getFullYear()
  const month = date.getMonth()

  // return hubBlob().handleUpload(event, {
  //   formKey: 'file',
  //   ensure: {
  //     maxSize: '1KB',
  //     types: ['video'],
  //   },
  //   put: {
  //     addRandomSuffix: true,
  //     name: `${timestamp}`,
  //     prefix: `images/${category}/${year}/${month}`,
  //   },
  // })
  if (!file || !file.size) {
    throw createError({
      statusCode: 400,
      message: 'No file provided',
    })
  }

  ensureBlob(file, {
    maxSize: '2MB',
    types: ['image'],
  })

  // // {
  // //   "pathname": "images/微信图片_20231019143531.jpg",
  // //   "contentType": "image/jpeg",
  // //   "size": 252923,
  // //   "uploadedAt": "2024-08-23T07:07:31.336Z",
  // //   "customMetadata": {}
  // // }
  // const date = new Date()
  // const timestamp = date.getTime()
  // const year = date.getFullYear()
  // const month = date.getMonth()

  return hubBlob().put(`${timestamp}`, file, {
    addRandomSuffix: true,
    prefix: `images/${category}/${year}/${month}`,
  })
})
