<?php
$paginaAtual = 'lancamentos';
$tituloPagina = 'Lançamentos | CineWave';

require_once 'includes/header.php';
?>

<main>
    <div class="catalogo">
        <div class="sub-title">
            <h1>Agora nos cinemas</h1>
            <h2>Lançamentos recentes</h2>
        </div>

        <div class="container-lancamentos container-cards">
            <!-- Preenchido via JavaScript -->
        </div>
    </div>
</main>
<script src="assets/js/componentes.js"></script>
<script src="assets/js/servicos-api.js"></script>
<script src="assets/js/lancamentos.js"></script>
<?php
require_once 'includes/footer.php';

?>