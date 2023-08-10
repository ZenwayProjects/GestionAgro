--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

-- Started on 2023-03-28 12:27:30 -05

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
-- TOC entry 3358 (class 1262 OID 16411)
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
-- TOC entry 3359 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 16433)
-- Name: persona; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.persona (
    per_id bigint NOT NULL,
    per_nombre character varying(20) NOT NULL,
    per_apellido character varying(20) NOT NULL,
    per_genero character(1) NOT NULL,
    fecha_nacimiento date,
    per_email character varying(255) NOT NULL,
    per_estado integer NOT NULL,
    identificacion character varying(120) NOT NULL,
    tipo_identificacion character(2) NOT NULL
);


ALTER TABLE public.persona OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16442)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 3351 (class 0 OID 16433)
-- Dependencies: 209
-- Data for Name: persona; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.persona (per_id, per_nombre, per_apellido, per_genero, fecha_nacimiento, per_email, per_estado, identificacion, tipo_identificacion) FROM stdin;
\.


--
-- TOC entry 3352 (class 0 OID 16442)
-- Dependencies: 210
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario  FROM stdin;
\.


--
-- TOC entry 3211 (class 2606 OID 16441)
-- Name: persona persona_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.persona
    ADD CONSTRAINT persona_un UNIQUE (per_id, per_email);


-- Completed on 2023-03-28 12:27:31 -05

--
-- PostgreSQL database dump complete
--

