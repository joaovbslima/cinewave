<?php

$config = require_once '../config.php';


if (isset($config['tmdb_token'])) {
    echo 'Configuração carregada com sucesso.';
}

?>