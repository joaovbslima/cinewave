function formatarHora(tempoEmMinutos) {
  const horas = Math.floor(tempoEmMinutos / 60);
  const minutos = tempoEmMinutos % 60;

  return `${horas}h ${minutos}min`;
}

// criação do código HTML do slideshow
function criarSlideshow(listaEstreias) {

  // Criação do hero/slideshow de forma dinâmica
  const slideshow = document.querySelector('.slideshow');
  // criação de cada item do slideshow
  listaEstreias.slice(0, 3).forEach(filme => {
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
    const dataLancamento = new Date(filme.lancamento + 'T00:00:00')
    spanLancamento.textContent = dataLancamento.toLocaleDateString('pt-BR');
    metaSlide.appendChild(spanLancamento);

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

// configuração do slideshow

let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;

    const slides = document.getElementsByClassName('slideshow-item');
    const dots = document.getElementsByClassName('dot');

    if (n > slides.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slides.length;
    }

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

// Selecionando o container para criar os cards de filmes mais bem avaliados
const cardsTopRated = document.querySelector('.container-top-rated');


// Buscando os dados dos filmes através de requisição feita no arquivo php
async function buscarFilmesEmExibicao() {
  const resposta = await fetch('../cinewave/api/lancamentos.php');

  if (!resposta.ok) {
    throw new Error('Erro ao buscar filmes em exibição');
  }
  const filmes = await resposta.json();

  return filmes;

}

async function buscarFilmesTopRated() {
  const resposta = await fetch('../cinewave/api/top-rated.php');

  if (!resposta.ok) {
    throw new Error('Erro ao buscar filmes Top Rated');
  }
  const filmes = await resposta.json();

  return filmes;
}


// Inicialização do slideshow e dos catálogos da Home
async function inicializaHome() {
    
    const filmes = await buscarFilmesEmExibicao();

// Aqui os filmes são reordenados para estes cards serem montados na ordem de lançamento (mais recente >)
    const filmesRecentes = [...filmes].sort((a, b) => {
        const dataA = new Date(a.lancamento);
        const dataB = new Date(b.lancamento);

        return dataB - dataA;
    });

    criarSlideshow(filmesRecentes);

    showSlides(slideIndex);

    criarCards(filmesRecentes, cardsNews);

    
    const filmesTop = await buscarFilmesTopRated();
    criarCards(filmesTop, cardsTopRated);

}

inicializaHome();