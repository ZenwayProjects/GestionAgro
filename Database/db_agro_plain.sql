--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-03-16 23:59:36

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16453)
-- Name: PERFILES; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PERFILES" (
    perfil_id bigint NOT NULL,
    perfil_nombre character varying(128) NOT NULL,
    perfil_estado boolean NOT NULL,
    perfil_desc character varying
);


ALTER TABLE public."PERFILES" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16452)
-- Name: PERFIL_PERFIL_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PERFIL_PERFIL_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PERFIL_PERFIL_ID_seq" OWNER TO postgres;

--
-- TOC entry 3369 (class 0 OID 0)
-- Dependencies: 219
-- Name: PERFIL_PERFIL_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PERFIL_PERFIL_ID_seq" OWNED BY public."PERFILES".perfil_id;


--
-- TOC entry 216 (class 1259 OID 16438)
-- Name: PERSONAS_EMPRESAS; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PERSONAS_EMPRESAS" (
    persona_empresa_id bigint NOT NULL,
    identificacion bigint NOT NULL
);


ALTER TABLE public."PERSONAS_EMPRESAS" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16437)
-- Name: PERSONA_EMPRESA_IDENTIFICACION_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PERSONA_EMPRESA_IDENTIFICACION_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PERSONA_EMPRESA_IDENTIFICACION_seq" OWNER TO postgres;

--
-- TOC entry 3370 (class 0 OID 0)
-- Dependencies: 215
-- Name: PERSONA_EMPRESA_IDENTIFICACION_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PERSONA_EMPRESA_IDENTIFICACION_seq" OWNED BY public."PERSONAS_EMPRESAS".identificacion;


--
-- TOC entry 214 (class 1259 OID 16436)
-- Name: PERSONA_EMPRESA_PERSONA_EMPRESA_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PERSONA_EMPRESA_PERSONA_EMPRESA_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PERSONA_EMPRESA_PERSONA_EMPRESA_ID_seq" OWNER TO postgres;

--
-- TOC entry 3371 (class 0 OID 0)
-- Dependencies: 214
-- Name: PERSONA_EMPRESA_PERSONA_EMPRESA_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PERSONA_EMPRESA_PERSONA_EMPRESA_ID_seq" OWNED BY public."PERSONAS_EMPRESAS".persona_empresa_id;


--
-- TOC entry 225 (class 1259 OID 24584)
-- Name: PERSONA_EMPRESA_PERSONA_EMPRESA_ID_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."PERSONAS_EMPRESAS" ALTER COLUMN persona_empresa_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."PERSONA_EMPRESA_PERSONA_EMPRESA_ID_seq1"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16446)
-- Name: USUARIOS; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."USUARIOS" (
    usuario_id bigint NOT NULL,
    username character varying(122) NOT NULL,
    usuario_estado boolean NOT NULL,
    persona_empresa_id bigint NOT NULL
);


ALTER TABLE public."USUARIOS" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16463)
-- Name: USUARIOS_PERFILES; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."USUARIOS_PERFILES" (
    usuario_id bigint NOT NULL,
    perfil_id bigint NOT NULL,
    usuario_perfil_estado boolean NOT NULL
);


ALTER TABLE public."USUARIOS_PERFILES" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16462)
-- Name: USUARIO_PERFIL_PERFIL_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."USUARIO_PERFIL_PERFIL_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."USUARIO_PERFIL_PERFIL_ID_seq" OWNER TO postgres;

--
-- TOC entry 3372 (class 0 OID 0)
-- Dependencies: 222
-- Name: USUARIO_PERFIL_PERFIL_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."USUARIO_PERFIL_PERFIL_ID_seq" OWNED BY public."USUARIOS_PERFILES".perfil_id;


--
-- TOC entry 221 (class 1259 OID 16461)
-- Name: USUARIO_PERFIL_USUARIO_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."USUARIO_PERFIL_USUARIO_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."USUARIO_PERFIL_USUARIO_ID_seq" OWNER TO postgres;

