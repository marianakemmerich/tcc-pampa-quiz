# Pampa Quiz

Pampa Quiz é um jogo web de perguntas e respostas desenvolvido como Trabalho de Conclusão de Curso de Análise e Desenvolvimento de Sistemas. O jogo aborda a temática do bioma pampa, ecossistema típico do Estado do Rio Grande do Sul.

## Instalação

Para rodar o projeto localmente, siga as seguintes etapas:

- Certifique-se de ter o **Node.js** instalado. [Clique aqui para instalar](https://nodejs.org/).

1. Clone o repositório na sua máquina:
    ```bash
    git clone https://github.com/marianakemmerich/tcc-pampa-quiz.git
    ```

2. Acesse a pasta do projeto:
    ```
    cd tcc-pampa-quiz
    ```

3. Instale as dependências:
    ```
    npm install
    ```

4. Inicie o servidor JSON Server:
    ```
    npx json-server --watch src/data/db.json --port 5000
    ```

5. Inicie a aplicação React:
    ```
    npm start
    ```

6. Acesse a aplicação no navegador:
    ```
    http://localhost:3000
    ```