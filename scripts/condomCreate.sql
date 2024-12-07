CREATE TABLE IF NOT EXISTS apartamento
(
    numero integer NOT NULL,
    bloco integer NOT NULL,
    CONSTRAINT apartamento_pkey PRIMARY KEY (numero, bloco)
);

CREATE TABLE IF NOT EXISTS morador
(
    cpf character varying(11) COLLATE pg_catalog."default" NOT NULL,
    nome character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(150) COLLATE pg_catalog."default",
    telefone character varying(15) COLLATE pg_catalog."default",
    ap_num integer NOT NULL,
    ap_bloco integer NOT NULL,
    papel character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT morador_pkey PRIMARY KEY (cpf),
    CONSTRAINT morador_ap_num_ap_bloco_unique UNIQUE (ap_num, ap_bloco),
    CONSTRAINT morador_ap_num_ap_bloco_fkey FOREIGN KEY (ap_num, ap_bloco)
        REFERENCES public.apartamento (numero, bloco) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS mercadoria
(
    cpf_morador character varying(11) COLLATE pg_catalog."default" NOT NULL,
    descricao character varying(255) COLLATE pg_catalog."default" NOT NULL,
    data_rec date NOT NULL,
    data_ent date,
    CONSTRAINT mercadoria_cpf_morador_fkey FOREIGN KEY (cpf_morador)
        REFERENCES morador (cpf) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

INSERT INTO apartamento (numero, bloco) VALUES
(101, 1),
(102, 1),
(103, 1),
(201, 2),
(202, 2),
(203, 2),
(301, 3),
(302, 3),
(303, 3),
(401, 4);

INSERT INTO morador (cpf, nome, email, telefone, ap_num, ap_bloco, papel) VALUES
('11111111111', 'Carlos Silva', 'carlos.silva@gmail.com', '999111222', 101, 1, 'morador'),
('22222222222', 'Ana Souza', 'ana.souza@gmail.com', '999222333', 102, 1, 'morador'),
('33333333333', 'José Lima', 'jose.lima@gmail.com', '999333444', 103, 1, 'síndico'),
('44444444444', 'Maria Oliveira', 'maria.oliveira@gmail.com', '999444555', 201, 2, 'morador'),
('55555555555', 'Paulo Alves', 'paulo.alves@gmail.com', '999555666', 202, 2, 'zelador'),
('66666666666', 'Fernanda Reis', 'fernanda.reis@gmail.com', '999666777', 203, 2, 'morador'),
('77777777777', 'Rafael Santos', 'rafael.santos@gmail.com', '999777888', 301, 3, 'morador'),
('88888888888', 'Bruna Gomes', 'bruna.gomes@gmail.com', '999888999', 302, 3, 'morador'),
('99999999999', 'Renato Costa', 'renato.costa@gmail.com', '999999111', 303, 3, 'morador'),
('00000000000', 'Clara Vieira', 'clara.vieira@gmail.com', '999000111', 401, 4, 'síndico');

INSERT INTO mercadoria (cpf_morador, descricao, data_rec, data_ent) VALUES
('11111111111', 'Encomenda 1', '2024-12-01', NULL),
('22222222222', 'Encomenda 2', '2024-12-02', '2024-12-03'),
('33333333333', 'Encomenda 3', '2024-12-03', NULL),
('44444444444', 'Encomenda 4', '2024-12-04', '2024-12-05'),
('55555555555', 'Encomenda 5', '2024-12-05', NULL),
('66666666666', 'Encomenda 6', '2024-12-06', NULL),
('77777777777', 'Encomenda 7', '2024-12-06', '2024-12-07'),
('88888888888', 'Encomenda 8', '2024-12-07', NULL),
('99999999999', 'Encomenda 9', '2024-12-08', NULL),
('00000000000', 'Encomenda 10', '2024-12-08', '2024-12-09'),
('11111111111', 'Encomenda 11', '2024-12-09', NULL),
('22222222222', 'Encomenda 12', '2024-12-10', NULL);




