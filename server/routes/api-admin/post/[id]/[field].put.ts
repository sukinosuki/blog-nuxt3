export default defineEventHandler(async (event) => {
  const { id, field } = getRouterParams(event)

  const { value } = await readBody<API_Post.UpdateField>(event)

  type ValidFieldKey = keyof Pick<API_Post.Model, 'enabled' | 'content' | 'is_pin_to_top'>

  const validField: ValidFieldKey[] = ['content', 'enabled', 'is_pin_to_top']
  if (!validField.includes(field as ValidFieldKey)) {
    // setResponseStatus(event, 404)
    throw createError({
      status: 400,
      message: `field only in [${validField}]`,
    })
  }

  const drizzle = useDrizzle()

  await drizzle
    .update(tables.post)
    .set({
      [field]: value,
    })
    .where(eq(tables.post.id, Number(id)))

  return { message: 'ok' }
})
