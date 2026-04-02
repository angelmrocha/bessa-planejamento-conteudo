CREATE TABLE `postNotes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`status` varchar(50) NOT NULL DEFAULT 'planejado',
	`observations` text,
	`changes` text,
	`publishDate` varchar(50),
	`performance` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `postNotes_id` PRIMARY KEY(`id`)
);
