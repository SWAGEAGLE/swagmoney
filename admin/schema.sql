create table appuser(fname varchar(20), lname varchar(20), username varchar(20), passwd varchar(20), email varchar(20), numgamesplayed int, lastlogin date);

insert into appuser(fname, lname, username, passwd, email, numgamesplayed, lastlogin) values ('Bob', 'Smith', 'bobby', 'bob', 'bob@example.com', 1, null);
create table scores(username varchar(20), score int, scoretime date);
insert into scores (username, score, scoretime) values ('bobby', 20, null);