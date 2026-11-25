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

INSERT INTO titulo (id_titulo, nome, sinopse, imagem_url, ano_lancamento, tipo) VALUES
    (1, 'A Viagem de Chihiro', 'Uma jovem descobre um mundo de espíritos.','./imgs/chihiro.jpg', 2001, 'anime'),
    (2, 'Breaking Bad', 'Um professor passa a produzir drogas.','./imgs/breaking-bad.jpg', 2008, 'série'),
    (3, 'Interestelar', 'Exploradores procuram um novo lar para a humanidade.','./imgs/interestelar.jpg', 2014, 'filme'),
    (4, 'Naruto', 'Um jovem ninja busca ser prefeito da vila.','./imgs/naruto.jpg', 2002, 'anime'),
    (5, 'Dark', 'Desaparecimentos revelam mistérios temporais.','./imgs/dark.jpg', 2017, 'série'),
    (6, 'O Rei Leão', 'Um jovem leão precisa assumir seu lugar.','./imgs/rei-leao.jpg', 1994, 'filme'),
    (7, 'Death Note', 'Um estudante encontra um caderno sobrenatural.','./imgs/death-goat.jpg', 2006, 'anime'),
    (8, 'Friends', 'Seis amigos compartilham a vida em Nova York.','./imgs/serie-ruim.jpg', 1994, 'série'),
    (9, 'Titanic', 'Um romance surge durante uma viagem marítima.','./imgs/titanic.jpg', 1997, 'filme'),
    (10, 'Your Name', 'Dois jovens passam a trocar de corpo.','./imgs/your-name.jpg', 2016, 'anime'),
    (11, 'Cyberpunk: Edgerunners', 'Para sobreviver em uma realidade distópica na qual a corrupção e os implantes cibernéticos controlam tudo, um jovem talentoso e impulsivo decide se tornar um mercenário.', './imgs/Cyberpunk_mercenarios.jpg', 2022, 'anime'),
    (12, 'Arcane', 'Em meio à forte discórdia das cidades gêmeas Piltover e Zaun, duas irmãs lutam em lados rivais de uma guerra entre tecnologias mágicas e convicções conflitantes.', './imgs/arcane.jpg', 2021, 'série'),
    (13, 'Mob Psycho 100', 'Uma criança psíquica do ensino médio tenta viver uma vida normal e manter seus poderes baixo controle, mesmo que ele constantemente se mete em problemas', './imgs/mob.jpg', 2016, 'anime'),
    (14, 'Cidade de Deus', 'Os caminhos de duas crianças divergem nas favelas do Rio, enquanto um se esforça para se tornar um fotógrafo e o outro um chefe do tráfico.', './imgs/CidadedeDeus.jpg', 2002, 'filme'),
    (15, 'Game of Thrones', 'Nove famílias nobres lutam pelo controle sobre as terras míticas de Westeros, enquanto um antigo inimigo retorna depois de estar adormecido por milhares de anos', './imgs/GOT.jpg', 2011, 'série'),
    (16, 'Stranger Things', 'Depois do desaparecimento de um menino, sua mãe, um chefe de polícia e seus amigos precisam enfrentar forças aterrorizantes para trazê-lo de volta.', './imgs/Coisas.jpg', 2016, 'série'),
    (17, 'The Office', 'Um mockumentary sobre um grupo de trabalhadores de escritório, onde o dia de trabalho consiste em conflitos de ego e comportamento inadequado.', './imgs/office.jpg', 2005, 'série'),
    (18, 'Round 6', 'Centenas de jogadores sem dinheiro aceitam um estranho convite para competir em jogos infantis. Um prêmio tentador o aguarda, mas com riscos mortais.', './imgs/rodada6.jpg', 2021, 'série'),
    (19, 'Attack on Titan', 'Depois que sua cidade é destruída e sua mãe é morta, um jovem promete limpar a terra dos humanóides que levaram a humanidade à beira da extinção.', './imgs/shingeki.jpg', 2013, 'anime'),
    (20, 'Fullmetal Alchemist: Brotherhood', 'Dois irmãos buscam uma pedra filosofal depois que uma tentativa de reviver sua falecida mãe se desfaz e os deixa em formas físicas danificadas.', './imgs/Fullmetal.jpg', 2009, 'anime');

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
    (10, 10),
    (11, 3),  (11, 4),
    (12, 1),  (12, 2),
    (13, 4),  (13, 8),
    (14, 2),
    (15, 1),  (15, 2),
    (16, 3),  (16, 5),
    (17, 8),
    (18, 7),  (18, 2),
    (19, 4),  (19, 2),
    (20, 10), (20, 1);

INSERT INTO avaliacao (id_avaliacao, nota, comentario, data_avaliacao, id_titulo, id_usuario) VALUES
    (1, 5.0, 'teste', '2026-10-01', 1, 1),
    (2, 4.5, 'teste', '2026-10-02', 2, 2),
    (3, 5.0, 'teste', '2026-10-03', 3, 3),
    (4, 4.5, 'teste', '2026-10-04', 4, 4),
    (5, 4.5, 'teste', '2026-10-05', 5, 5),
    (6, 4.5, 'teste', '2026-10-06', 6, 6),
    (7, 4.5, 'teste', '2026-10-07', 7, 7),
    (8, 4.5, 'teste', '2026-10-08', 8, 8),
    (9, 4.5, 'teste', '2026-10-09', 9, 9),
    (10, 5.0, 'teste', '2026-10-10', 10, 10);


SELECT * FROM usuario;
SELECT * FROM titulo;
SELECT * FROM genero;
SELECT * FROM titulo_genero;
SELECT * FROM avaliacao;