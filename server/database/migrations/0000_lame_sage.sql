CREATE TABLE `category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`alias` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `friend` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nickname` text NOT NULL,
	`blog_name` text NOT NULL,
	`avatar` text NOT NULL,
	`email` text NOT NULL,
	`introduction` text NOT NULL,
	`link` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`status` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`alias` text,
	`category_id` integer NOT NULL,
	`description` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`enabled` integer NOT NULL,
	`is_sticky` integer NOT NULL,
	`cover` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `post_2_tag` (
	`post_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	PRIMARY KEY(`post_id`, `tag_id`)
);
--> statement-breakpoint
CREATE TABLE `project` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`repository` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`` text,
	`preview` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `says` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`author` text,
	`from` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tag` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `category_name_unique` ON `category` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `category_alias_unique` ON `category` (`alias`);--> statement-breakpoint
CREATE UNIQUE INDEX `post_alias_unique` ON `post` (`alias`);--> statement-breakpoint
CREATE UNIQUE INDEX `project_name_unique` ON `project` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `tag_name_unique` ON `tag` (`name`);