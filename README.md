# CineWave

Plataforma web de catálogo de filmes e séries desenvolvida como projeto acadêmico e expandida como projeto pessoal de estudo e desenvolvimento.

> 🚧 Projeto em desenvolvimento.

---

## Sobre o projeto

O CineWave surgiu inicialmente como um trabalho acadêmico de tema livre na graduação em Análise e Desenvolvimento de Sistemas.

A partir da proposta inicial, o projeto passou a ser desenvolvido também como ambiente de estudo e prática, acompanhando minha evolução em desenvolvimento web.

A aplicação está sendo construída de forma incremental, começando pelos fundamentos de HTML, CSS e JavaScript e aumentando gradualmente sua complexidade com a integração de APIs, desenvolvimento back-end com PHP e persistência de dados utilizando MySQL.

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
- modelagem e persistência de dados com MySQL;
- conexão com o banco de dados utilizando PDO;
- sincronização de dados entre API externa e banco de dados;
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
- MySQL
- PDO (PHP Data Objects)
- Git
- GitHub

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
- Conexão com banco MySQL utilizando PDO
- Rotina PHP de sincronização de filmes da TMDB para o banco de dados
- Gravação dos dados de filmes retornados pela API no banco local

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

Além desse fluxo de exibição, o projeto agora possui uma rotina de sincronização que consulta filmes na TMDB e grava os dados no MySQL por meio do PHP e do PDO. **A existência dessa rotina não significa que o catálogo exibido no front-end já esteja lendo os registros do banco.**

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

O PHP atua como intermediário entre o JavaScript do front-end e a API do TMDB. Também é utilizado na comunicação com o banco de dados MySQL e na sincronização dos filmes.

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

O front-end consome os dados do endpoint PHP utilizando `fetch()` e `async/await`. Uma rotina PHP separada também utiliza dados da TMDB para alimentar o banco local.

---

## Estrutura atual do projeto

```text
cinewave/
├── api/
│   ├── database.php
│   ├── lancamentos.php
│   ├── populares.php
│   ├── sincronizar-filmes.php
│   ├── tmdb.php
│   └── top-rated.php
├── assets/
│   ├── css/
│   │   └── estilo.css
│   ├── images/
│   └── js/
│       └── script.js
├── database/
│   └── cinewave.sql
├── .gitignore
├── config.example.php
├── config.php
├── filmes.html
├── index.html
├── lancamentos.html
├── login.html
├── README.md
└── series.html
```

### Responsabilidade dos principais arquivos

| Arquivo | Responsabilidade |
| --- | --- |
| `api/database.php` | Conexão do PHP com o MySQL utilizando PDO. |
| `api/tmdb.php` | Função reutilizável para realizar requisições à API do TMDB. |
| `api/populares.php` | Endpoint de filmes populares. |
| `api/lancamentos.php` | Endpoint destinado aos lançamentos. |
| `api/top-rated.php` | Endpoint destinado aos filmes mais bem avaliados. |
| `api/sincronizar-filmes.php` | Rotina de sincronização dos dados de filmes da TMDB com o MySQL. |
| `database/cinewave.sql` | Arquivo SQL da estrutura do banco de dados. |
| `assets/js/script.js` | Lógica e interações do front-end, incluindo a renderização dinâmica. |
| `assets/css/estilo.css` | Estilos da interface. |
| `config.example.php` | Referência para as configurações locais, sem credenciais reais. |

> A árvore representa os arquivos existentes no ambiente de desenvolvimento. O `config.php` contém configurações privadas e deve permanecer fora do controle de versão. A existência dos endpoints não implica que todas as páginas já estejam integradas a eles.

---

## Próximas funcionalidades

Entre as próximas etapas planejadas estão:

- integração e validação dos endpoints de lançamentos e filmes mais bem avaliados no front-end;
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
- utilização dos registros persistidos no MySQL em funcionalidades da aplicação;
- evolução das consultas e operações com o banco de dados.

