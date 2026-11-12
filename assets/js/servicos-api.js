// Buscando os dados dos filmes através de requisição feita no arquivo php
async function buscarFilmesEmExibicao() {
  const resposta = await fetch('api/lancamentos.php');

  if (!resposta.ok) {
    throw new Error('Erro ao buscar filmes em exibição');
  }
  const filmes = await resposta.json();

  return filmes;

}


async function buscarFilmesTopRated() {
  const resposta = await fetch('api/top-rated.php');  
  
  if (!resposta.ok) {
    throw new Error('Erro ao buscar filmes Top Rated');
  }

  const filmes = await resposta.json(); 

  return filmes;
}


async function buscarTodosFilmes() {
  const resposta = await fetch('api/filmes.php');

  if (!resposta.ok) {
    throw new Error('Erro ao buscar filmes');
  }

  const filmes = await resposta.json();

  return filmes;
}