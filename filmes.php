<?php
$paginaAtual = 'filmes';
$tituloPagina = 'Filmes | CineWave';

require_once 'includes/header.php';
?>

<main>
    <div class="catalogo">
        <div class="sub-title">
            <h1>Filmes</h1>
            <h2>Lista dos filmes ordenados pela popularidade</h2>
        </div>

        <div class="container-filmes container-cards">
            <!-- Preenchido via JavaScript -->
        </div>
    </div>
</main>

<script src="assets/js/componentes.js"></script>
<script src="assets/js/servicos-api.js"></script>
<script src="assets/js/filmes.js"></script>

<?php
require_once 'includes/footer.php';

?>