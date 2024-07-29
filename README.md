# Projeto de Gerenciamento de Estoque

### Autor
Enzo Perales Ausier Ávila

### Sobre
Este projeto é um sistema de gerenciamento de estoque desenvolvido como parte da seletiva para o Projeto Nexus. Ele permite que os usuários façam login, acessem uma lista de produtos, realizem retiradas alterando o estoque e gerem gráficos e PDFs sobre o estoque.

### Tecnologias Utilizadas
- **Frontend:** React (localizado na pasta `gerenciamento-estoque`)
- **Backend:** Spring Boot Java (localizado na pasta `estoque`)
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT (JSON Web Token)
- **Gráficos:** Chart.js
- **Geração de PDFs:** itextPDF
- **Documentação da API:** Swagger
- **Criptografia:** Para senhas
- **API:** RESTful

### Funcionalidades
- **Login:** Sistema de autenticação de usuários.
- **Listagem de Produtos:** Visualização de uma lista de produtos disponíveis no estoque.
- **Retirada de Produtos:** Permite que os usuários façam retiradas de produtos, alterando o estoque.
- **Geração de Gráficos:** Utilização do Chart.js para gerar gráficos sobre o estoque.
- **Geração de PDFs:** Criação de relatórios em PDF sobre o estoque.

### Estrutura do Projeto
- `gerenciamento-estoque/`: Contém o código do frontend desenvolvido em React.
- `estoque/`: Contém o código do backend desenvolvido em Spring Boot Java.

### Configuração do Ambiente
1. **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```
2. **Navegue até a pasta do backend e configure as dependências:**
    ```bash
    cd ../estoque
    mvn install
    ```
3. **Inicie o servidor do backend:**

4. **Navegue até a pasta do frontend e instale as dependências:**
    ```bash
    cd gerenciamento-estoque
    npm install
    ```
5. **Inicie o servidor do frontend:**
    ```bash
    npm run dev
    ```


### Configuração do Banco de Dados
- Certifique-se de ter o PostgreSQL instalado e em execução.
- Crie um banco de dados para o projeto.
- Configure as credenciais do banco de dados no arquivo `application.properties` no backend.


### Documentação da API
A documentação da API pode ser acessada através do Swagger na URL [Swagger UI](https://app.swaggerhub.com/apis/ENZOPAA_1/ProjetoNexus/1.0.0#/)
---

**Enzo Ausier Perales Ávila**
Estudante de Sistemas de Informação na UEA
