<?php 
header('Content-Type: application/json; charset=utf-8');

$config = require_once '../config.php';
require_once 'database.php';

$filmesCineWave = [];

try {
    $pdo = conectarBanco($config);

    $sql = "SELECT
                f.tmdb_id,
                f.titulo,
                f.sinopse,
                f.data_lancamento AS lancamento,
                f.nota,
                f.quantidade_votos,
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

            ORDER BY fc.posicao ASC
    ";

    $consulta = $pdo->prepare($sql);

    $consulta->execute([
        'chave' => 'top_rated'
    ]);

    $filmesBanco = $consulta->fetchAll();

    $consultaMedia = $pdo->query("SELECT AVG(nota) FROM filmes WHERE quantidade_votos > 0");
    $mediaGeral = (float) $consultaMedia->fetchColumn();
    $pesoMinimo = 5000;

    foreach ($filmesBanco as $indice => $filme) {
        $nota = (float) $filme['nota'];
        $quantidadeVotos = (int) $filme['quantidade_votos'];

        $notaCineWave = (($quantidadeVotos * $nota) + ($pesoMinimo * $mediaGeral)) / ($quantidadeVotos + $pesoMinimo);

        $filmesBanco[$indice]['nota_cinewave'] = $notaCineWave;
    }
    
    
    $baseImagem = 'https://image.tmdb.org/t/p/w500';
    $baseTrailer = 'https://www.youtube.com/watch?v=';

    foreach ($filmesBanco as $filme) {
        $generos = json_decode(
            $filme['generos'],
            true
        ) ?? [];

        $filmeCineWave = [
            'tmdb_id' => $filme['tmdb_id'],
            'titulo' => $filme['titulo'],
            'sinopse' => $filme['sinopse'],
            'lancamento' => $filme['lancamento'] ?? null,
            'duracao' => $filme['duracao_minutos'] ?? null,
            'nota' => (float) $filme['nota'],
            'nota_cinewave' => round((float) $filme['nota_cinewave'],1),
            'quantidade_votos' => (int) $filme['quantidade_votos'],
            'classificacao_indicativa' => $filme['classificacao_indicativa'],
            'generos' => $generos,
            'poster' => $filme['poster_path'] !== null ? $baseImagem . $filme['poster_path'] : null,
            'backdrop' => $filme['backdrop_path'] !== null ? $baseImagem . $filme['backdrop_path'] : null,
            'trailer' => $filme['trailer_key'] !== null ? $baseTrailer . $filme['trailer_key'] : null
        ];

        $filmesCineWave[] = $filmeCineWave;
    }

    usort(
        $filmesCineWave,
        function ($filmeA, $filmeB) {
            $comparacaoNota =
                (float) $filmeB['nota_cinewave']
                <=> (float) $filmeA['nota_cinewave'];

            if ($comparacaoNota !== 0) {
                return $comparacaoNota;
            }

            return (int) $filmeB['quantidade_votos']
                <=> (int) $filmeA['quantidade_votos'];
        }
    );

} catch (PDOException $e) {
    http_response_code(500);

    echo json_encode(
        ['erro' => 'Não foi possível consultar os filmes mais bem avaliados.'],
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