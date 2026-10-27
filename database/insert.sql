SET @senha_exemplo = 1234;


INSERT INTO usuario (id_usuario, nome, email, senha_hash) VALUES
    (1, 'Ana Silva', 'ana1029@gmail.com', @senha_exemplo),
    (2, 'Bruno Costa', 'aline73@gmail.com', @senha_exemplo),
    (3, 'Carla Souza', 'carla482@gmail.com', @senha_exemplo),
    (4, 'Diego Lima', 'diego9051@gmail.com', @senha_exemplo),
    (5, 'Elisa Alves', 'elisa26@gmail.com', @senha_exemplo),
    (6, 'Felipe Rocha', 'felipe714@gmail.com', @senha_exemplo),
    (7, 'Gabriela Dias', 'gabriela3086@gmail.com', @senha_exemplo),
    (8, 'Hugo Martins', 'hugo59@gmail.com', @senha_exemplo),
    (9, 'Isabela Santos', 'isabela6204@gmail.com', @senha_exemplo),
    (10, 'João Pereira', 'joao831@gmail.com', @senha_exemplo);

INSERT INTO titulo (id_titulo, nome, sinopse, ano_lancamento, tipo) VALUES
    (1, 'A Viagem de Chihiro', 'Uma jovem descobre um mundo de espíritos.', 2001, 'anime'),
    (2, 'Breaking Bad', 'Um professor passa a produzir drogas.', 2008, 'série'),
    (3, 'Interestelar', 'Exploradores procuram um novo lar para a humanidade.', 2014, 'filme'),
    (4, 'Naruto', 'Um jovem ninja busca ser prefeito da vila.', 2002, 'anime'),
    (5, 'Dark', 'Desaparecimentos revelam mistérios temporais.', 2017, 'série'),
    (6, 'O Rei Leão', 'Um jovem leão precisa assumir seu lugar.', 1994, 'filme'),
    (7, 'Death Note', 'Um estudante encontra um caderno sobrenatural.', 2006, 'anime'),
    (8, 'Friends', 'Seis amigos compartilham a vida em Nova York.', 1994, 'série'),
    (9, 'Titanic', 'Um romance surge durante uma viagem marítima.', 1997, 'filme'),
    (10, 'Your Name', 'Dois jovens passam a trocar de corpo.', 2016, 'anime');

INSERT INTO genero (id_genero, nome) VALUES
    (1, 'Fantasia'),
    (2, 'Drama'),
    (3, 'Ficção científica'),
    (4, 'Ação'),
    (5, 'Mistério'),
    (6, 'Animação'),
    (7, 'Suspense'),
    (8, 'Comédia'),
    (9, 'Romance'),
    (10, 'Aventura');

INSERT INTO titulo_genero (id_titulo, id_genero) VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10);

INSERT INTO avaliacao (id_avaliacao, nota, comentario, data_avaliacao, id_titulo, id_usuario) VALUES
    (1, 9.5, 'teste', '2026-10-01', 1, 1),
    (2, 9.0, 'teste', '2026-10-02', 2, 2),
    (3, 9.8, 'teste', '2026-10-03', 3, 3),
    (4, 8.5, 'teste', '2026-10-04', 4, 4),
    (5, 9.2, 'teste', '2026-10-05', 5, 5),
    (6, 9.0, 'teste', '2026-10-06', 6, 6),
    (7, 9.4, 'teste', '2026-10-07', 7, 7),
    (8, 8.8, 'teste', '2026-10-08', 8, 8),
    (9, 8.7, 'teste', '2026-10-09', 9, 9),
    (10, 9.6, 'teste', '2026-10-10', 10, 10);


SELECT * FROM usuario;
SELECT * FROM titulo;
SELECT * FROM genero;
SELECT * FROM titulo_genero;
SELECT * FROM avaliacao;
