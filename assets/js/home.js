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
  listaEstreias.slice(1, 4).forEach(filme => {
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

    const spanDuracao = document.createElement('span');
    spanDuracao.textContent = formatarHora(filme.duracao);
    metaSlide.appendChild(spanDuracao);

    const spanClassificacao = document.createElement('span');
    spanClassificacao.textContent = filme.classificacao_indicativa;
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
    botaoSlidePrimario.setAttribute('href', filme.trailer);
    botaoSlidePrimario.setAttribute('target', "_blank");
    botaoSlidePrimario.textContent = 'Assistir trailer';
    acoesSlide.appendChild(botaoSlidePrimario);

    const botaoSlideSecundario = document.createElement('a');
    botaoSlideSecundario.classList.add('botao-slide');
    botaoSlideSecundario.classList.add('botao-secundario');
    botaoSlideSecundario.textContent = '+ Minha lista';
    acoesSlide.appendChild(botaoSlideSecundario)

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


// Selecionando o container para criar os cards de filmes por data de lançamento
const cardsNews = document.querySelector('.container-news');

// Selecionando o container para criar os cards de filmes mais bem avaliados
const cardsTopRated = document.querySelector('.container-top-rated');


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

    criarCards(filmesRecentes, cardsNews, 10);

    
    const filmesTop = await buscarFilmesTopRated();
    criarCards(filmesTop, cardsTopRated, 10);

}

inicializaHome();