# CineWave

Plataforma web de catálogo de filmes desenvolvida como projeto acadêmico da graduação em Análise e Desenvolvimento de Sistemas e expandida como projeto pessoal de estudo.

> 🚧 Projeto em desenvolvimento contínuo.

## Sobre o projeto

O CineWave foi criado para aplicar, de forma integrada, conceitos de desenvolvimento front-end, back-end e banco de dados.

A aplicação é desenvolvida sem frameworks nesta etapa. O objetivo é compreender o funcionamento de cada camada: estrutura HTML, estilização, manipulação do DOM, requisições assíncronas, endpoints PHP, integração com API externa e persistência em banco de dados.

Os dados do catálogo são obtidos da API do TMDB, tratados pelo back-end e armazenados localmente no MySQL. O front-end consome endpoints próprios do CineWave, evitando a exposição do token da API e separando as responsabilidades da aplicação.

## Objetivos de aprendizagem

- Estruturação semântica com HTML5
- Criação de layouts com CSS Grid e Flexbox
- Responsividade e acessibilidade
- Manipulação do DOM com JavaScript
- Criação de componentes reutilizáveis
- Programação assíncrona com `fetch`, Promises e `async/await`
- Tratamento de erros e dados ausentes
- Desenvolvimento de endpoints com PHP
- Integração entre front-end, back-end e banco de dados
- Acesso ao MySQL utilizando PDO
- Consumo e normalização de dados da API do TMDB
- Proteção de credenciais e arquivos de configuração
- Versionamento com Git e GitHub

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- PHP
- MySQL / MariaDB
- PDO
- API do TMDB
- JSON
- cURL
- Apache / XAMPP
- Git e GitHub

## Funcionalidades atuais

### Interface

- Tema escuro com identidade visual própria
- Header e footer reutilizados por meio de componentes PHP
- Hero/slideshow na página inicial
- Catálogos organizados com CSS Grid
- Cards com pôster, título, gêneros e avaliação
- Navegação entre páginas em PHP
- Tratamento visual de informações ausentes
- Layout responsivo em evolução

### Catálogo dinâmico

- Home alimentada com dados dinâmicos
- Página de Filmes integrada ao banco de dados
- Página de Lançamentos integrada ao banco de dados
- Seção de filmes em cartaz
- Seção de filmes mais bem avaliados
- Criação dinâmica de cards utilizando o DOM
- Função reutilizável para renderização dos cards
- Ordenação e limitação dos resultados conforme a seção
- Cálculo de nota ponderada do CineWave para o catálogo Top Rated

### Modal de detalhes

- Componente reutilizável construído com o elemento nativo `<dialog>`
- Abertura do modal ao clicar em um card
- Preenchimento dinâmico com os dados do filme selecionado
- Exibição de pôster, backdrop, título, gêneros e sinopse
- Exibição do ano de lançamento, duração e classificação indicativa
- Exibição da nota CineWave e da quantidade de votos formatada
- Link para o trailer quando disponível
- Ocultação do botão quando o filme não possui trailer
- Tratamento de campos ausentes com valores alternativos
- Fechamento pelo botão ou pela tecla `Esc`
- Animação de abertura e escurecimento do fundo

### Back-end e banco de dados

- Conexão com MySQL utilizando PDO
- Consultas preparadas e tratamento de exceções
- Tabela de filmes com identificador interno e `tmdb_id` único
- Armazenamento de título, sinopse, lançamento, duração, classificação, avaliações, gêneros, imagens e trailer
- Organização dos filmes por catálogos, como `now_playing` e `top_rated`
- Rotina de sincronização dos dados da TMDB com o banco local
- Endpoints PHP que consultam o banco e retornam JSON
- Normalização dos dados antes do envio ao front-end
- Conversão do JSON de gêneros em arrays JavaScript
- Proteção do token da TMDB e das credenciais do banco

## Arquitetura atual

O catálogo utiliza o seguinte fluxo:

```text
TMDB
  ↓
Script de sincronização em PHP
  ↓
MySQL
  ↓
Endpoints PHP do CineWave
  ↓
JSON
  ↓
Fetch API / JavaScript
  ↓
DOM e interface
```

Essa organização permite que o front-end trabalhe apenas com os endpoints internos da aplicação. A comunicação direta com a TMDB e as credenciais permanecem no servidor.

## Estrutura do projeto

```text
cinewave/
├── api/
│   ├── database.php
│   ├── filmes.php
│   ├── lancamentos.php
│   ├── sincronizar-filmes.php
│   ├── tmdb.php
│   └── top-rated.php
├── assets/
│   ├── css/
│   │   └── estilo.css
│   ├── imagens/
│   └── js/
│       ├── componentes.js
│       ├── filmes.js
│       ├── home.js
│       ├── lancamentos.js
│       ├── modal-detalhes.js
│       └── servicos-api.js
├── database/
│   └── cinewave.sql
├── includes/
│   ├── footer.php
│   ├── header.php
│   └── modal-detalhes.php
├── config.example.php
├── config.php
├── filmes.php
├── index.php
├── lancamentos.php
├── series.php
├── .gitignore
└── README.md
```

