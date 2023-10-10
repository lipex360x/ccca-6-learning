SRP - Deve separar coisas que mudam por motivos diferentes

---

```sql
DROP table if EXISTS public.items;

CREATE TABLE public.items (
	id_item SERIAL NOT NULL,
	description TEXT NULL,
	category TEXT NULL,
	price float4 NULL,
 	width numeric NULL,
 	height numeric NULL,
 	length numeric NULL,
 	weight numeric NULL,

  CONSTRAINT "items_pkey" PRIMARY KEY ("id_item")
);

INSERT INTO public.items (description, category, price, width, height, length, weight) VALUES('Guitarra', 'Instrumentos Musicais', 1000.0, 100, 30, 10, 3);
INSERT INTO public.items (description, category, price, width, height, length, weight) VALUES('Amplificador', 'Instrumentos Musicais', 5000.0, 100, 50, 50, 20);
INSERT INTO public.items (description, category, price, width, height, length, weight) VALUES('Acessórios', 'Cabo', 30.0, 10, 10, 10, 1);

```