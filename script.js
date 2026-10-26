
function criarSlideshow() {

  // Criação do hero/slideshow de forma dinâmica
  const slideshow = document.querySelector('.slideshow');
  // criação de cada item do slideshow
  filmes.slice(0, 3).forEach(filme => {
    const slideshowItem = document.createElement('div');
    slideshowItem.classList.add('slideshow-item');
    slideshow.appendChild(slideshowItem);

    const imgSlide = document.createElement('img');
    imgSlide.setAttribute('src', filme.backdrop);
    imgSlide.setAttribute('alt', filme.titulo);
    slideshowItem.appendChild(imgSlide);

    const textoSlideshow = document.createElement('div');
    textoSlideshow.classList.add('texto-slideshow');
    slideshowItem.appendChild(textoSlideshow);

    const badgeSlide = document.createElement('span');
    badgeSlide.classList.add('badge-slide');
    badgeSlide.textContent = 'ESTREIA DA SEMANA';
    textoSlideshow.appendChild(badgeSlide);

    const tituloSlide = document.createElement('h1');
    tituloSlide.classList.add('titulo-slideshow');
    tituloSlide.textContent = filme.titulo;
    textoSlideshow.appendChild(tituloSlide);

    const metaSlide = document.createElement('div');
    metaSlide.classList.add('meta-slideshow');
    textoSlideshow.appendChild(metaSlide);

    const spanLancamento = document.createElement('span');
    spanLancamento.textContent = filme.lancamento.toLocaleDateString('pt-BR');
    metaSlide.appendChild(spanLancamento);

    const spanDuracao = document.createElement('span');
    spanDuracao.textContent = formatarHora(filme.duracao);
    metaSlide.appendChild(spanDuracao);

    const spanClassificacao = document.createElement('span');
    spanClassificacao.textContent = filme.classificacaoIndicativa;
    metaSlide.appendChild(spanClassificacao);

    const spanGenero = document.createElement('span');
    spanGenero.textContent = filme.generos.join(' • ');
    metaSlide.appendChild(spanGenero);

    const sinopseSlide = document.createElement('p');
    sinopseSlide.classList.add('sinopse-slideshow');
    sinopseSlide.textContent = filme.sinopse;
    textoSlideshow.appendChild(sinopseSlide);

    const acoesSlide = document.createElement('div');
    acoesSlide.classList.add('acoes-slideshow');
    textoSlideshow.appendChild(acoesSlide);

    const botaoSlidePrimario = document.createElement('a');
    botaoSlidePrimario.classList.add('botao-slide');
    botaoSlidePrimario.classList.add('botao-primario');
    botaoSlidePrimario.textContent = 'Assistir trailer';
    acoesSlide.appendChild(botaoSlidePrimario);

    const botaoSlideSecundario = document.createElement('a');
    botaoSlideSecundario.classList.add('botao-slide');
    botaoSlideSecundario.classList.add('botao-secundario');
    botaoSlideSecundario.textContent = '+ Minha lista';
    acoesSlide.appendChild(botaoSlideSecundario);

  });
}





// Criando a classe Filme

class Filme {
  constructor(titulo, sinopse, lancamento, duracao, classificacaoIndicativa, nota, generos, poster, backdrop) {
    this.titulo = titulo;
    this.sinopse = sinopse;
    this.lancamento = new Date(lancamento);
    this.duracao = duracao;
    this.classificacaoIndicativa = classificacaoIndicativa;
    this.nota = nota;
    this.generos = generos;
    this.poster = poster;
    this.backdrop = backdrop;
  }


  // função para testar se os objetos foram criados como planejado
  exibirInformacoes() {
    console.log(`${this.titulo} (${this.lancamento.getFullYear()})
      Duração: ${this.duracao} minutos
      Classificação indicativa: ${this.classificacaoIndicativa} anos
      Nota: ${this.nota}
      Gênero: ${this.generos.join(' • ')}`)
  }

}


