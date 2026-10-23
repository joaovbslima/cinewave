# CineWave

Plataforma web de catálogo de filmes e séries desenvolvida como projeto acadêmico e expandida como projeto pessoal de estudo.

> 🚧 Projeto em desenvolvimento.

---

## Sobre o projeto

O CineWave surgiu inicialmente como um trabalho acadêmico de tema livre na graduação em Análise e Desenvolvimento de Sistemas.

A partir da proposta inicial, o projeto passou a ser desenvolvido também como ambiente de estudo e prática, acompanhando minha evolução em desenvolvimento web.

A aplicação está sendo construída de forma incremental, começando pelos fundamentos de HTML, CSS e JavaScript e aumentando gradualmente sua complexidade conforme novos conceitos e tecnologias são incorporados.

---

## Objetivo

O principal objetivo do CineWave é consolidar conhecimentos de desenvolvimento web por meio de um projeto prático e evolutivo.

Além da construção da interface, o projeto busca explorar conceitos como:

- estruturação semântica com HTML;
- layouts responsivos com CSS;
- manipulação do DOM;
- orientação a objetos com JavaScript;
- geração dinâmica de conteúdo;
- consumo de APIs;
- integração entre front-end e back-end.

A proposta é desenvolver cada funcionalidade compreendendo sua implementação, evitando o uso de frameworks nesta etapa do projeto.

---

## Tecnologias utilizadas

Atualmente:

- HTML5
- CSS3
- JavaScript
- Git
- GitHub
- GitHub Pages

Planejadas para etapas futuras:

- API do TMDB
- PHP
- Banco de dados

---

## Funcionalidades atuais

- Header com navegação, campo de busca e acesso de login
- Hero/slideshow de destaques
- Controles de navegação do slideshow
- Layout responsivo em desenvolvimento
- Catálogo de filmes utilizando CSS Grid
- Cards com pôster, avaliação, título e gêneros
- Modelagem de filmes utilizando classe JavaScript
- Armazenamento dos filmes em objetos e arrays
- Criação dinâmica dos cards utilizando manipulação do DOM
- Ordenação dos filmes por data de lançamento
- Ordenação dos filmes por avaliação
- Tratamento de dados ausentes na interface
- Função reutilizável para renderização dos cards
- Uso de Flexbox e Grid em diferentes componentes da interface

---

## Estrutura atual da aplicação

A página inicial já possui sua estrutura visual principal composta por:

- Header
- Hero/slideshow
- Seção de lançamentos recentes
- Seção de filmes mais bem avaliados
- Footer

Os conteúdos dos catálogos são gerados dinamicamente pelo JavaScript a partir dos objetos que representam os filmes.

Atualmente, os dados ainda são definidos localmente no código. Em uma etapa futura, essa origem será substituída por dados obtidos através da API do TMDB.

---

## JavaScript

O projeto já utiliza JavaScript tanto para interação quanto para geração de conteúdo.

Entre os conceitos atualmente aplicados estão:

- classes e objetos;
- arrays;
- métodos de arrays;
- funções;
- estruturas condicionais;
- manipulação do DOM;
- criação dinâmica de elementos HTML;
- alteração de atributos e conteúdo;
- ordenação de dados;
- reutilização de funções;
- controle do slideshow.

A implementação continuará sendo expandida conforme novos conceitos forem estudados.

---

## Próximas funcionalidades

Entre as próximas etapas planejadas estão:

- integração com a API do TMDB;
- substituição dos dados locais por dados reais da API;
- geração dinâmica do conteúdo do hero/slideshow;
- desenvolvimento das páginas de Filmes, Séries e Lançamentos;
- busca de filmes e séries;
- página de detalhes de cada título;
- melhoria da responsividade;
- implementação das ações de trailer e lista pessoal;
- desenvolvimento do back-end com PHP;
- possível integração com banco de dados após a conclusão das funcionalidades principais.

---

## Integração com TMDB

A API do TMDB será utilizada como principal fonte de dados de filmes e séries do CineWave.

A integração deverá permitir carregar dinamicamente informações como:

- títulos;
- sinopses;
- datas de lançamento;
- avaliações;
- gêneros;
- pôsteres;
- imagens de backdrop.

A primeira integração será desenvolvida com JavaScript. Posteriormente, com a introdução do PHP no projeto, a arquitetura poderá ser evoluída para utilizar o back-end como intermediário na comunicação com a API.

---

## Status do projeto

O CineWave está em desenvolvimento contínuo.

### Etapa atual

- ✅ Estrutura principal da Home
- ✅ Header e footer
- ✅ Hero/slideshow funcional
- ✅ Modelagem dos filmes em JavaScript
- ✅ Cards gerados dinamicamente pelo DOM
- ✅ Ordenação dos catálogos por critérios diferentes
- 🔄 Responsividade em refinamento
- 🔜 Integração com TMDB
- 🔜 Desenvolvimento das demais páginas
- 🔜 PHP e processamento no servidor

Novas funcionalidades são adicionadas conforme avanço nos estudos e na implementação dos conteúdos trabalhados na graduação.

---

## Acesse o projeto

Versão publicada com GitHub Pages:

[Visualizar CineWave](https://joaovbslima.github.io/cinewave/)

---

## Repositório

Este repositório contém o código-fonte do CineWave e acompanha a evolução do projeto durante seu desenvolvimento.

O histórico de commits também registra a evolução gradual da aplicação e a implementação de novas funcionalidades.

---

## Autor

**João Victor Lima**

Estudante de Análise e Desenvolvimento de Sistemas, atualmente aprofundando conhecimentos em desenvolvimento de software, com foco prático em front-end e JavaScript.

- LinkedIn: [João Victor Lima](https://www.linkedin.com/in/joaovbslima/)
- GitHub: [joaovbslima](https://github.com/joaovbslima/)