> A estrutura pode continuar sendo reorganizada conforme o projeto evoluir.

## Endpoints internos

Os endpoints PHP funcionam como a camada de comunicação entre o front-end e o banco de dados.

Entre os dados disponibilizados estão:

- identificador da TMDB;
- título;
- sinopse;
- data de lançamento;
- duração;
- classificação indicativa brasileira;
- nota original e nota ponderada do CineWave;
- quantidade de votos;
- gêneros;
- pôster;
- backdrop;
- trailer.

As respostas são enviadas em JSON utilizando codificação UTF-8.

## Nota ponderada CineWave

O catálogo Top Rated não considera somente a média simples fornecida pela TMDB. O CineWave utiliza uma média ponderada que relaciona:

- a nota do filme;
- a quantidade de votos recebidos;
- a média geral dos filmes;
- uma quantidade mínima de votos definida pelo sistema.

Com isso, filmes com poucas avaliações não recebem vantagem desproporcional sobre títulos com grande quantidade de votos.

## Execução local

### Requisitos

- Apache com suporte a PHP
- MySQL ou MariaDB
- XAMPP ou ambiente equivalente
- Navegador atualizado
- Token de acesso à API do TMDB

### Configuração

1. Clone o repositório:

```bash
git clone https://github.com/joaovbslima/cinewave.git
```

2. Coloque o projeto no diretório servido pelo Apache. No XAMPP, normalmente:

```text
C:\xampp\htdocs\projetos\cinewave
```

3. Inicie os serviços Apache e MySQL.

4. No phpMyAdmin, crie ou selecione o banco do CineWave e importe:

```text
database/cinewave.sql
```

5. Crie o arquivo `config.php` com base em `config.example.php` e informe:

- host do banco;
- nome do banco;
- usuário;
- senha;
- token da TMDB.

6. Caso seja necessário atualizar o catálogo, execute a rotina de sincronização disponível na pasta `api`.

7. Acesse pelo navegador:

```text
http://localhost/projetos/cinewave/
```

## Segurança e configuração

O arquivo `config.php` contém credenciais locais e não deve ser versionado.

Ele está incluído no `.gitignore`. O arquivo `config.example.php` serve apenas como modelo e não deve conter credenciais reais.

## Próximas etapas

- Integração dinâmica da página de Séries
- Criação da estrutura de dados específica para séries
- Integração do modal aos destaques do slideshow
- Refinamento da responsividade do modal
- Implementação da busca de filmes e séries
- Estados visuais de carregamento e falha
- Desenvolvimento da funcionalidade Minha Lista por usuário
- Cadastro, login e autenticação
- Avaliações e informações próprias dos usuários
- Revisão de acessibilidade e navegação por teclado
- Testes e reorganização progressiva do código

## Status do projeto

### Concluído nesta etapa

- ✅ Estrutura principal da Home
- ✅ Header e footer reutilizáveis em PHP
- ✅ Páginas principais convertidas para PHP
- ✅ Hero/slideshow funcional
- ✅ Cards gerados dinamicamente
- ✅ Integração inicial com a TMDB
- ✅ Banco de dados MySQL integrado
- ✅ Conexão com banco utilizando PDO
- ✅ Sincronização de filmes com o banco
- ✅ Catálogos de filmes em cartaz e Top Rated
- ✅ Nota ponderada do CineWave
- ✅ Endpoints internos retornando JSON
- ✅ Home dinâmica
- ✅ Página de Filmes dinâmica
- ✅ Página de Lançamentos dinâmica
- ✅ Modal reutilizável de detalhes dos filmes
- ✅ Trailer, backdrop e fallbacks no modal
- ✅ Proteção de credenciais locais

### Em desenvolvimento

- 🔄 Responsividade geral da aplicação
- 🔄 Refinamentos visuais e de acessibilidade
- 🔄 Integração do modal com outras formas de destaque

### Planejado

- 🔜 Catálogo de séries
- 🔜 Busca
- 🔜 Minha Lista individual por usuário
- 🔜 Cadastro e autenticação

## Publicação

Como o CineWave utiliza PHP e MySQL, a versão completa precisa ser executada em um servidor compatível com essas tecnologias.

O GitHub Pages pode hospedar apenas a parte estática e não executa os endpoints PHP nem o banco de dados.

## Autor

**João Victor Lima**

Estudante de Análise e Desenvolvimento de Sistemas, aprofundando conhecimentos em desenvolvimento de software por meio de projetos acadêmicos e pessoais.

- LinkedIn: [João Victor Lima](https://www.linkedin.com/in/joaovbslima/)
- GitHub: [joaovbslima](https://github.com/joaovbslima/)
