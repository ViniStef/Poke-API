## PokeAPI - Desenvolvida utilizando TypeScript e NestJS

O projeto visou desenvolver uma API para realizar requisições para a API de [Pokémons]("https://pokeapi.co") e retornar 
suas devidas respostas. É possível fazer três tipos de requisição:

<ul>
<li><h1>GET "/pokemon/idOrName" </h1>Obter informações sobre um pokémon através de seu id ou nome.</li>
<li><h1>GET "/pokemon-color/color" </h1>Obter pokémons que possuem determinada cor, e também algumas informações sobre a cor em si, através do id ou nome da cor.</li>
<li><h1>GET "/pokemon?limit=20&offset=20" </h1>Obter uma lista de pokémons, podendo decidir quantos retornar através do limit</li>
</ul>

## Para executar e testar a API localmente, siga os próximos passos:

## Instale as dependências do projeto

```bash
$ npm install
```

## Compilar e rodar o projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev


## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Outras Tecnologias
- Axios para requisições
- Postman para testar as APIs
- Jest para testes unitários e de integração

## Informações

- Caso passe um id negativo ("-3"), o servidor irá retornar um status erro 400, Bad Request.
- Caso não exista nenhum pokémon com tal id ou nome, o servidor devolverá um status de erro 404, Not Found.
- Demais erros irão retornar um status code 500.
- Caso não especifique o offset e/ou limit em determinada rota, o padrão será 20. Informações inválidas irão causar o mesmo resultado.

## Obrigado por Visitar!

- [LinkedIn](www.linkedin.com/in/vinicius-steflitsch-b19a47259)


