use master;
drop database if exists galerija;
go
create database galerija;
go
use galerija;


create table slika (
	sifra int not null primary key identity(1,1),
	naslov varchar (50) not null,
	datum datetime not null,
	album int not null,
	lokacija int not null
);

create table album (
	sifra int not null primary key identity(1,1),
	naslov varchar (50) not null,
	opis varchar (200) not null,
);

create table komentar (
	sifra int not null primary key identity(1,1),
	sadrzaj varchar (50) not null,
	slika int not null,
	datum datetime not null,	
);

create table lokacija (
	sifra int not null primary key identity(1,1),
	naziv varchar (50) not null,
	koordinate varchar (50) not null,
);

create table tag_slika (
	tag int not null,
	slika int not null,
);

create table tag (
	sifra int not null primary key identity(1,1),
	naziv varchar (50) not null,
);


alter table slika add foreign key (album) references album(sifra);
alter table slika add foreign key (lokacija) references lokacija(sifra);
alter table komentar add foreign key (slika) references slika(sifra);
alter table tag_slika add foreign key (tag) references tag(sifra);
alter table tag_slika add foreign key (slika) references slika(sifra);

insert into album (naslov,opis)
values 
('album1','opis albuma'),
('album2','opis albuma'),
('album3','opis albuma');

insert into lokacija (naziv,koordinate)
values 
('Osijek','45.33 N 18.41 E'),
('Kopacki Rit','45.36 N 18.47 E'),
('Vis','43.2 N 16.9 E');

insert into slika (naslov,datum,album,lokacija)
values 
('slika1','2020-03-12',1,1),
('slika2','2022-02-14',3,2),
('slika3','2021-06-03',2,3),
('slika4','2022-12-04',2,2),
('slika5','2023-04-21',1,1),
('slika6','2023-05-18',3,3);

insert into komentar (sadrzaj,slika,datum)
values 
('komentar 1',1,'2020-03-13'),
('komentar 2',2,'2022-02-16'),
('komentar 3',3,'2021-06-05'),
('komentar 4',4,'2022-12-04'),
('komentar 5',5,'2023-04-22'),
('komentar 6',6,'2023-05-19');

insert into tag (naziv)
values 
('zena'),
('moda'),
('sminka'),
('otok'),
('more'),
('suma'),
('galaksija'),
('zvijezde'),
('mjesec');

insert into tag_slika (tag,slika)
values 
(1,1),
(2,1),
(3,1),
(1,2),
(2,2),
(3,2),
(4,3),
(5,3),
(6,3),
(4,4),
(5,4),
(6,4),
(7,5),
(8,5),
(9,6),
(7,6),
(8,6),
(9,6);