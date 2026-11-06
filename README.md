# CineWave

Plataforma web de catálogo de filmes e séries desenvolvida como projeto acadêmico e expandida como projeto pessoal de estudo e desenvolvimento.

> 🚧 Projeto em desenvolvimento.

---

## Sobre o projeto

O CineWave surgiu inicialmente como um trabalho acadêmico de tema livre na graduação em Análise e Desenvolvimento de Sistemas.

A partir da proposta inicial, o projeto passou a ser desenvolvido também como ambiente de estudo e prática, acompanhando minha evolução em desenvolvimento web.

A aplicação está sendo construída de forma incremental, começando pelos fundamentos de HTML, CSS e JavaScript e aumentando gradualmente sua complexidade com a integração de APIs, desenvolvimento back-end com PHP e futuras funcionalidades de persistência de dados.

O projeto é desenvolvido sem frameworks nesta etapa, com o objetivo de compreender de forma prática como cada parte da aplicação funciona.

---

## Objetivo

O principal objetivo do CineWave é consolidar conhecimentos de desenvolvimento web por meio de um projeto prático e evolutivo.

Além da construção da interface, o projeto busca explorar conceitos como:

- estruturação semântica com HTML;
- layouts responsivos com CSS;
- manipulação do DOM;
- orientação a objetos com JavaScript;
- geração dinâmica de conteúdo;
- programação assíncrona;
- consumo de APIs;
- integração entre front-end e back-end;
- requisições HTTP;
- tratamento e normalização de dados;
- desenvolvimento de endpoints com PHP;
- proteção de credenciais da API;
- organização e reutilização de código.

A proposta é desenvolver cada funcionalidade compreendendo sua implementação, evitando o uso de frameworks nesta etapa do projeto.

---

## Tecnologias utilizadas

Atualmente:

- HTML5
- CSS3
- JavaScript
- PHP
- API do TMDB
- JSON
- cURL
- Apache / XAMPP
- Git
- GitHub

Planejada para uma etapa futura:

- MySQL

---

## Funcionalidades atuais

- Header com navegação, campo de busca e acesso de login
- Hero/slideshow de destaques
- Controles de navegação do slideshow
- Layout responsivo em desenvolvimento
- Catálogo de filmes utilizando CSS Grid
- Cards com pôster, avaliação, título e gêneros
- Modelagem inicial de filmes utilizando classe JavaScript
- Criação dinâmica dos cards utilizando manipulação do DOM
- Ordenação dos filmes por data de lançamento
- Ordenação dos filmes por avaliação
- Uso de cópias de arrays antes das operações de ordenação
- Tratamento de dados ausentes na interface
- Função reutilizável para renderização dos cards
- Uso de Flexbox e Grid em diferentes componentes da interface
- Consumo assíncrono de dados com Fetch API
- Integração do front-end com endpoints PHP
- Integração do back-end com a API do TMDB
- Tratamento e normalização dos dados recebidos da API
- Conversão dos IDs de gêneros em seus respectivos nomes
- Proteção do token da API no servidor

---

## Estrutura atual da aplicação

A página inicial possui sua estrutura visual principal composta por:

- Header
- Hero/slideshow
- Seção de lançamentos recentes
- Seção de filmes mais bem avaliados
- Footer

Os cards dos catálogos são gerados dinamicamente pelo JavaScript.

A aplicação já possui integração com dados reais da API do TMDB utilizando PHP como intermediário entre o front-end e a API externa.

O fluxo atual funciona da seguinte forma:

JavaScript → endpoint PHP → TMDB → PHP → JSON → JavaScript → DOM

O PHP recebe os dados da TMDB, realiza tratamentos e normalizações e devolve ao front-end apenas as informações necessárias para a interface.

O hero/slideshow ainda utiliza temporariamente os dados locais definidos no JavaScript e será integrado posteriormente aos dados da API.

---

## JavaScript

O projeto utiliza JavaScript tanto para interação quanto para geração e tratamento de conteúdo.

Entre os conceitos atualmente aplicados estão:

- classes e objetos;
- arrays;
- métodos de arrays;
- spread operator;
- funções;
- funções assíncronas;
- async/await;
- Promises;
- Fetch API;
- estruturas condicionais;
- manipulação do DOM;
- criação dinâmica de elementos HTML;
- alteração de atributos e conteúdo;
- ordenação de dados;
- manipulação de datas;
- tratamento de respostas HTTP;
- interpretação de JSON;
- reutilização de funções;
- controle do slideshow.

A implementação continuará sendo expandida conforme novos conceitos forem estudados e novas funcionalidades forem adicionadas ao projeto.

---

## Back-end com PHP

O CineWave já possui uma camada inicial de back-end desenvolvida em PHP.

O PHP atua como intermediário entre o JavaScript do front-end e a API do TMDB.

A comunicação com a TMDB utiliza cURL.

Foi criada uma função reutilizável responsável por:

- receber a URL da requisição;
- enviar o token de autenticação;
- executar a chamada HTTP;
- verificar erros do cURL;
- validar o status da resposta;
- interpretar o JSON retornado;
- devolver os dados para os endpoints da aplicação.

O token da TMDB é armazenado em um arquivo de configuração local que não é versionado no Git.

Um arquivo `config.example.php` é mantido no repositório como referência para configuração do projeto.

---

## Integração com TMDB

