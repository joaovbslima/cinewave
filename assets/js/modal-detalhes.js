// Seleção dos elementos que serão alterados
const modalDetalhes = document.querySelector('#modal-detalhes');
const botaoFecharModal = document.querySelector('.fechar');
const posterModal = document.querySelector('.poster-modal img');
const tituloModal = document.querySelector('#titulo-modal');
const generosModal = document.querySelector('.generos-modal');
const sinopseModal = document.querySelector('.sinopse-modal');
const lancamentoModal = document.querySelector('.span-lancamento');
const duracaoModal = document.querySelector('.span-duracao');
const classificacaoModal = document.querySelector('.span-classificacao');
const notaModal = document.querySelector('#nota');
const quantidadeVotosModal = document.querySelector('#qtd-votos-modal');
const botaoTrailerModal = document.querySelector('.botao-modal');


function horaFormatada(tempoEmMinutos) {
  const horas = Math.floor(tempoEmMinutos / 60);
  const minutos = tempoEmMinutos % 60;

  return `${horas}h ${minutos}min`;
}


function abrirModalDetalhes(filme) {
    tituloModal.textContent = filme.titulo ?? 'Título não informado';

    if (filme.generos.length > 0) {
        generosModal.textContent = filme.generos.join(' • ');
    } else {
        generosModal.textContent = 'Gênero não informado';
    }


    if (filme.sinopse) {
        sinopseModal.textContent = filme.sinopse;
    } else {
        sinopseModal.textContent = 'Sinopse não disponível.';
    }


    if (filme.poster) {
        posterModal.src = filme.poster;
        posterModal.alt = `Pôster de ${filme.titulo}`;
    } else {
        posterModal.removeAttribute('src');
        posterModal.alt = 'Pôster não disponível';
    }

    if (filme.lancamento) {
        lancamentoModal.textContent = filme.lancamento.split('-')[0];
    } else {
        lancamentoModal.textContent = 'Data não informada';
    }

    if (filme.duracao) {
        duracaoModal.textContent = horaFormatada(filme.duracao);
    } else {
        duracaoModal.textContent = 'Duração não informada';
    }

    if (filme.classificacao_indicativa) {
        if (filme.classificacao_indicativa === 'L') {
            classificacaoModal.textContent = 'Livre';
        } else {
            classificacaoModal.textContent =
                `${filme.classificacao_indicativa} anos`;
        }
    } else {
        classificacaoModal.textContent = 'Não informada';
    }

    const notaExibida = filme.nota_cinewave ?? filme.nota;

    if (notaExibida !== null && notaExibida !== undefined) {
        notaModal.textContent = notaExibida;
    } else {
        notaModal.textContent = 'N/A';
    }

    if (filme.quantidade_votos !== null && filme.quantidade_votos !== undefined) {
        quantidadeVotosModal.textContent = `${filme.quantidade_votos.toLocaleString('pt-BR')} votos`;
    } else {
        quantidadeVotosModal.textContent = 'Votos não informados';
    }

    if (filme.trailer) {
        botaoTrailerModal.href = filme.trailer;
        botaoTrailerModal.hidden = false;
    } else {
        botaoTrailerModal.removeAttribute('href');
        botaoTrailerModal.hidden = true;
    }

    if (filme.backdrop) {
        modalDetalhes.style.backgroundImage = `linear-gradient(rgba(8, 11, 18, 0.88), rgba(8, 11, 18, 0.96)), url("${filme.backdrop}")`;
    } else {
        modalDetalhes.style.backgroundImage = 'none';
    }


    modalDetalhes.showModal();
}

botaoFecharModal.addEventListener('click', () => {
    modalDetalhes.close();
});

