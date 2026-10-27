import bcrypt
from getpass import getpass

senha = getpass("Digite a nova senha: ").encode("utf-8")
if not senha or len(senha) > 72:
    raise SystemExit("A senha deve ter de 1 a 72 bytes em UTF-8.")

hash_senha = bcrypt.hashpw(senha, bcrypt.gensalt()).decode("utf-8")
print(hash_senha)
