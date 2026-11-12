# CineWave

Aplicação web de catálogo de filmes desenvolvida como projeto acadêmico da graduação em Análise e Desenvolvimento de Sistemas e expandida como projeto pessoal de estudo.

> Projeto em desenvolvimento, construído sem frameworks para praticar os fundamentos de front-end, back-end, integração com APIs e persistência de dados.

## Sobre o projeto

O CineWave utiliza dados da API do TMDB para formar um catálogo local de filmes. As obras são sincronizadas por rotinas em PHP, armazenadas em um banco MySQL e disponibilizadas ao front-end por endpoints internos que retornam JSON.

A interface é construída com PHP, HTML e CSS. O JavaScript consome os endpoints com Fetch API, organiza os dados e cria dinamicamente o slideshow e os cards dos catálogos.

O projeto está sendo desenvolvido de maneira incremental, permitindo que cada camada seja estudada e implementada separadamente.

## Objetivos de aprendizagem

- estruturação semântica com HTML;
- criação de layouts responsivos com CSS Grid e Flexbox;
- manipulação do DOM com JavaScript;
- programação assíncrona com Fetch API e `async/await`;
- consumo e tratamento de dados em JSON;
- criação de páginas e componentes reutilizáveis com PHP;
- desenvolvimento de endpoints internos;
- integração com a API externa do TMDB;
- conexão com MySQL utilizando PDO;
- consultas preparadas e tratamento de exceções;
- sincronização e persistência de dados;
- modelagem de relacionamentos entre filmes e catálogos;
- proteção de credenciais e configurações privadas;
- organização e reutilização de código.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- PHP
- MySQL / MariaDB
- PDO (PHP Data Objects)
- API do TMDB
- JSON
- cURL
- Apache / XAMPP
- Git e GitHub

## Funcionalidades implementadas

### Interface

- páginas estruturadas em PHP;
- header e footer reutilizados por meio de `require_once`;
- navegação com identificação da página atual;
- Home responsiva;
- hero/slideshow preenchido dinamicamente;
- controles de navegação do slideshow;
- seção de lançamentos recentes;
- seção de filmes mais bem avaliados;
- página de Lançamentos alimentada dinamicamente;
- cards com pôster, avaliação, título e gêneros;
- Grid responsivo e reutilizável para os catálogos;
- abertura do trailer disponível no YouTube.

### JavaScript

- consumo assíncrono dos endpoints PHP;
- separação entre serviços de API, componentes e lógica das páginas;
- função reutilizável para criação dos cards;
- limite opcional de itens exibidos;
- ordenação dos lançamentos por data;
- cópia de arrays antes da ordenação;
- tratamento de falhas na página de Lançamentos;
- criação dinâmica dos elementos com manipulação do DOM.

### Back-end e banco de dados

- conexão com MySQL utilizando PDO;
- consultas preparadas;
- endpoint de filmes em exibição;
- endpoint de filmes mais bem avaliados;
- rotina configurável de sincronização com a TMDB;
- sincronização de uma página do catálogo `now_playing`;
- sincronização de cinco páginas do catálogo `top_rated`;
- busca de detalhes adicionais de cada filme;
- armazenamento de duração, classificação indicativa, trailer, gêneros e imagens;
- relacionamento muitos-para-muitos entre filmes e catálogos;
- atualização de filmes já existentes com `ON DUPLICATE KEY UPDATE`;
- cálculo de nota ponderada para o catálogo Top Rated;
- tratamento de exceções nas consultas dos endpoints;
- token da TMDB e credenciais do banco fora do versionamento.

## Arquitetura atual

O CineWave trabalha com dois fluxos principais.

### Sincronização

```text
TMDB
  ↓
api/sincronizar-filmes.php
  ↓
normalização dos dados
  ↓
MySQL
```

A sincronização consulta um catálogo da TMDB, busca os detalhes de cada obra e atualiza as tabelas locais.

### Exibição

```text
Página PHP
  ↓
JavaScript / Fetch API
  ↓
Endpoint PHP interno
  ↓
MySQL
  ↓
JSON
  ↓
DOM
```

As páginas não consultam o banco diretamente. O acesso aos dados fica concentrado nos endpoints PHP da pasta `api`.

## Catálogos sincronizados

| Chave | Finalidade | Páginas da TMDB |
| --- | --- | ---: |
| `now_playing` | Filmes atualmente em exibição | 1 |
| `top_rated` | Filmes mais bem avaliados | 5 |

Os filmes podem participar de mais de um catálogo. A posição original de cada obra é armazenada na tabela de relacionamento.

## Nota CineWave

O Top Rated utiliza uma média ponderada para reduzir o impacto de avaliações muito altas baseadas em poucos votos.

```text
nota_cinewave = ((v × R) + (m × C)) / (v + m)
```

Onde:

- `R` é a nota do filme;
- `v` é a quantidade de votos;
- `C` é a média geral das notas armazenadas;
- `m` é o peso mínimo de votos definido pela aplicação.

Atualmente, o peso mínimo utilizado é de 5.000 votos. Em caso de empate na nota calculada, a quantidade de votos é utilizada como critério de desempate.

## Estrutura do banco de dados

### `filmes`

Armazena os dados normalizados das obras, incluindo identificador da TMDB, títulos, sinopse, lançamento, duração, classificação, avaliações, gêneros, imagens e trailer.

