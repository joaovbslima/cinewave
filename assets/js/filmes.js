async function exibeTodosFilmes() {
    
    const containerFilmes = document.querySelector('.container-filmes');
    
try {
        const filmes = await buscarTodosFilmes();

        criarCards(filmes, containerFilmes);
    }
    catch (erro) {
        console.error('Erro ao exibir os filmes:', erro);

        containerFilmes.textContent =
            'Não foi possível carregar os filmes no momento.';
    }
}

exibeTodosFilmes();