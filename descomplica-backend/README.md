### Repositório voltado para desafio da Descomplica

## Descomplica Backend

- Descrição do desafio no arquivo `Desafio Assíncrono Tech Descomplica - 2025 _ Jr.pdf`

## Como rodar o projeto

1. Clone o repositório
2. Entre na pasta `descomplica-backend`
3. Configura o arquivo `.env` com as variáveis de ambiente

```env
{
DATABASE_URL=postgres://postgres:password123@db:5432/alunos-db
PORT=3000

POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123
POSTGRES_DB=alunos-db
}
```

4. Execute o comando `docker-compose up --build`

## Como rodar os testes
- Execute o comando `npm run test:e2e:docker` para rodar os testes de integração(optei por usar testes de integração para cobrir o fluxo completo da aplicação, e para isso utilizei um docker-compose.test.yml para subir o banco de dados de testes em um container separado).
- Ele tem o seguinte fluxo: 
    1. Cria um estudante
    2. Ler um estudante por ID
    3. Pegar todos os estudantes
    4. Soft delete em um estudante
    5. Verifica se o estudante foi realmente deletado
- Após rodar os testes, o banco de dados e a aplicação de testes são derrubados automaticamente.

## Tecnologias utilizadas

- TypeScript
- Node.js
- Nest.js
- Jest
- Prisma
- Docker
- Postgres

## Uso do NestJs
- Escolhi usar o Nest por ser um framework que facilita a construção de APIs organizadas, além de já ter uma estrutura robusta para lidar com validação de dados, além disso é o framework backend que mais tenho expertise.

## Organização do código
- O código está organizado em módulos, seguindo a estrutura do Nest.js, o que facilita a manutenção e a escalabilidade.
- Cada módulo tem seu próprio controller, service, DTOs e Repository.
- O controller lida com as requisições HTTP, o service contém a regra de negócio e o repository interage com o banco de dados através do Prisma.

## Documentação
- A documentação da API está disponível no Swagger, acessível em `http://localhost:3000/api`.
- Para gerar um json acesse `http://localhost:3000/api-json`, após isso você pode importar o arquivo no Insomnia ou Postman.
