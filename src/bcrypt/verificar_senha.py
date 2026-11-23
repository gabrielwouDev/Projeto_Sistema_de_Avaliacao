import mysql.connector
import bcrypt
from getpass import getpass

conexao = None
cursor = None

try:
    conexao = mysql.connector.connect(
        host="localhost",
        user="root",
        password=getpass("Senha do MySQL: "),
        database="catalogo"
    )

    email = input("E-mail do usuário: ").strip()
    senha = getpass("Senha do usuário: ").encode("utf-8")

    cursor = conexao.cursor()
    cursor.execute("SELECT senha_hash FROM usuario WHERE email = %s", (email,))
    usuario = cursor.fetchone()

    if not usuario or not senha or len(senha) > 72:
        print("E-mail ou senha incorretos! Acesso negado.")
    else:
        try:
            correta = bcrypt.checkpw(senha, usuario[0].encode("utf-8"))
        except (ValueError, AttributeError):
            raise ValueError("O hash salvo é inválido. Redefina a senha com alterar_senha.py.")

        if correta:
            print("Senha correta! Acesso permitido.")
        else:
            print("E-mail ou senha incorretos! Acesso negado.")

except mysql.connector.Error as erro:
    print("Erro ao acessar o MySQL:", erro)
except ValueError as erro:
    print(erro)
finally:
    if cursor is not None:
        cursor.close()
    if conexao is not None and conexao.is_connected():
        conexao.close()
