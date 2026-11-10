<?php

$config = require_once '../config.php';
require_once 'tmdb.php';


// O token vem de um outro arquivo pra não ficar exposto nem no github
$token = $config['tmdb_token'];

$urlPopulares = 'https://api.themoviedb.org/3/movie/popular?language=pt-BR';
$dados = buscarTMDB($urlPopulares, $token);


// Realiza a busca dos gêneros

$mapaGeneros = buscarMapaGeneros('movie', $token);


// Cria o array com os filmes populares com os dados utilizados

$filmesCineWave = [];
$baseImagem = 'https://image.tmdb.org/t/p/w500';

foreach ($dados['results'] as $filmeTMDB){
    $generosFilme = [];

    foreach ($filmeTMDB['genre_ids'] as $idGenero) {
        if (isset($mapaGeneros[$idGenero])) {
            $generosFilme[] = $mapaGeneros[$idGenero];
        }
    }

    $filmeCineWave = [
        'tmdb_id' => $filmeTMDB['id'],
        'titulo' => $filmeTMDB['title'],
        'sinopse' => $filmeTMDB['overview'],
        'lancamento' => $filmeTMDB['release_date'],
        'nota' => $filmeTMDB['vote_average'],
        'poster' => $baseImagem . $filmeTMDB['poster_path'],
        'backdrop' => $baseImagem . $filmeTMDB['backdrop_path'],
        'generos' => $generosFilme
        ];
        
        $filmesCineWave[] = $filmeCineWave;
    }
        
header('Content-Type: application/json; charset=utf-8');
echo json_encode(
    $filmesCineWave,
    JSON_UNESCAPED_UNICODE |
    JSON_UNESCAPED_SLASHES |
    JSON_PRETTY_PRINT
);


?>

