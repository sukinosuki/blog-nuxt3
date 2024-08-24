export default eventHandler(async (event) => {
  // const res = await migrate(useDrizzle(), { migrationsFolder: '/server/database/migrations' })
  // // const res = await migrate(useDrizzle(), { migrationsFolder: '../../../database/migrations' })
  //   .then(() => {
  //     consola.success('Database migrations done')
  //     return 'Database migrations done'
  //   })
  //   .catch((err) => {
  //     consola.error('Database migrations failed', err)

  //     return err
  //   })

  // return res

  // return 'ok'

  const { result } = await runTask('db:migrate', { payload: { name: '11' } })

  return {
    message: result,
  }
})
