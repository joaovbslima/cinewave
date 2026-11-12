<!doctype html>
<html lang="pt-BR">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="assets/css/estilo.css" />
        <link
            rel="icon"
            href="assets/images/favicon-cinewave.svg"
            type="image/svg+xml"
        />
        <title><?php echo $tituloPagina; ?></title>
    </head>

    <body>
        <header class="header">
            <div class="logo">
                <a href="index.php">
                    <img
                        src="assets/images/logo-cinewave-branco.png"
                        alt="CineWave"
                    />
                </a>
            </div>

            <nav class="menu">
                <a class="item-menu" href="index.php" <?php echo $paginaAtual === 'inicio' ? 'aria-current="page"' : '' ?> >Início</a>
                <a class="item-menu" href="filmes.php" <?php echo $paginaAtual === 'filmes' ? 'aria-current="page"' : '' ?> >Filmes</a>
                <a class="item-menu" href="series.php" <?php echo $paginaAtual === 'series' ? 'aria-current="page"' : '' ?> >Séries</a>
                <a class="item-menu" href="lancamentos.php" <?php echo $paginaAtual === 'lancamentos' ? 'aria-current="page"' : '' ?> >Lançamentos</a>
                <!-- <a class="item-menu" href="minha-lista.html">Minha lista</a> -->
            </nav>
            <div class="actions">
                <div class="busca">
                    <input
                        id="pesquisa"
                        type="search"
                        placeholder="Buscar Título"
                        aria-label="Buscar filmes e séries"
                    />
                </div>

                <a id="link-login" href="login.html">Login</a>
            </div>
        </header>