--
-- TOC entry 3373 (class 0 OID 0)
-- Dependencies: 221
-- Name: USUARIO_PERFIL_USUARIO_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."USUARIO_PERFIL_USUARIO_ID_seq" OWNED BY public."USUARIOS_PERFILES".usuario_id;


--
-- TOC entry 224 (class 1259 OID 16480)
-- Name: USUARIO_PERSONA_EMPRESA_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."USUARIO_PERSONA_EMPRESA_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."USUARIO_PERSONA_EMPRESA_ID_seq" OWNER TO postgres;

--
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 224
-- Name: USUARIO_PERSONA_EMPRESA_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."USUARIO_PERSONA_EMPRESA_ID_seq" OWNED BY public."USUARIOS".persona_empresa_id;


--
-- TOC entry 217 (class 1259 OID 16445)
-- Name: USUARIO_USUARIO_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."USUARIO_USUARIO_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."USUARIO_USUARIO_ID_seq" OWNER TO postgres;

--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 217
-- Name: USUARIO_USUARIO_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."USUARIO_USUARIO_ID_seq" OWNED BY public."USUARIOS".usuario_id;


--
-- TOC entry 3195 (class 2604 OID 16456)
-- Name: PERFILES perfil_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PERFILES" ALTER COLUMN perfil_id SET DEFAULT nextval('public."PERFIL_PERFIL_ID_seq"'::regclass);


--
-- TOC entry 3192 (class 2604 OID 16442)
-- Name: PERSONAS_EMPRESAS identificacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PERSONAS_EMPRESAS" ALTER COLUMN identificacion SET DEFAULT nextval('public."PERSONA_EMPRESA_IDENTIFICACION_seq"'::regclass);


--
-- TOC entry 3193 (class 2604 OID 16449)
-- Name: USUARIOS usuario_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."USUARIOS" ALTER COLUMN usuario_id SET DEFAULT nextval('public."USUARIO_USUARIO_ID_seq"'::regclass);


--
-- TOC entry 3194 (class 2604 OID 16481)
-- Name: USUARIOS persona_empresa_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."USUARIOS" ALTER COLUMN persona_empresa_id SET DEFAULT nextval('public."USUARIO_PERSONA_EMPRESA_ID_seq"'::regclass);


--
-- TOC entry 3196 (class 2604 OID 16466)
-- Name: USUARIOS_PERFILES usuario_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."USUARIOS_PERFILES" ALTER COLUMN usuario_id SET DEFAULT nextval('public."USUARIO_PERFIL_USUARIO_ID_seq"'::regclass);


--
-- TOC entry 3197 (class 2604 OID 16467)
-- Name: USUARIOS_PERFILES perfil_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."USUARIOS_PERFILES" ALTER COLUMN perfil_id SET DEFAULT nextval('public."USUARIO_PERFIL_PERFIL_ID_seq"'::regclass);


--
-- TOC entry 3358 (class 0 OID 16453)
-- Dependencies: 220
-- Data for Name: PERFILES; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PERFILES" (perfil_id, perfil_nombre, perfil_estado, perfil_desc) FROM stdin;
\.


--
-- TOC entry 3354 (class 0 OID 16438)
-- Dependencies: 216
-- Data for Name: PERSONAS_EMPRESAS; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PERSONAS_EMPRESAS" (persona_empresa_id, identificacion) FROM stdin;
0	1003944857
1	1003950687
\.


--
-- TOC entry 3356 (class 0 OID 16446)
-- Dependencies: 218
-- Data for Name: USUARIOS; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."USUARIOS" (usuario_id, username, usuario_estado, persona_empresa_id) FROM stdin;
\.


--
-- TOC entry 3361 (class 0 OID 16463)
-- Dependencies: 223
-- Data for Name: USUARIOS_PERFILES; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."USUARIOS_PERFILES" (usuario_id, perfil_id, usuario_perfil_estado) FROM stdin;
\.


--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 219
-- Name: PERFIL_PERFIL_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PERFIL_PERFIL_ID_seq"', 1, false);