### `catalogos`

Registra os catálogos disponíveis na aplicação, como `now_playing` e `top_rated`.

### `filmes_catalogos`

Relaciona os filmes aos catálogos e armazena a posição e o momento da sincronização.

```text
filmes 1 ─── N filmes_catalogos N ─── 1 catalogos
```

O arquivo `database/cinewave.sql` contém a estrutura das tabelas, seus índices, chaves estrangeiras e os registros iniciais dos catálogos.

## Estrutura do projeto

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
│       ├── componentes.js
│       ├── home.js
│       ├── lancamentos.js
│       └── servicos-api.js
├── database/
│   └── cinewave.sql
├── includes/
│   ├── footer.php
│   └── header.php
├── .gitignore
├── config.example.php
├── filmes.php
├── index.php
├── lancamentos.php
├── login.html
├── README.md
└── series.php
```

O arquivo `config.php` existe somente no ambiente local e não deve ser enviado ao repositório.

O `login.html` permanece como estrutura provisória. A autenticação será migrada e implementada em uma etapa posterior.

## Responsabilidade dos principais arquivos

| Arquivo | Responsabilidade |
| --- | --- |
| `includes/header.php` | Estrutura inicial das páginas e navegação compartilhada. |
| `includes/footer.php` | Rodapé e fechamento da estrutura HTML. |
| `assets/js/componentes.js` | Criação reutilizável dos cards. |
| `assets/js/servicos-api.js` | Funções de comunicação com os endpoints internos. |
| `assets/js/home.js` | Slideshow e inicialização dos catálogos da Home. |
| `assets/js/lancamentos.js` | Ordenação e renderização da página de Lançamentos. |
| `api/database.php` | Criação da conexão PDO com o MySQL. |
| `api/tmdb.php` | Funções reutilizáveis para comunicação com a TMDB. |
| `api/sincronizar-filmes.php` | Sincronização dos catálogos da TMDB com o banco. |
| `api/lancamentos.php` | Consulta dos filmes vinculados ao catálogo `now_playing`. |
| `api/top-rated.php` | Consulta e classificação ponderada dos filmes do Top Rated. |
| `database/cinewave.sql` | Estrutura reproduzível do banco de dados. |

## Execução local

### Requisitos

- Apache com PHP;
- MySQL ou MariaDB;
- extensão PDO MySQL;
- extensão cURL;
- token de acesso à API do TMDB.

Durante o desenvolvimento, o projeto é executado com XAMPP.

### Configuração

1. Coloque o projeto dentro da pasta servida pelo Apache, por exemplo:

   ```text
   C:\xampp\htdocs\projetos\cinewave
   ```

2. Importe `database/cinewave.sql` pelo phpMyAdmin.

3. Crie `config.php` a partir de `config.example.php`.

4. Preencha o token da TMDB e as configurações locais do banco.

5. Inicie Apache e MySQL no XAMPP.

6. Execute as sincronizações pelo navegador:

   ```text
   http://localhost/projetos/cinewave/api/sincronizar-filmes.php?catalogo=now_playing
   http://localhost/projetos/cinewave/api/sincronizar-filmes.php?catalogo=top_rated
   ```

7. Acesse a aplicação:

   ```text
   http://localhost/projetos/cinewave/
   ```

## Segurança e versionamento

O token da TMDB e as credenciais do MySQL são armazenados em `config.php`, que está incluído no `.gitignore`.

O repositório mantém apenas `config.example.php`, sem informações privadas. O arquivo SQL versionado contém a estrutura necessária para recriar o banco, mas não precisa armazenar o catálogo completo de filmes.

Por utilizar PHP e MySQL, a versão completa do CineWave não pode ser executada diretamente pelo GitHub Pages.

## Status atual

- ✅ Páginas migradas para PHP
- ✅ Header e footer compartilhados
- ✅ Home integrada ao banco de dados
- ✅ Hero/slideshow dinâmico
- ✅ Lançamentos recentes dinâmicos
- ✅ Top Rated com nota ponderada
- ✅ Página de Lançamentos funcional
- ✅ Componentes JavaScript reutilizáveis
- ✅ Serviços de API separados da interface
- ✅ Sincronização configurável dos catálogos
- ✅ Banco relacional com chaves e índices
- 🔄 Página geral de Filmes
- 🔜 Persistência e exibição de Séries
- 🔜 Busca de filmes e séries
- 🔜 Página de detalhes das obras
- 🔜 Melhorias no tratamento de dados ausentes
- 🔜 Autenticação de usuários
- 🔜 Minha Lista individual por usuário

## Próximas etapas

1. criar o endpoint e a interface do catálogo geral de filmes;
2. modelar e sincronizar séries;
3. implementar a página dinâmica de Séries;
4. melhorar estados de carregamento, falha e dados ausentes;
5. desenvolver busca e página de detalhes;
6. implementar autenticação e Minha Lista.

## Autor

**João Victor Lima**

Estudante de Análise e Desenvolvimento de Sistemas, aprofundando conhecimentos em desenvolvimento web, JavaScript, PHP, APIs e bancos de dados.

- [GitHub](https://github.com/joaovbslima/)
- [LinkedIn](https://www.linkedin.com/in/joaovbslima/)