// Instanciando os objetos da classe Filme
const filmes = [

  new Filme(
    'Cara-de-Barro',
    'A ascensão meteórica de Matt Hagen de garoto das ruas de Gotham a astro de Hollywood é tragicamente interrompida quando as ações de um chefão do crime local o deixam terrivelmente desfigurado. Abandonado por sua equipe e sem nada, Matt busca um tratamento de ponta que, milagrosamente, o devolve à sua antiga forma... mas que também afeta, de maneira inesperada, sua percepção da realidade, lançando-o em uma espiral destrutiva de obsessão e vingança.',
    '2026-10-22',
    106,
    18,
    7.5,
    ['Terror', 'Thriller', 'Ficção científica'],
    'https://image.tmdb.org/t/p/w600_and_h900_face/dqvHs2YXks989ScXvsngbqAeBHX.jpg',
    'imagens/cara-de-barro.jpeg'
  ),

  new Filme(
    'Street Fighter',
    'Ambientado em 1993, os lutadores Ryu e Ken Masters são colocados de volta no combate quando a misteriosa Chun-Li os recruta para o próximo World Warrior Tournament: uma brutal briga de socos, destino e fúria. Entretanto, por trás desse campeonato, se esconde uma conspiração mortal que os força a encarar um ao outro e os demônios do passado. E se eles não fizerem, é game over!',
    '2026-10-15',
    119,
    14,
    6.2,
    ['Ação', 'Fantasia'],
    'https://image.tmdb.org/t/p/w600_and_h900_face/6gWmrC2GyDbUM1ET5EBg9lxBi7S.jpg',
    'imagens/street-fighter.jpg'
  ),


  new Filme(
    'Digger',
    'O homem mais poderoso do mundo embarca em uma missão frenética para provar que é o salvador da humanidade, antes que o desastre desencadeado por ele destrua tudo.',
    '2026-10-01',
    129,
    14,
    7.5,
    ['Comédia', 'Drama'],
    'https://image.tmdb.org/t/p/w600_and_h900_face/2qelG58fO3tOSPrDVzOW8hfxY3V.jpg',
    'imagens/digger.jpg'
  ),

  new Filme(
    'Homem-Aranha: Um novo dia',
    'É um novo dia para Peter Parker. Combatendo o crime em tempo integral como Homem-Aranha em um mundo que não se lembra mais dele e lidando com a pressão de ver seus antigos amigos seguirem em frente sem sua presença, Peter passa por uma mudança que talvez nem ele tenha o poder de controlar. Mas essa transformação também pode ser a única coisa capaz de deter uma surpreendente nova ameaça à cidade e às pessoas que ele ama: um poderoso vilão que ninguém sequer consegue enxergar.',
    '2026-07-30',
    143,
    12,
    8.0,
    ['Ficção científica', 'Ação', 'Aventura'],
    'https://media.themoviedb.org/t/p/w300_and_h450_face/x0nvYzQpyJc5pdT9lMnkMuYAg0O.jpg',
    'imagens/homem-aranha.jpeg'
  ),

  new Filme(
    'Resident Evil',
    'Bryan, um tranquilo entregador de órgãos, é enviado para uma entrega noturna no Hospital Geral de Raccoon City. No caminho por uma estrada montanhosa coberta de neve, ele acidentalmente atropela uma mulher desconhecida. Ela sobrevive, mas algo está muito errado. Ao tentar ajudar, Bryan se depara com um surto em larga escala envolvendo mutações horríveis com tentáculos e monstruosidades bioengenheiradas.',
    '2026-09-17',
    90,
    18,
    7.6,
    ['Terror', 'Ficção científica', 'Aventura'],
    'https://image.tmdb.org/t/p/w600_and_h900_face/gQ76UL64RQe3oHwiwHwODTC23g4.jpg',
    'imagens/resident-evil.jpg'

  ),

  new Filme(
    'A Odisseia',
    'Acompanhe o rei grego Odisseu em sua perigosa jornada de 20 anos para voltar a Ítaca após a Guerra de Troia, enfrentando monstros e deuses enquanto sua esposa Penélope resiste em seu reino.',
    '2026-07-16',
    212,
    12,
    8.4,
    ['Ação', 'Aventura', 'Fantasia'],
    'https://image.tmdb.org/t/p/w600_and_h900_face/umlg3mqkny7opAfPtBLUGYwZ8xF.jpg',
    'imagens/a-odisseia.jpg'
  ),

]

function formatarHora(tempoEmMinutos) {
  const horas = Math.floor(tempoEmMinutos / 60);
  const minutos = tempoEmMinutos % 60;

  return `${horas}h ${minutos}min`;
}

// criação do código HTML do slideshow

criarSlideshow();

// configuração do slideshow

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName('slideshow-item');
  let dots = document.getElementsByClassName('dot');
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}

// **************

function criarCards(listaDeFilmes, container) {
  listaDeFilmes.forEach(filme => {
    // Criação de cada card utilizando DOM
    const divCol = document.createElement('div');
    divCol.classList.add('col-fr-1');
    container.appendChild(divCol);

    const divPoster = document.createElement('div');
    divPoster.classList.add('poster');
    divCol.appendChild(divPoster);

    const imgPoster = document.createElement('img');
    imgPoster.setAttribute('src', filme.poster);
    imgPoster.setAttribute('alt', filme.titulo);
    divPoster.appendChild(imgPoster);

    const spanNota = document.createElement('span');
    spanNota.classList.add('rating');
    if (filme.nota === null) {
      spanNota.textContent = '★ N/A';
    }
    else {
      spanNota.textContent = `★ ${filme.nota}`;
    }
    divPoster.appendChild(spanNota);

    const tituloH3 = document.createElement('h3');
    tituloH3.textContent = filme.titulo;

    const pGeneros = document.createElement('p');
    pGeneros.textContent = filme.generos.join(' • ');

    divCol.append(tituloH3, pGeneros);

    // ----------------

  });
}

// Selecionando o container para criar os cards de filmes por data de lançamento
const cardsNews = document.querySelector('.container-news');
// Ordenando os filmes por data de lançamento de forma decrescente (filmes mais recentes primeiro)
const filmesPorData = filmes.sort((a, b) => b.lancamento - a.lancamento);

// Rodando a função para criar os cards
criarCards(filmesPorData, cardsNews);


// Selecionando o container para criar os cards de filmes mais bem avaliados
const cardsTopRated = document.querySelector('.container-top-rated');
// Ordenando os filmes por nota de forma decrescente
const filmesPorNota = filmes.sort((a, b) => b.nota - a.nota);

// Rodando a função para criar os cards
criarCards(filmesPorNota, cardsTopRated);
