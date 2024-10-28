--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8 (Homebrew)
-- Dumped by pg_dump version 16.0

-- Started on 2024-10-29 01:45:48 +04

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16390)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3688 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16402)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16401)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 3689 (class 0 OID 0)
-- Dependencies: 215
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 218 (class 1259 OID 16430)
-- Name: search; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.search (
    id integer NOT NULL,
    datetime timestamp with time zone NOT NULL,
    payload jsonb NOT NULL,
    results json NOT NULL
);


ALTER TABLE public.search OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16429)
-- Name: search_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.search_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.search_id_seq OWNER TO postgres;

--
-- TOC entry 3690 (class 0 OID 0)
-- Dependencies: 217
-- Name: search_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.search_id_seq OWNED BY public.search.id;


--
-- TOC entry 219 (class 1259 OID 16446)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    email character varying NOT NULL,
    firstname character varying NOT NULL,
    surname character varying NOT NULL,
    "hashedPassword" character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3527 (class 2604 OID 16405)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3528 (class 2604 OID 16433)
-- Name: search id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.search ALTER COLUMN id SET DEFAULT nextval('public.search_id_seq'::regclass);


--
-- TOC entry 3679 (class 0 OID 16402)
-- Dependencies: 216
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
3	1730104412315	AddSearchEntity1730104412315
5	1730129253617	AddUsersEntity1730129253617
\.


