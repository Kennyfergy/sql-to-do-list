/*
Below is the create table for your local server, so fun yay!

CREATE TABLE "tasks"(
"id" SERIAL PRIMARY KEY NOT NULL,
"task" varChar(400),
"is_complete" BOOLEAN DEFAULT FALSE
);
INSERT INTO "tasks"
	("task", "is_complete")
VALUES
	('take out the trash', false),
	('finish the weekend homework', true),
	('take the dog for a walk', false),
	('get knocked down', false),
	('get up again', false),
	('never gonna keep me down', true);