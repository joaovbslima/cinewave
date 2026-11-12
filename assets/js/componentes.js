function criarCards(listaDeFilmes, container, limite) {
    let listaCards = listaDeFilmes;
    if (limite !== 0 && limite !== undefined) {
        listaCards = listaDeFilmes.slice(0, limite);
    }
    listaCards.forEach(filme => {
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
    const notaExibida = filme.nota_cinewave ?? filme.nota;
    if (notaExibida === null) {
        spanNota.textContent = '★ N/A';
    }
    else {
        spanNota.textContent = `★ ${notaExibida}`;
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