--
-- TOC entry 3681 (class 0 OID 16430)
-- Dependencies: 218
-- Data for Name: search; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.search (id, datetime, payload, results) FROM stdin;
17	2024-10-28 18:11:23.386+04	{"search": "sky"}	{"count":3,"next":null,"previous":null,"results":[{"name":"Luke Skywalker","height":"172","mass":"77","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"19BBY","gender":"male","homeworld":"https://swapi.dev/api/planets/1/","films":["https://swapi.dev/api/films/1/","https://swapi.dev/api/films/2/","https://swapi.dev/api/films/3/","https://swapi.dev/api/films/6/"],"species":[],"vehicles":["https://swapi.dev/api/vehicles/14/","https://swapi.dev/api/vehicles/30/"],"starships":["https://swapi.dev/api/starships/12/","https://swapi.dev/api/starships/22/"],"created":"2014-12-09T13:50:51.644000Z","edited":"2014-12-20T21:17:56.891000Z","url":"https://swapi.dev/api/people/1/"},{"name":"Anakin Skywalker","height":"188","mass":"84","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"41.9BBY","gender":"male","homeworld":"https://swapi.dev/api/planets/1/","films":["https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],"species":[],"vehicles":["https://swapi.dev/api/vehicles/44/","https://swapi.dev/api/vehicles/46/"],"starships":["https://swapi.dev/api/starships/39/","https://swapi.dev/api/starships/59/","https://swapi.dev/api/starships/65/"],"created":"2014-12-10T16:20:44.310000Z","edited":"2014-12-20T21:17:50.327000Z","url":"https://swapi.dev/api/people/11/"},{"name":"Shmi Skywalker","height":"163","mass":"unknown","hair_color":"black","skin_color":"fair","eye_color":"brown","birth_year":"72BBY","gender":"female","homeworld":"https://swapi.dev/api/planets/1/","films":["https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/"],"species":[],"vehicles":[],"starships":[],"created":"2014-12-19T17:57:41.191000Z","edited":"2014-12-20T21:17:50.401000Z","url":"https://swapi.dev/api/people/43/"}]}
18	2024-10-28 18:11:33.651+04	{"search": "skyasdasds"}	{"count":0,"next":null,"previous":null,"results":[]}
19	2024-10-28 20:46:55.156+04	{"search": "sky"}	{"count":3,"next":null,"previous":null,"results":[{"name":"Luke Skywalker","height":"172","mass":"77","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"19BBY","gender":"male","homeworld":"https://swapi.dev/api/planets/1/","films":["https://swapi.dev/api/films/1/","https://swapi.dev/api/films/2/","https://swapi.dev/api/films/3/","https://swapi.dev/api/films/6/"],"species":[],"vehicles":["https://swapi.dev/api/vehicles/14/","https://swapi.dev/api/vehicles/30/"],"starships":["https://swapi.dev/api/starships/12/","https://swapi.dev/api/starships/22/"],"created":"2014-12-09T13:50:51.644000Z","edited":"2014-12-20T21:17:56.891000Z","url":"https://swapi.dev/api/people/1/"},{"name":"Anakin Skywalker","height":"188","mass":"84","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"41.9BBY","gender":"male","homeworld":"https://swapi.dev/api/planets/1/","films":["https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],"species":[],"vehicles":["https://swapi.dev/api/vehicles/44/","https://swapi.dev/api/vehicles/46/"],"starships":["https://swapi.dev/api/starships/39/","https://swapi.dev/api/starships/59/","https://swapi.dev/api/starships/65/"],"created":"2014-12-10T16:20:44.310000Z","edited":"2014-12-20T21:17:50.327000Z","url":"https://swapi.dev/api/people/11/"},{"name":"Shmi Skywalker","height":"163","mass":"unknown","hair_color":"black","skin_color":"fair","eye_color":"brown","birth_year":"72BBY","gender":"female","homeworld":"https://swapi.dev/api/planets/1/","films":["https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/"],"species":[],"vehicles":[],"starships":[],"created":"2014-12-19T17:57:41.191000Z","edited":"2014-12-20T21:17:50.401000Z","url":"https://swapi.dev/api/people/43/"}]}
20	2024-10-28 20:47:38.468+04	{"search": "asdasdasd"}	{"count":0,"next":null,"previous":null,"results":[]}
21	2024-10-28 20:47:46.584+04	{"search": "adsasd"}	{"count":0,"next":null,"previous":null,"results":[]}
22	2024-10-28 20:47:47.816+04	{"search": "ads"}	{"count":0,"next":null,"previous":null,"results":[]}
23	2024-10-28 20:47:52.572+04	{"search": "anakin"}	{"count":1,"next":null,"previous":null,"results":[{"name":"Anakin Skywalker","height":"188","mass":"84","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"41.9BBY","gender":"male","homeworld":"https://swapi.dev/api/planets/1/","films":["https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],"species":[],"vehicles":["https://swapi.dev/api/vehicles/44/","https://swapi.dev/api/vehicles/46/"],"starships":["https://swapi.dev/api/starships/39/","https://swapi.dev/api/starships/59/","https://swapi.dev/api/starships/65/"],"created":"2014-12-10T16:20:44.310000Z","edited":"2014-12-20T21:17:50.327000Z","url":"https://swapi.dev/api/people/11/"}]}
24	2024-10-28 23:49:24.086+04	{"search": "luke"}	{"count":1,"next":null,"previous":null,"results":[{"name":"Luke Skywalker","height":"172","mass":"77","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"19BBY","gender":"male","homeworld":"https://swapi.dev/api/planets/1/","films":["https://swapi.dev/api/films/1/","https://swapi.dev/api/films/2/","https://swapi.dev/api/films/3/","https://swapi.dev/api/films/6/"],"species":[],"vehicles":["https://swapi.dev/api/vehicles/14/","https://swapi.dev/api/vehicles/30/"],"starships":["https://swapi.dev/api/starships/12/","https://swapi.dev/api/starships/22/"],"created":"2014-12-09T13:50:51.644000Z","edited":"2014-12-20T21:17:56.891000Z","url":"https://swapi.dev/api/people/1/"}]}
25	2024-10-28 23:58:27.816+04	{"search": "ana"}	{"count":4,"next":null,"previous":null,"results":[{"name":"Leia Organa","height":"150","mass":"49","hair_color":"brown","skin_color":"light","eye_color":"brown","birth_year":"19BBY","gender":"female","homeworld":"https://swapi.dev/api/planets/2/","films":["https://swapi.dev/api/films/1/","https://swapi.dev/api/films/2/","https://swapi.dev/api/films/3/","https://swapi.dev/api/films/6/"],"species":[],"vehicles":["https://swapi.dev/api/vehicles/30/"],"starships":[],"created":"2014-12-10T15:20:09.791000Z","edited":"2014-12-20T21:17:50.315000Z","url":"https://swapi.dev/api/people/5/"},{"name":"Anakin Skywalker","height":"188","mass":"84","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"41.9BBY","gender":"male","homeworld":"https://swapi.dev/api/planets/1/","films":["https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],"species":[],"vehicles":["https://swapi.dev/api/vehicles/44/","https://swapi.dev/api/vehicles/46/"],"starships":["https://swapi.dev/api/starships/39/","https://swapi.dev/api/starships/59/","https://swapi.dev/api/starships/65/"],"created":"2014-12-10T16:20:44.310000Z","edited":"2014-12-20T21:17:50.327000Z","url":"https://swapi.dev/api/people/11/"},{"name":"Quarsh Panaka","height":"183","mass":"unknown","hair_color":"black","skin_color":"dark","eye_color":"brown","birth_year":"62BBY","gender":"male","homeworld":"https://swapi.dev/api/planets/8/","films":["https://swapi.dev/api/films/4/"],"species":[],"vehicles":[],"starships":[],"created":"2014-12-19T17:55:43.348000Z","edited":"2014-12-20T21:17:50.399000Z","url":"https://swapi.dev/api/people/42/"},{"name":"Bail Prestor Organa","height":"191","mass":"unknown","hair_color":"black","skin_color":"tan","eye_color":"brown","birth_year":"67BBY","gender":"male","homeworld":"https://swapi.dev/api/planets/2/","films":["https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],"species":["https://swapi.dev/api/species/1/"],"vehicles":[],"starships":[],"created":"2014-12-20T16:53:08.575000Z","edited":"2014-12-20T21:17:50.463000Z","url":"https://swapi.dev/api/people/68/"}]}
\.


--
-- TOC entry 3682 (class 0 OID 16446)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (email, firstname, surname, "hashedPassword") FROM stdin;
iassainov@gmail.com	Ilyas	Assainov	$2a$10$RdnDejDPgI5jjYCF3PToMOiu8sCAvUnyhSkC82e.4Uow3A02UDxRK
hello@gmail.com	User2	Family	$2a$10$gX5AgiIjdPrBW8k/h/M07OR54fuvxv/vD1bLZ5JJtVmDWDUWHLpjW
test@test.com	Test	Test	$2a$10$TGqoVZD9713bB4jOHsupH.J/FWuKcBzhJVY9GtGv8JO85qYWM6gXm
\.


--
-- TOC entry 3691 (class 0 OID 0)
-- Dependencies: 215
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 5, true);


--
-- TOC entry 3692 (class 0 OID 0)
-- Dependencies: 217
-- Name: search_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.search_id_seq', 25, true);


--
-- TOC entry 3533 (class 2606 OID 16437)
-- Name: search PK_0bdd0dc9f37fc71a6050de7ae7f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.search
    ADD CONSTRAINT "PK_0bdd0dc9f37fc71a6050de7ae7f" PRIMARY KEY (id);


--
-- TOC entry 3530 (class 2606 OID 16409)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 3535 (class 2606 OID 16452)
-- Name: users PK_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_97672ac88f789774dd47f7c8be3" PRIMARY KEY (email);


--
-- TOC entry 3531 (class 1259 OID 16438)
-- Name: IDX_SEARCH_DATETIME_PAYLOAD; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "IDX_SEARCH_DATETIME_PAYLOAD" ON public.search USING btree (datetime, payload);


-- Completed on 2024-10-29 01:45:49 +04

--
-- PostgreSQL database dump complete
--

