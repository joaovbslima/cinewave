<?php 

header('Content-Type: application/json; charset=utf-8');

$config = require_once '../config.php';
require_once 'database.php';

$filmesCineWave = [];

header('Content-Type: application/json; charset=utf-8');

try {
    $pdo = conectarBanco($config);
    $sql = "SELECT
                f.tmdb_id,
                f.titulo,
                f.sinopse,
                f.data_lancamento AS lancamento,
                f.nota,
                f.duracao_minutos,
                f.classificacao_indicativa,
                f.generos,
                f.poster_path,
                f.backdrop_path,
                f.trailer_key
            FROM filmes AS f

            INNER JOIN filmes_catalogos AS fc
                ON fc.filme_id = f.id

            INNER JOIN catalogos AS c
                ON c.id = fc.catalogo_id

            WHERE c.chave = :chave
            ";
    $consulta = $pdo->prepare($sql);

    $consulta->execute([
        'chave' => 'now_playing'
    ]);

    $filmesBanco = $consulta->fetchAll();


    $baseImagem = 'https://image.tmdb.org/t/p/w500';
    $baseTrailer = 'https://www.youtube.com/watch?v=';

    foreach ($filmesBanco as $filme){
        
        $generos = json_decode($filme['generos'], true) ?? [];
        
        $filmeCineWave = [
            'tmdb_id' => $filme['tmdb_id'],
            'titulo' => $filme['titulo'],
            'sinopse' => $filme['sinopse'],
            'lancamento' => $filme['lancamento'] ?? null,
            'duracao' => $filme['duracao_minutos'] ?? null,
            'nota' => $filme['nota'],
            'classificacao_indicativa' => $filme['classificacao_indicativa'],
            'generos' => $generos,
            'poster' => $filme['poster_path'] !== null ? $baseImagem . $filme['poster_path'] : null,
            'backdrop' => $filme['backdrop_path'] !== null ? $baseImagem . $filme['backdrop_path'] : null,
            'trailer' => $filme['trailer_key'] !== null ? $baseTrailer . $filme['trailer_key'] : null
        ];

        $filmesCineWave[] = $filmeCineWave;
    }


} catch (PDOException $e) {
    http_response_code(500);

    echo json_encode(
        ['erro' => 'Não foi possível consultar os filmes.'],
        JSON_UNESCAPED_UNICODE
    );

    exit;
}


        
echo json_encode(
    $filmesCineWave,
    JSON_UNESCAPED_UNICODE |
    JSON_UNESCAPED_SLASHES |
    JSON_PRETTY_PRINT
);




?>