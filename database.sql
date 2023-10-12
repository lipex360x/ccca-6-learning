DROP SCHEMA IF EXISTS public CASCADE;

create schema public;

create table public.items (
	id_item serial primary key,
	category text,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight integer
);

insert into public.items (category, description, price, width, height, length, weight) values ('Instrumentos Musicais', 'Guitarra', 1000, 100, 50, 15, 3);
insert into public.items (category, description, price, width, height, length, weight) values ('Instrumentos Musicais', 'Amplificador', 5000, 50, 50, 50, 22);
insert into public.items (category, description, price, width, height, length, weight) values ('Acessórios', 'Cabo', 30, 10, 10, 10, 1);

create table public.coupons (
	code text,
	percentage numeric,
	expire_date timestamp,
	primary key (code)
);

insert into public.coupons (code, percentage, expire_date) values ('VALE20', 20, '2022-10-10T10:00:00');
insert into public.coupons (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2020-10-10T10:00:00');

create table public.orders (
	id_order serial,
	coupon_code text,
	coupon_percentage numeric,
	code text,
	cpf text,
	issue_date timestamp,
	freight numeric,
	sequence integer,
	total numeric,
	primary key (id_order)
);

create table public.order_items (
	id_order integer,
	id_item integer,
	price numeric,
	quantity integer,
	primary key (id_order, id_item)
);
