# Condominio Manager

Este projeto é um sistema de gerenciamento de condomínios, desenvolvido para automatizar o controle de recebimento e entrega de mercadorias, além de gerenciar informações de moradores e apartamentos.

## Setup


**Pré-requisitos**

Antes de começar, certifique-se de que você tem os seguintes softwares instalados:

* Node.js (versão 18 ou superior)
* Yarn (opcional)
* PostgreSQL

**1. Banco de Dados**

O sistema utiliza um banco de dados PostgreSQL para armazenar os dados.

Crie um banco de dados no seu servidor PostgreSQL. Você pode nomeá-lo, por exemplo, "condominio".

Execute o script SQL, localizado na pasta `scripts`, no seu banco de dados recém-criado para criar as tabelas necessárias. Este script também insere um usuário Síndico padrão para o primeiro acesso.

```
psql -U seu_usuario_postgres -d condominio_db -f schema.sql
```


**2. Backend**


Navegue até a pasta do backend:

```
cd backend
```

Instale as dependências do projeto:

```
npm install
```

Crie um arquivo .env na raiz da pasta backend. Copie o conteúdo do exemplo abaixo e preencha com suas credenciais do PostgreSQL e outras chaves secretas.

```
DB_USER=seu_usuario_postgres
DB_PASSWORD=sua_senha_postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=condominio

# Chaves secretas
JWT_SECRET=sua_chave_secreta_jwt
SESSION_SECRET=sua_chave_secreta_session

# Configuração do Nodemailer (Gmail)
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app_gmail
```

Inicie o servidor backend:
``` 
npm start
```
O servidor estará rodando em http://localhost:8080.

**3. Frontend**

A interface do usuário é construída com React e Vite.

Abra um novo terminal e navegue até a pasta do frontend:
    
```
cd frontend/condominio-manager
```

Instale as dependências do projeto:
```
npm install
```

Execute o servidor de desenvolvimento:
```
npm run dev
```

A aplicação frontend estará acessível em http://localhost:5173 (ou outra porta indicada pelo Vite).

**4. Acessando a Aplicação**

Com o banco de dados, backend e frontend em execução, abra seu navegador e acesse a URL do frontend (normalmente http://localhost:5173).

* Login: Use as credenciais do usuário Síndico criadas no script do banco de dados para o primeiro acesso:
    * Usuário: sindico@email.com
    * Senha: admin