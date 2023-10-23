----- Cria um banco de dados
-- create database dw3;

create table IF NOT EXISTS usuarios (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    deleted boolean DEFAULT false
);

CREATE EXTENSION if NOT EXISTS pgcrypto;

insert into usuarios values 
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;

-- Usado para exercícios

create table IF NOT EXISTS planoContas (
    contaid bigserial constraint pk_conta PRIMARY KEY,
    codigo varchar(50) UNIQUE,
    descricao VARCHAR(90),
    dtaFinal date,
    valor decimal,
    removido boolean DEFAULT false
);

insert into planoContas values 
    (default, 'PC01', 'Fornecedor Plástico', '02/11/2023', 5000, false),
    (default, 'PC02', 'Fornecedor Transporte', '05/12/2023', 6500.50, false)
    ON CONFLICT DO NOTHING;

