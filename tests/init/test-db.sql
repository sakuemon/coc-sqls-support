create database if not exists todo;

create table if not exists todo.tasks(
	id          int primary key auto_increment,
	title       varchar(100),
	content     varchar(1000),
	created_at  timestamp not null default current_timestamp,
	finished_at timestamp
);

create database if not exists world;

use world;

create table if not exists world.country(
	id         int primary key auto_increment,
	name       varchar(100),
	created_at timestamp not null default current_timestamp
);