--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 215
-- Name: PERSONA_EMPRESA_IDENTIFICACION_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PERSONA_EMPRESA_IDENTIFICACION_seq"', 1, false);


--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 214
-- Name: PERSONA_EMPRESA_PERSONA_EMPRESA_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PERSONA_EMPRESA_PERSONA_EMPRESA_ID_seq"', 1, false);


--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 225
-- Name: PERSONA_EMPRESA_PERSONA_EMPRESA_ID_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PERSONA_EMPRESA_PERSONA_EMPRESA_ID_seq1"', 1, true);


--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 222
-- Name: USUARIO_PERFIL_PERFIL_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."USUARIO_PERFIL_PERFIL_ID_seq"', 1, false);


--
-- TOC entry 3381 (class 0 OID 0)
-- Dependencies: 221
-- Name: USUARIO_PERFIL_USUARIO_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."USUARIO_PERFIL_USUARIO_ID_seq"', 1, false);


--
-- TOC entry 3382 (class 0 OID 0)
-- Dependencies: 224
-- Name: USUARIO_PERSONA_EMPRESA_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."USUARIO_PERSONA_EMPRESA_ID_seq"', 1, false);


--
-- TOC entry 3383 (class 0 OID 0)
-- Dependencies: 217
-- Name: USUARIO_USUARIO_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."USUARIO_USUARIO_ID_seq"', 1, false);


--
-- TOC entry 3204 (class 2606 OID 16460)
-- Name: PERFILES PERFIL_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PERFILES"
    ADD CONSTRAINT "PERFIL_pkey" PRIMARY KEY (perfil_id);


--
-- TOC entry 3199 (class 2606 OID 16444)
-- Name: PERSONAS_EMPRESAS PERSONA_EMPRESA_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PERSONAS_EMPRESAS"
    ADD CONSTRAINT "PERSONA_EMPRESA_pkey" PRIMARY KEY (persona_empresa_id);


--
-- TOC entry 3201 (class 2606 OID 16451)
-- Name: USUARIOS USUARIO_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."USUARIOS"
    ADD CONSTRAINT "USUARIO_pkey" PRIMARY KEY (usuario_id);


--
-- TOC entry 3205 (class 1259 OID 16479)
-- Name: fki_PERFIL_ID; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_PERFIL_ID" ON public."USUARIOS_PERFILES" USING btree (perfil_id);


--
-- TOC entry 3202 (class 1259 OID 16496)
-- Name: fki_PERSONA_EMPRESA_ID; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_PERSONA_EMPRESA_ID" ON public."USUARIOS" USING btree (persona_empresa_id);


--
-- TOC entry 3206 (class 1259 OID 16473)
-- Name: fki_USUARIO_ID; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_USUARIO_ID" ON public."USUARIOS_PERFILES" USING btree (usuario_id);


--
-- TOC entry 3208 (class 2606 OID 16474)
-- Name: USUARIOS_PERFILES PERFIL_ID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."USUARIOS_PERFILES"
    ADD CONSTRAINT "PERFIL_ID" FOREIGN KEY (perfil_id) REFERENCES public."PERFILES"(perfil_id) NOT VALID;


--
-- TOC entry 3207 (class 2606 OID 16491)
-- Name: USUARIOS PERSONA_EMPRESA_ID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."USUARIOS"
    ADD CONSTRAINT "PERSONA_EMPRESA_ID" FOREIGN KEY (persona_empresa_id) REFERENCES public."PERSONAS_EMPRESAS"(persona_empresa_id) NOT VALID;


--
-- TOC entry 3209 (class 2606 OID 16468)
-- Name: USUARIOS_PERFILES USUARIO_ID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."USUARIOS_PERFILES"
    ADD CONSTRAINT "USUARIO_ID" FOREIGN KEY (usuario_id) REFERENCES public."USUARIOS"(usuario_id) NOT VALID;


-- Completed on 2023-03-16 23:59:37

--
-- PostgreSQL database dump complete
--

