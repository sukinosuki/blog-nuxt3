import { relations } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const tag = sqliteTable('tag', {

  id: integer('id').primaryKey({ autoIncrement: true }),

  name: text('name').notNull().unique(),

  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),

  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

export const post = sqliteTable('post', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  title: text('title').notNull(),

  content: text('content').notNull(),

  alias: text('alias').unique(),

  category_id: integer('category_id').notNull(), // .references(() => category.id),

  description: text('description').notNull(),

  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),

  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),

  enabled: integer('enabled', { mode: 'boolean' }).notNull(),

  is_sticky: integer('is_sticky', { mode: 'boolean' }).notNull(),

  cover: text('cover').notNull(),
})

export const category = sqliteTable('category', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  name: text('name').notNull().unique(),

  alias: text('alias').unique(),

  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),

  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

export const says = sqliteTable('says', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  author: text('author'),
  source: text('source'),
  text: text('text').notNull(),
  enabled: integer('enabled', { mode: 'boolean' }).notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

export const friend = sqliteTable('friend', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nickname: text('nickname').notNull(),
  blog_name: text('blog_name').notNull(),
  avatar: text('avatar').notNull(),
  email: text('email').notNull(),
  introduction: text('introduction').notNull(),
  link: text('link').notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
  status: integer('status').notNull(),
})

export const project = sqliteTable('project', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  repository: text('repository').notNull(),
  name: text('name').unique().notNull(),
  description: text('description').notNull(),
  cover: text(''),
  preview: text('preview'),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

export const post_2_tag = sqliteTable('post_2_tag', {
  post_id: integer('post_id').notNull(),
  tag_id: integer('tag_id').notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.post_id, table.tag_id] }),
  }
})

export const postRelations = relations(post, ({ many, one }) => ({
  post2tag: many(post_2_tag),
  category: one(category, {
    fields: [post.category_id],
    references: [category.id],
  }),
}))

export const post2tagRelations = relations(post_2_tag, ({ one }) => ({
  post: one(post, {
    fields: [post_2_tag.post_id],
    references: [post.id],
  }),
  tag: one(tag, {
    fields: [post_2_tag.tag_id],
    references: [tag.id],
  }),
}))