A API do TMDB é utilizada como principal fonte de dados externos de filmes e séries do CineWave.

Atualmente, a aplicação já recebe dinamicamente informações como:

- títulos;
- sinopses;
- datas de lançamento;
- avaliações;
- gêneros;
- pôsteres;
- imagens de backdrop.

O primeiro endpoint interno implementado foi:

`api/populares.php`

Esse endpoint consulta os filmes populares da TMDB, processa os dados recebidos e devolve ao JavaScript uma estrutura adequada ao CineWave.

Os gêneros retornados originalmente pela TMDB como IDs numéricos também são tratados no back-end.

Exemplo:

`genre_ids: [28, 12, 878]`

é transformado em:

`generos: ["Ação", "Aventura", "Ficção científica"]`

O front-end consome os dados utilizando `fetch()` e `async/await`.

---

## Estrutura atual do projeto

`cinewave/`

`├── api/`

`│   ├── populares.php`

`│   └── tmdb.php`

`│`

`├── assets/`

`│   ├── css/`

`│   │   └── estilo.css`

`│   ├── imagens/`

`│   └── js/`

`│       └── script.js`

`│`

`├── config.php`

`├── config.example.php`

`├── .gitignore`

`│`

`├── index.html`

`├── filmes.html`

`├── series.html`

`├── lancamentos.html`

`├── login.html`

`└── README.md`

O arquivo `config.php` contém informações privadas utilizadas pelo ambiente local e não é versionado.

---

## Próximas funcionalidades

Entre as próximas etapas planejadas estão:

- criação de endpoint específico para lançamentos;
- criação de endpoint para filmes mais bem avaliados;
- utilização dos dados da API no hero/slideshow;
- remoção progressiva dos dados locais utilizados como mock;
- integração dinâmica da página de Filmes;
- integração dinâmica da página de Séries;
- integração dinâmica da página de Lançamentos;
- busca de filmes e séries;
- página de detalhes de cada título;
- melhoria da responsividade;
- tratamento visual de carregamento e falhas de requisição;
- tratamento de imagens ou informações ausentes;
- implementação das ações de trailer;
- desenvolvimento da funcionalidade Minha Lista;
- autenticação de usuários;
- integração com banco de dados.

---

## Banco de dados

A integração com banco de dados está planejada para uma etapa posterior.

A proposta é utilizar o banco principalmente para armazenar informações próprias do CineWave, como:

- usuários;
- títulos adicionados às listas pessoais;
- status de visualização;
- avaliações realizadas pelos usuários;
- relações entre usuários e títulos.

A TMDB continuará sendo utilizada como principal fonte externa para informações do catálogo.

---

## Status do projeto

O CineWave está em desenvolvimento contínuo.

### Etapa atual

- ✅ Estrutura principal da Home
- ✅ Header e footer
- ✅ Hero/slideshow funcional
- ✅ Modelagem inicial dos filmes em JavaScript
- ✅ Cards gerados dinamicamente pelo DOM
- ✅ Ordenação dos catálogos por critérios diferentes
- ✅ Integração inicial com a API do TMDB
- ✅ Back-end inicial desenvolvido em PHP
- ✅ Requisições à TMDB utilizando cURL
- ✅ Token da API protegido no servidor
- ✅ Função reutilizável para requisições à TMDB
- ✅ Conversão e normalização dos gêneros
- ✅ Endpoint de filmes populares
- ✅ JavaScript consumindo dados do back-end com Fetch API
- ✅ Cards da Home utilizando dados reais da API
- 🔄 Integração completa da Home
- 🔄 Responsividade em refinamento
- 🔜 Endpoint de lançamentos
- 🔜 Endpoint de filmes mais bem avaliados
- 🔜 Integração do hero/slideshow com a API
- 🔜 Desenvolvimento dinâmico das páginas de Filmes, Séries e Lançamentos
- 🔜 Busca e página de detalhes
- 🔜 Banco de dados e funcionalidades relacionadas aos usuários

Novas funcionalidades são adicionadas conforme avanço nos estudos e na implementação dos conteúdos trabalhados na graduação.

---

## Execução local

Como o projeto passou a utilizar PHP no back-end, a versão completa precisa ser executada através de um servidor com suporte a PHP.

Durante o desenvolvimento é utilizado o Apache através do XAMPP.

Exemplo de acesso local:

`http://localhost/projetos/cinewave/`

O projeto possui histórico de publicação do front-end utilizando GitHub Pages, porém funcionalidades que dependem do PHP não são executadas pelo GitHub Pages.

---

## Repositório

Este repositório contém o código-fonte do CineWave e acompanha a evolução do projeto durante seu desenvolvimento.

O histórico de commits registra a evolução gradual da aplicação, desde a construção inicial da interface até a integração atual entre JavaScript, PHP e a API do TMDB.

---

## Autor

**João Victor Lima**

Estudante de Análise e Desenvolvimento de Sistemas, atualmente aprofundando conhecimentos em desenvolvimento de software, com foco prático em desenvolvimento web, JavaScript e integração entre front-end e back-end.

- LinkedIn: [João Victor Lima]([https://www.linkedin.com/in/joaovbslima/](https://www.linkedin.com/in/joaovbslima/))

- GitHub: [joaovbslima]([https://github.com/joaovbslima/](https://github.com/joaovbslima/))