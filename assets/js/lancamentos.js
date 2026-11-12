async function exibeLancamentos() {
    
    const containerLancamentos = document.querySelector('.container-lancamentos');
    
try {
        const filmes = await buscarFilmesEmExibicao();

        const lancamentos = [...filmes].sort((a, b) => {
            const dataA = new Date(a.lancamento);
            const dataB = new Date(b.lancamento);

            return dataB - dataA;
        });

        criarCards(lancamentos, containerLancamentos);
    }
    catch (erro) {
        console.error('Erro ao exibir os lançamentos:', erro);

        containerLancamentos.textContent =
            'Não foi possível carregar os lançamentos no momento.';
    }
}

exibeLancamentos();