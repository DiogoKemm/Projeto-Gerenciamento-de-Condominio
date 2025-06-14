# Projeto Gerenciamento de Condomínio

Este documento fornece as instruções necessárias para configurar e executar o projeto de gerenciamento de condomínio em um ambiente de desenvolvimento local.

## Pré-requisitos

Antes de começar, certifique-se de que você tem os seguintes softwares instalados em sua máquina:
* Node.js (que inclui o npm)
* PostgreSQL

## Instruções de Execução

Siga os passos abaixo para colocar o projeto em funcionamento.

### 1. Configuração do Banco de Dados

O backend requer uma instância do PostgreSQL para funcionar.

1.  **Crie o Banco de Dados:**
    Abra o seu terminal `psql` ou a sua ferramenta de GUI de preferência e execute o seguinte comando para criar a base de dados:
    ```sql
    CREATE DATABASE condominio;
    ```

2.  **Execute o Script:**
    Utilize o script SQL localizado na pasta `scripts` do projeto para criar as tabelas e popular o banco de dados. Execute o comando abaixo, ajustando o caminho para o arquivo se necessário:
    ```bash
    psql -U postgres -d condominio -a -f ./scripts/script.sql
    ```
    > **Nota:** O projeto está configurado para usar o usuário `postgres` e a senha `postgres` para a conexão com o banco de dados. Caso suas credenciais sejam diferentes, altere-as no arquivo `backend/index.js`.

### 2. Configuração do Backend

1.  **Navegue até a pasta do backend:**
    ```bash
    cd backend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor do backend:**
    ```bash
    npm start
    ```
    O servidor da API estará em execução em `http://localhost:8080`.

### 3. Configuração do Frontend

1.  **Abra um novo terminal** e navegue até a pasta do frontend:
    ```bash
    cd frontend/condominio-manager
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie a aplicação React:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173` (ou em outra porta indicada no terminal). Abra este endereço no seu navegador para utilizar o sistema.