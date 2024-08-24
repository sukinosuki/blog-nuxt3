CREATE TABLE `friend` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`site_name` text NOT NULL,
	`avatar` text,
	`email` text,
	`nickname` text,
	`introduction` text NOT NULL,
	`link` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`status` integer NOT NULL
);