---

## Banco de dados

O projeto iniciou a integração com **MySQL**, utilizando **PDO (PHP Data Objects)** para estabelecer a conexão entre PHP e o banco relacional.

Foi implementada uma rotina PHP de sincronização que consulta filmes da API do TMDB e grava informações dos resultados no banco local. A sincronização foi testada com os itens retornados pela API, com inserções realizadas com sucesso.

Essa etapa permitiu praticar:

- conexão de PHP com MySQL por meio de PDO;
- consultas a uma API externa para obtenção dos filmes;
- preparação e persistência dos dados recebidos;
- integração entre uma fonte de dados externa e o banco local.

A integração do banco ainda está em evolução. O front-end existente continua consumindo o endpoint PHP conectado à TMDB; a passagem da leitura do catálogo para o banco local não deve ser presumida como concluída.

**Próximos objetivos relacionados ao banco:** estruturar a utilização dos dados persistidos nas funcionalidades do CineWave e, posteriormente, armazenar informações próprias da aplicação, como usuários, listas pessoais, status de visualização e avaliações.

**Segurança e versionamento:** credenciais de acesso ao MySQL e o token da TMDB não devem ser enviados ao repositório. A estrutura do banco poderá ser compartilhada futuramente por meio de um script SQL sem informações sensíveis, em vez de versionar os arquivos de dados locais do MySQL.

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
- ✅ Integração inicial com MySQL
- ✅ Conexão PHP → MySQL utilizando PDO
- ✅ Script PHP para sincronização dos filmes da TMDB
- ✅ Sincronização testada com os resultados retornados pela API
- 🔄 Integração completa da Home
- 🔄 Responsividade em refinamento
- 🔜 Endpoint de lançamentos
- 🔜 Endpoint de filmes mais bem avaliados
- 🔜 Integração do hero/slideshow com a API
- 🔜 Desenvolvimento dinâmico das páginas de Filmes, Séries e Lançamentos
- 🔜 Busca e página de detalhes
- 🔄 Evolução da integração com o banco de dados
- 🔜 Utilização do catálogo persistido no MySQL pela aplicação
- 🔜 Funcionalidades relacionadas aos usuários e às listas pessoais

Novas funcionalidades são adicionadas conforme avanço nos estudos e na implementação dos conteúdos trabalhados na graduação.

---

## Execução local

Como o projeto passou a utilizar PHP no back-end, a versão completa precisa ser executada através de um servidor com suporte a PHP.

Durante o desenvolvimento são utilizados **Apache e MySQL**, por meio do XAMPP, com suporte a PHP e à extensão PDO para MySQL.

Para executar as funcionalidades que acessam o banco, é necessário ter um banco MySQL local configurado e uma conexão PDO válida. Os parâmetros de conexão devem permanecer em configuração privada, fora do versionamento. A criação do banco e das tabelas depende do esquema efetivamente utilizado no projeto.

Exemplo de acesso local:

`http://localhost/projetos/cinewave/`

O projeto possui histórico de publicação do front-end utilizando GitHub Pages, porém funcionalidades que dependem do PHP não são executadas pelo GitHub Pages.

---

## Repositório

Este repositório contém o código-fonte do CineWave e acompanha a evolução do projeto durante seu desenvolvimento.

O histórico de commits registra a evolução gradual da aplicação, desde a construção inicial da interface até a integração entre JavaScript, PHP, a API do TMDB e a camada inicial de persistência com MySQL.

---

## Autor

**João Victor Lima**

Estudante de Análise e Desenvolvimento de Sistemas, atualmente aprofundando conhecimentos em desenvolvimento de software, com foco prático em desenvolvimento web, JavaScript e integração entre front-end e back-end.

- LinkedIn: [João Victor Lima](https://www.linkedin.com/in/joaovbslima/)

- GitHub: [joaovbslima](https://github.com/joaovbslima/)