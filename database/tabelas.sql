CREATE DATABASE IF NOT EXISTS catalogo ;
USE catalogo;

DROP TABLE IF EXISTS avaliacao;
DROP TABLE IF EXISTS titulo_genero;
DROP TABLE IF EXISTS genero;
DROP TABLE IF EXISTS titulo;
DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL
);

CREATE TABLE titulo (
    id_titulo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    sinopse TEXT NOT NULL,
    ano_lancamento INT NOT NULL,
    tipo VARCHAR(10) NOT NULL
);

CREATE TABLE genero (
    id_genero INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE titulo_genero (
    id_titulo INT NOT NULL,
    id_genero INT NOT NULL,
    PRIMARY KEY (id_titulo, id_genero),
    FOREIGN KEY (id_titulo) REFERENCES titulo(id_titulo),
    FOREIGN KEY (id_genero) REFERENCES genero(id_genero)
);

CREATE TABLE avaliacao (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    nota DECIMAL(3,1) NOT NULL,
    comentario TEXT,
    data_avaliacao DATE NOT NULL,
    id_titulo INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_titulo) REFERENCES titulo(id_titulo),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    UNIQUE (id_usuario, id_titulo)
);


