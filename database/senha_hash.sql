USE catalogo;

-- mude diretamente a senha daq
UPDATE usuario
SET senha_hash = '$2b$12$icV6Thn3ylo5lV3u9Qvhsut9ItsWWSznLpEOrS.Vbw5bU7hBRFe7O'
WHERE id_usuario = 1;

SELECT id_usuario, email, senha_hash
FROM usuario
WHERE id_usuario = 1;