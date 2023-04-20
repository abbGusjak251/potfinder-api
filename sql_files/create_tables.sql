-- Table: public.measurements

-- DROP TABLE IF EXISTS public.measurements;

DROP TABLE IF EXISTS public.roads CASCADE;
DROP TABLE IF EXISTS public.measurements CASCADE;
DROP TABLE IF EXISTS public.segments CASCADE;
DROP TABLE IF EXISTS public.nodes CASCADE;

CREATE TABLE IF NOT EXISTS public.roads
(
    id SERIAL,
    "updated_at" timestamp without time zone,
    CONSTRAINT roads_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.nodes
(
    id SERIAL,
	lon double precision,
    lat double precision,
    CONSTRAINT nodes_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.segments
(
    id SERIAL,
    "timestamp" timestamp without time zone,
	start_node_id integer NOT NULL,
	end_node_id integer NOT NULL,
	road_id integer NOT NULL,
	FOREIGN KEY (road_id) REFERENCES roads(id) ON DELETE CASCADE,
	FOREIGN KEY (start_node_id) REFERENCES nodes(id) ON DELETE CASCADE,
	FOREIGN KEY (end_node_id) REFERENCES nodes(id) ON DELETE CASCADE,
    CONSTRAINT segments_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.measurements
(
    id SERIAL,
    x float,
    y float,
	z float,
	segment_id integer NOT NULL,
	FOREIGN KEY (segment_id) REFERENCES segments(id) ON DELETE CASCADE,
    CONSTRAINT measurements_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.measurements
    OWNER to postgres;