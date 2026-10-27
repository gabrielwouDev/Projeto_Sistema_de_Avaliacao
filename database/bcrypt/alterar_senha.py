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

    id_usuario = int(input("ID do usuário: "))
    nova_senha = getpass("Nova senha do usuário: ").encode("utf-8")
    if not nova_senha or len(nova_senha) > 72:
        raise ValueError("A senha deve ter de 1 a 72 bytes em UTF-8.")

    hash_senha = bcrypt.hashpw(nova_senha, bcrypt.gensalt()).decode("utf-8")
    cursor = conexao.cursor()
    cursor.execute(
        "UPDATE usuario SET senha_hash = %s WHERE id_usuario = %s",
        (hash_senha, id_usuario)
    )
    conexao.commit()
    print("Senha atualizada!" if cursor.rowcount else "Usuário não encontrado.")

except mysql.connector.Error as erro:
    print("Erro ao acessar o MySQL:", erro)
except ValueError as erro:
    print("Entrada inválida:", erro)
finally:
    if cursor is not None:
        cursor.close()
    if conexao is not None and conexao.is_connected():
        conexao.close()
