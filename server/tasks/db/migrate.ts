import { migrate } from 'drizzle-orm/d1/migrator'

export default defineTask({
  meta: {
    name: 'db:migrate',
    description: 'Run database migrations',
  },

  async run({ payload, context }) {
    // console.log('run db migration task..., payload: ', payload)
    await migrate(useDrizzle(), { migrationsFolder: 'server/database/migrations' })

    console.log('execute db:migrate ')

    return {
      result: 'ok',
    }
  },
})
