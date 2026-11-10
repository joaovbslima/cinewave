<?php 

$config = require_once '../config.php';
require_once 'tmdb.php';

require_once 'database.php';


$token = $config['tmdb_token'];


// Busca os filmes em exibição
$urlNosCinemas = 'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&region=BR';
$dados = buscarTMDB($urlNosCinemas, $token);






// Abre a conexão com PDO

$pdo = conectarBanco($config);

$sql = "INSERT INTO filmes (
        tmdb_id,
        titulo,
        titulo_original,
        sinopse,
        data_lancamento,
        duracao_minutos,
        classificacao_indicativa,
        nota,
        quantidade_votos,
        popularidade,
        idioma_original,
        generos,
        poster_path,
        backdrop_path,
        trailer_key
        )
    VALUES (
        :tmdb_id,
        :titulo,
        :titulo_original,
        :sinopse,
        :data_lancamento,
        :duracao_minutos,
        :classificacao_indicativa,
        :nota,
        :quantidade_votos,
        :popularidade,
        :idioma_original,
        :generos,
        :poster_path,
        :backdrop_path,
        :trailer_key
    )
    ON DUPLICATE KEY UPDATE
        titulo = VALUES(titulo),
        titulo_original = VALUES(titulo_original),
        sinopse = VALUES(sinopse),
        data_lancamento = VALUES(data_lancamento),
        duracao_minutos = VALUES(duracao_minutos),
        classificacao_indicativa = VALUES(classificacao_indicativa),
        nota = VALUES(nota),
        quantidade_votos = VALUES(quantidade_votos),
        popularidade = VALUES(popularidade),
        idioma_original = VALUES(idioma_original),
        generos = VALUES(generos),
        poster_path = VALUES(poster_path),
        backdrop_path = VALUES(backdrop_path),
        trailer_key = VALUES(trailer_key)
    ";

// Prepara o SQL
$comando = $pdo->prepare($sql);


// Inicia o contador
$totalSincronizados = 0;


foreach ($dados['results'] as $filmeTMDB){


// Busca mais dados dos filmes
    $urlDetalhes = 'https://api.themoviedb.org/3/movie/' . $filmeTMDB['id'] .'?language=pt-BR&append_to_response=videos,release_dates';
    $dadosExtras = buscarTMDB($urlDetalhes, $token);

    
// extrai os gêneros
    $generosFilme = array_column(
        $dadosExtras['genres'] ?? [],
        'name'
    );

// zero a variável de classificação, pois posso receber valor vazio
    $classificacaoIndicativa = null;
    

// busco a classificação indicativa (censura)
    foreach ($dadosExtras['release_dates']['results'] ?? [] as $pais) {
        if ($pais['iso_3166_1'] === 'BR') {
            
            foreach ($pais['release_dates'] ?? [] as $lancamento) {
                if (!empty($lancamento['certification'])) {
                    $classificacaoIndicativa = $lancamento['certification'];
                    break;
                }
            }

            break;
        }
    }

// zero a variável de classificação, pois posso receber valor vazio
    $trailerKey = null;

// Busco a key do trailer do filme
    foreach ($dadosExtras['videos']['results'] ?? [] as $video) {
        if (
            ($video['site'] ?? '') === 'YouTube' &&
            ($video['type'] ?? '') === 'Trailer'
        ) {
            $trailerKey = $video['key'];

            if ($video['official'] ?? false) {
                break;
            }
        }
    }


// montagem do filme com os campos normalizados
    $filmeCineWave = [
        'tmdb_id' => $filmeTMDB['id'],
        'titulo' => $filmeTMDB['title'],
        'titulo_original' => $filmeTMDB['original_title'],
        'sinopse' => $filmeTMDB['overview'],
        'data_lancamento' => $filmeTMDB['release_date'] ?: null,
        'duracao_minutos' => $dadosExtras['runtime'] ?? null ,
        'classificacao_indicativa' => $classificacaoIndicativa,
        'nota' => $filmeTMDB['vote_average'],
        'quantidade_votos' => $filmeTMDB['vote_count'],
        'popularidade' => $filmeTMDB['popularity'],
        'idioma_original' => $filmeTMDB['original_language'],
        'generos' => $generosFilme,
        'poster_path' => $filmeTMDB['poster_path'] ?? null,
        'backdrop_path' => $filmeTMDB['backdrop_path'] ?? null,
        'trailer_key' => $trailerKey
        ];

// conversão dos gêneros para json
    $generosJson = json_encode(
        $filmeCineWave['generos'],
        JSON_UNESCAPED_UNICODE
    );

// executa o sql
    $comando->execute([
        'tmdb_id' => $filmeCineWave['tmdb_id'],
        'titulo' => $filmeCineWave['titulo'],
        'titulo_original' => $filmeCineWave['titulo_original'],
        'sinopse' => $filmeCineWave['sinopse'],
        'data_lancamento' => $filmeCineWave['data_lancamento'],
        'duracao_minutos' => $filmeCineWave['duracao_minutos'],
        'classificacao_indicativa' => $filmeCineWave['classificacao_indicativa'],
        'nota' => $filmeCineWave['nota'],
        'quantidade_votos' => $filmeCineWave['quantidade_votos'],
        'popularidade' => $filmeCineWave['popularidade'],
        'idioma_original' => $filmeCineWave['idioma_original'],
        'generos' => $generosJson,
        'poster_path' => $filmeCineWave['poster_path'],
        'backdrop_path' => $filmeCineWave['backdrop_path'],
        'trailer_key' => $filmeCineWave['trailer_key']
    ]);

// incrementa o contador
    $totalSincronizados++;

}

// resposta da sincronização dos filmes
$resposta = [
    'status' => 'sucesso',
    'total_sincronizados' => $totalSincronizados
];

header('Content-Type: application/json; charset=utf-8');

echo json_encode(
    $resposta,
    JSON_UNESCAPED_UNICODE |
    JSON_UNESCAPED_SLASHES |
    JSON_PRETTY_PRINT
);

?>