# Tutorial 100% atualizado 2027 sem virus gratis


## 1. Abrir o projeto

Baixe o projeto, extraia o ZIP e abra a pasta no VS Code. Abra um terminal PowerShell nessa pasta. Ela deve conter `requirements.txt`, `alterar_senha.py`, `verificar_senha.py`, `digitar_senha.py` e a pasta `sql`.

Você precisa do Python, MySQL Server e MySQL Workbench instalados. Confira o Python:

```powershell
py --version
```

## 2. o Python

Execute um comando por vez, na pasta do projeto:

```powershell
py -m venv .venv
```

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

Isso instala bcrypt e o conector do MySQL. Não é necessário repetir a instalação em todo uso.

## 3. MySQL

Ligue o MySQL Server,conecte usando seu usuário e sua senha do MySQL.

Na primeira configuração, abra e execute `sql/tabelas.sql`.


## 4. Gerar o hash e inserir os exemplos

No terminal do VS Code, execute:

```powershell
.\.venv\Scripts\python.exe digitar_senha.py
```

Digite uma senha  e pressione Enter. Os caracteres não aparecem enquanto você digita. Copie o hash completo exibido, que começa com `$2b$`.

Abra `sql/insert.sql`  e acrescente estas linhas no início, substituindo o texto pelo hash gerado:

```sql
USE catalogo;
SET @senha_exemplo = 'COLE_O_HASH_COMPLETO_AQUI';
```

## 5. Conferir a conexão do Python

Os arquivos `alterar_senha.py` e `verificar_senha.py` usam:

```python
conexao = mysql.connector.connect(
    host="localhost",
    user="root",
    password=getpass("Senha do MySQL: "),
    database="catalogo"
)
```



## 6. Alterar uma senha pelo VS Code

Execute:

```powershell
.\.venv\Scripts\python.exe alterar_senha.py
```

O programa gera o hash e salva no banco automaticamente. A mensagem `Senha atualizada!` confirma a atualização.

Para consultar os IDs nosql:

```sql
USE catalogo;
SELECT id_usuario, nome, email FROM usuario;
```

## 7. Verificar a senha atual

Execute:

```powershell
.\.venv\Scripts\python.exe verificar_senha.py
```

Informe a senha do MySQL, o e-mail do usuário e a senha desse usuário. Por exemplo, o usuário 1 foi cadastrado com `ana1029@gmail.com`.

O programa busca o hash atual no banco e compara com bcrypt. Se corresponder, mostra `Senha correta! Acesso permitido.`

O hash não é descriptografado. O usuário digita a senha original e o bcrypt verifica se ela corresponde ao hash salvo. A senha antiga deixa de funcionar depois da atualização.

## 8. Alterar a senha pelo MySQL 

Primeiro gere o hash no VS Code:

```powershell
.\.venv\Scripts\python.exe digitar_senha.py
```

Copie o hash inteiro. No arquivo `sql/senha_hash.sql`, substitua o hash existente pelo que você acabou de gerar e escolha o ID desejado. Depois execute esse arquivo. O comando é:

```sql
USE catalogo;

UPDATE usuario
SET senha_hash = 'COLE_O_HASH_COMPLETO_AQUI'
WHERE id_usuario = 1;

SELECT id_usuario, email, senha_hash
FROM usuario
WHERE id_usuario = 1;
```

O arquivo recebido já contém um hash de exemplo: ele não representa automaticamente a senha que você acabou de escolher. Substitua-o antes de executar.

O WHERE escolhe o usuário. Sem ele, todos os usuários recebem o mesmo valor. Não coloque a senha pura no UPDATE: o MySQL não gera o hash automaticamente.

Alterar pelo Python ou pelo Workbench atualiza o mesmo registro no banco. Apenas editar e salvar um arquivo não altera o MySQL; é necessário executar o programa ou o SQL.


Para o uso  MySQL ligado e execute `alterar_senha.py` para trocar uma senha ou `verificar_senha.py` para testá-la. Não é necessário recriar as tabelas.
