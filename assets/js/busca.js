(() => {
    const areaBusca = document.querySelector('#area-busca');
    const campoBusca = document.querySelector('#pesquisa');
    const listaResultados = document.querySelector('#resultados-busca');

    if (!areaBusca || !campoBusca || !listaResultados) {
        return;
    }

    let todosFilmes = [];

    function normalizarTexto(texto) {
        return String(texto ?? '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }

    function limparResultados() {
        listaResultados.replaceChildren();
        listaResultados.hidden = true;
    }

    function criarResultadoBusca(filme) {
        const item = document.createElement('li');
        const botao = document.createElement('button');
        const titulo = document.createElement('span');

        botao.type = 'button';
        botao.classList.add('resultado-busca');

        titulo.classList.add('resultado-busca__titulo');
        titulo.textContent = filme.titulo;

        botao.appendChild(titulo);

        const tituloOriginal = normalizarTexto(filme.titulo_original);
        const tituloTraduzido = normalizarTexto(filme.titulo);

        if (tituloOriginal && tituloOriginal !== tituloTraduzido) {
            const original = document.createElement('span');

            original.classList.add('resultado-busca__original');
            original.textContent = filme.titulo_original;

            botao.appendChild(original);
        }

        botao.addEventListener('click', () => {
            campoBusca.value = '';
            campoBusca.blur();

            limparResultados();
            abrirModalDetalhes(filme);
        });

        item.appendChild(botao);

        return item;
    }

    function exibirResultados(filmesEncontrados) {
        listaResultados.replaceChildren();

        if (filmesEncontrados.length === 0) {
            const mensagem = document.createElement('li');

            mensagem.classList.add('resultado-busca-vazio');
            mensagem.textContent = 'Nenhum filme encontrado';

            listaResultados.appendChild(mensagem);
            listaResultados.hidden = false;

            return;
        }

        filmesEncontrados.forEach((filme) => {
            const resultado = criarResultadoBusca(filme);

            listaResultados.appendChild(resultado);
        });

        listaResultados.hidden = false;
    }

    function pesquisaFilme(termoDigitado) {
        const termo = normalizarTexto(termoDigitado);

        if (termo.length < 2) {
            limparResultados();
            return;
        }

        const filmesEncontrados = todosFilmes
            .filter((filme) => {
                const titulo = normalizarTexto(filme.titulo);
                const tituloOriginal = normalizarTexto(
                    filme.titulo_original
                );

                return (
                    titulo.includes(termo) ||
                    tituloOriginal.includes(termo)
                );
            })
            .slice(0, 6);

        exibirResultados(filmesEncontrados);
    }

    async function inicializarBusca() {
        const placeholderOriginal = campoBusca.placeholder;

        campoBusca.disabled = true;
        campoBusca.placeholder = 'Carregando filmes...';

        try {
            todosFilmes = await buscarTodosFilmes();

            campoBusca.disabled = false;
            campoBusca.placeholder = placeholderOriginal;
        } catch (erro) {
            console.error('Erro ao inicializar a busca:', erro);

            campoBusca.disabled = true;
            campoBusca.placeholder = 'Busca indisponível';
        }
    }

    campoBusca.addEventListener('input', () => {
        pesquisaFilme(campoBusca.value);
    });

    campoBusca.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') {
            limparResultados();
            campoBusca.blur();
        }
    });

    document.addEventListener('click', (evento) => {
        if (!areaBusca.contains(evento.target)) {
            limparResultados();
        }
    });

    inicializarBusca();
})();