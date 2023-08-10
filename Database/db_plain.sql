--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

-- Started on 2023-05-18 17:49:26 -05

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
-- TOC entry 3412 (class 1262 OID 16411)
-- Name: gestagro; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE gestagro WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


ALTER DATABASE gestagro OWNER TO postgres;

\connect gestagro

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
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16482)
-- Name: perfil; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perfil (
    per_id bigint NOT NULL,
    per_nombre character varying,
    per_perfil character varying,
    per_estado integer
);


ALTER TABLE public.perfil OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16485)
-- Name: perfil_per_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.perfil_per_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.perfil_per_id_seq OWNER TO postgres;

--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 215
-- Name: perfil_per_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perfil_per_id_seq OWNED BY public.perfil.per_id;


--
-- TOC entry 222 (class 1259 OID 16535)
-- Name: perfil_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.perfil_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.perfil_seq OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16433)
-- Name: persona; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.persona (
    per_nombre character varying(20) NOT NULL,
    per_apellido character varying(20) NOT NULL,
    per_genero character(1) NOT NULL,
    fecha_nacimiento date,
    per_email character varying(255) NOT NULL,
    per_estado integer NOT NULL,
    per_identificacion character varying(120) NOT NULL,
    tipo_identificacion character(3) NOT NULL,
    per_id bigint NOT NULL,
    per_direccion character varying,
    per_telefono bigint
);


ALTER TABLE public.persona OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16453)
-- Name: persona_per_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.persona_per_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.persona_per_id_seq OWNER TO postgres;

--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 211
-- Name: persona_per_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.persona_per_id_seq OWNED BY public.persona.per_id;


--
-- TOC entry 220 (class 1259 OID 16520)
-- Name: persona_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.persona_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.persona_seq OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16526)
-- Name: personas_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.personas_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.personas_seq OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16442)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    usu_id bigint NOT NULL,
    usu_persona bigint NOT NULL,
    usu_login character varying(20),
    usu_password character varying NOT NULL,
    usu_estado integer
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16497)
-- Name: usuario_perfil; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario_perfil (
    usp_id bigint NOT NULL,
    usp_usuario integer NOT NULL,
    usp_perfil integer NOT NULL,
    usp_estado integer,
    per_id bigint,
    usu_id bigint
);


ALTER TABLE public.usuario_perfil OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16546)
-- Name: usuario_perfil_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_perfil_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_perfil_seq OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16494)
-- Name: usuario_perfil_usp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_perfil_usp_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_perfil_usp_id_seq OWNER TO postgres;

--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 216
-- Name: usuario_perfil_usp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_perfil_usp_id_seq OWNED BY public.usuario_perfil.usp_id;


--
-- TOC entry 218 (class 1259 OID 16496)
-- Name: usuario_perfil_usp_perfil_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_perfil_usp_perfil_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_perfil_usp_perfil_seq OWNER TO postgres;

--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 218
-- Name: usuario_perfil_usp_perfil_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_perfil_usp_perfil_seq OWNED BY public.usuario_perfil.usp_perfil;


--
-- TOC entry 217 (class 1259 OID 16495)
-- Name: usuario_perfil_usp_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_perfil_usp_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_perfil_usp_usuario_seq OWNER TO postgres;

--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuario_perfil_usp_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_perfil_usp_usuario_seq OWNED BY public.usuario_perfil.usp_usuario;


--
-- TOC entry 223 (class 1259 OID 16536)
-- Name: usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_seq OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16462)
-- Name: usuario_usu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_usu_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_usu_id_seq OWNER TO postgres;

--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 212
-- Name: usuario_usu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_usu_id_seq OWNED BY public.usuario.usu_id;


--
-- TOC entry 213 (class 1259 OID 16469)
-- Name: usuario_usu_persona_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_usu_persona_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_usu_persona_seq OWNER TO postgres;

--
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 213
-- Name: usuario_usu_persona_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_usu_persona_seq OWNED BY public.usuario.usu_persona;


--
-- TOC entry 3233 (class 2604 OID 16486)
-- Name: perfil per_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil ALTER COLUMN per_id SET DEFAULT nextval('public.perfil_per_id_seq'::regclass);


--
-- TOC entry 3230 (class 2604 OID 16454)
-- Name: persona per_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.persona ALTER COLUMN per_id SET DEFAULT nextval('public.persona_per_id_seq'::regclass);


--
-- TOC entry 3231 (class 2604 OID 16463)
-- Name: usuario usu_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN usu_id SET DEFAULT nextval('public.usuario_usu_id_seq'::regclass);


--
-- TOC entry 3232 (class 2604 OID 16470)
-- Name: usuario usu_persona; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN usu_persona SET DEFAULT nextval('public.usuario_usu_persona_seq'::regclass);


