<?php
$paginaAtual = 'inicio';
$tituloPagina = 'CineWave';

require_once 'includes/header.php';
?>

        <main>
            <div class="slideshow">
                <!-- Preenchido via JavaScript -->

                <button
                    class="anterior"
                    type="button"
                    onclick="plusSlides(-1)"
                    aria-label="Slide anterior"
                >
                    &#10094;
                </button>
                <button
                    class="proximo"
                    type="button"
                    onclick="plusSlides(1)"
                    aria-label="Próximo slide"
                >
                    &#10095;
                </button>

                <div class="slideshow-dots">
                    <button
                        class="dot"
                        type="button"
                        onclick="currentSlide(1)"
                        aria-label="Ir para o slide 1"
                    ></button>

                    <button
                        class="dot"
                        type="button"
                        onclick="currentSlide(2)"
                        aria-label="Ir para o slide 2"
                    ></button>

                    <button
                        class="dot"
                        type="button"
                        onclick="currentSlide(3)"
                        aria-label="Ir para o slide 3"
                    ></button>
                </div>
            </div>

            <div class="catalogo">
                <div class="sub-title">
                    <h3>Agora nos cinemas</h3>
                    <h2>Lançamentos recentes</h2>
                </div>

                <div class="container-news">
                    <!-- Preenchido via JavaScript -->
                </div>

                <hr />

                <div class="sub-title">
                    <h3>Os mais bem avaliados</h3>
                    <h2>Top Rated</h2>
                </div>

                <div class="container-top-rated">
                    <!-- Preenchido via JavaScript -->
                </div>
            </div>
        </main>
<script src="assets/js/componentes.js"></script>
<script src="assets/js/home.js"></script>

<?php
require_once 'includes/footer.php';

?>