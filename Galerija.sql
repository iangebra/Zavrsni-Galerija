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