--
-- TOC entry 3234 (class 2604 OID 16500)
-- Name: usuario_perfil usp_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_perfil ALTER COLUMN usp_id SET DEFAULT nextval('public.usuario_perfil_usp_id_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 16501)
-- Name: usuario_perfil usp_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_perfil ALTER COLUMN usp_usuario SET DEFAULT nextval('public.usuario_perfil_usp_usuario_seq'::regclass);


--
-- TOC entry 3236 (class 2604 OID 16502)
-- Name: usuario_perfil usp_perfil; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_perfil ALTER COLUMN usp_perfil SET DEFAULT nextval('public.usuario_perfil_usp_perfil_seq'::regclass);


--
-- TOC entry 3396 (class 0 OID 16482)
-- Dependencies: 214
-- Data for Name: perfil; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.perfil (per_id, per_nombre, per_perfil, per_estado) FROM stdin;
1	dueño	admin	1
2	obrero	cliente	1
\.


--
-- TOC entry 3391 (class 0 OID 16433)
-- Dependencies: 209
-- Data for Name: persona; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.persona (per_nombre, per_apellido, per_genero, fecha_nacimiento, per_email, per_estado, per_identificacion, tipo_identificacion, per_id, per_direccion, per_telefono) FROM stdin;
Davincho	Oliveros	M	2001-10-14	davincho15@gmail.com	2	100394292	CC 	102	callepotreritos23	312342412
JORGE	Miranda	M	2000-10-13	jemiranda003@gmail.com	1	1003805004	PP 	152	dasdasd	213123213
Juan	Perez	M	2023-04-15	jhonp2@gmail.com	0	1006784567	CC 	202	adsdas	213124213
Matilde	Persa	M	2023-04-10	matildelacrack@gmail.com	0	1002323414	TI 	203	asdasd	12321324
Prueba2	prueba2	F	2023-04-18	jhonpulido762@gmail.com	0	1131331231	CC 	205	asdasdas	312312312
\.


--
-- TOC entry 3392 (class 0 OID 16442)
-- Dependencies: 210
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (usu_id, usu_persona, usu_login, usu_password, usu_estado) FROM stdin;
102	102	Zenway	$2a$10$VUvpFxt6z8mfhxkN1AhgkuJFODivOPASMEE5.EeXOmpMU2Md.V.B.	1
\.


--
-- TOC entry 3401 (class 0 OID 16497)
-- Dependencies: 219
-- Data for Name: usuario_perfil; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario_perfil (usp_id, usp_usuario, usp_perfil, usp_estado, per_id, usu_id) FROM stdin;
1	102	1	1	\N	\N
2	102	2	1	\N	\N
\.


--
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 215
-- Name: perfil_per_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.perfil_per_id_seq', 1, true);


--
-- TOC entry 3422 (class 0 OID 0)
-- Dependencies: 222
-- Name: perfil_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.perfil_seq', 1, false);


--
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 211
-- Name: persona_per_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.persona_per_id_seq', 2, true);


--
-- TOC entry 3424 (class 0 OID 0)
-- Dependencies: 220
-- Name: persona_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.persona_seq', 251, true);


--
-- TOC entry 3425 (class 0 OID 0)
-- Dependencies: 221
-- Name: personas_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.personas_seq', 101, true);


--
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 224
-- Name: usuario_perfil_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_perfil_seq', 1, false);


--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 216
-- Name: usuario_perfil_usp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_perfil_usp_id_seq', 1, false);


--
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 218
-- Name: usuario_perfil_usp_perfil_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_perfil_usp_perfil_seq', 1, false);


--
-- TOC entry 3429 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuario_perfil_usp_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_perfil_usp_usuario_seq', 1, false);


--
-- TOC entry 3430 (class 0 OID 0)
-- Dependencies: 223
-- Name: usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_seq', 1, false);


--
-- TOC entry 3431 (class 0 OID 0)
-- Dependencies: 212
-- Name: usuario_usu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_usu_id_seq', 1, false);


--
-- TOC entry 3432 (class 0 OID 0)
-- Dependencies: 213
-- Name: usuario_usu_persona_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_usu_persona_seq', 1, false);


--
-- TOC entry 3246 (class 2606 OID 16493)
-- Name: perfil perfil_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil
    ADD CONSTRAINT perfil_pk PRIMARY KEY (per_id);


--
-- TOC entry 3238 (class 2606 OID 16459)
-- Name: persona persona_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.persona
    ADD CONSTRAINT persona_pk PRIMARY KEY (per_id);


--
-- TOC entry 3240 (class 2606 OID 16461)
-- Name: persona persona_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.persona
    ADD CONSTRAINT persona_un UNIQUE (per_id, per_email);


--
-- TOC entry 3242 (class 2606 OID 16468)
-- Name: usuario usuario_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pk PRIMARY KEY (usu_id);


--
-- TOC entry 3244 (class 2606 OID 16545)
-- Name: usuario usuario_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_unique UNIQUE (usu_persona);


--
-- TOC entry 3250 (class 2606 OID 16547)
-- Name: usuario_perfil fkfl7h7xxp93knsncgoyu3hw7xd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_perfil
    ADD CONSTRAINT fkfl7h7xxp93knsncgoyu3hw7xd FOREIGN KEY (per_id) REFERENCES public.perfil(per_id);


--
-- TOC entry 3251 (class 2606 OID 16552)
-- Name: usuario_perfil fkpgamruj84s696jkyx7heqbjnj; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_perfil
    ADD CONSTRAINT fkpgamruj84s696jkyx7heqbjnj FOREIGN KEY (usu_id) REFERENCES public.usuario(usu_id);


--
-- TOC entry 3247 (class 2606 OID 16475)
-- Name: usuario usuario_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_fk FOREIGN KEY (usu_persona) REFERENCES public.persona(per_id);


--
-- TOC entry 3248 (class 2606 OID 16503)
-- Name: usuario_perfil usuario_perfil_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_perfil
    ADD CONSTRAINT usuario_perfil_fk FOREIGN KEY (usp_usuario) REFERENCES public.usuario(usu_id);


--
-- TOC entry 3249 (class 2606 OID 16508)
-- Name: usuario_perfil usuario_perfil_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_perfil
    ADD CONSTRAINT usuario_perfil_fk_1 FOREIGN KEY (usp_perfil) REFERENCES public.perfil(per_id);


-- Completed on 2023-05-18 17:49:26 -05

--
-- PostgreSQL database dump complete
--

