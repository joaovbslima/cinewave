<?php 
header('Content-Type: application/json; charset=utf-8');

$config = require_once '../config.php';
require_once 'tmdb.php';

require_once 'database.php';


$token = $config['tmdb_token'];

$catalogosDisponiveis = [
    'now_playing' => [
        'url' => 'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&region=BR',
        'paginas' => 1
    ],

    'top_rated' => [
        'url' => 'https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&region=BR',
        'paginas' => 5
    ]
];

$chaveCatalogo = $_GET['catalogo'] ?? 'now_playing';

if (!isset($catalogosDisponiveis[$chaveCatalogo])) {
    http_response_code(400);

    echo json_encode(
        [
            'status' => 'erro',
            'mensagem' => 'Catálogo inválido.'
        ],
        JSON_UNESCAPED_UNICODE
    );

    exit;
}

$configuracaoCatalogo = $catalogosDisponiveis[$chaveCatalogo];

$urlBase = $configuracaoCatalogo['url'];
$quantidadePaginas = $configuracaoCatalogo['paginas'];






// Abre a conexão com PDO

$pdo = conectarBanco($config);


$sqlCatalogo = "SELECT id FROM catalogos WHERE chave = :chave";

$consultaCatalogo = $pdo->prepare($sqlCatalogo);

$consultaCatalogo->execute(['chave' => $chaveCatalogo]);


$catalogoId = $consultaCatalogo->fetchColumn();

if ($catalogoId === false) {
    throw new RuntimeException("O catálogo {$chaveCatalogo} não foi encontrado.");
}


$catalogoId = (int) $catalogoId;


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

$sqlBuscarFilmeId = "SELECT id FROM filmes WHERE tmdb_id = :tmdb_id";

$consultaFilmeId = $pdo->prepare($sqlBuscarFilmeId);

$sqlVinculoCatalogo = "INSERT INTO filmes_catalogos (
                                filme_id,
                                catalogo_id,
                                posicao
                            )
                            VALUES (
                                :filme_id,
                                :catalogo_id,
                                :posicao
                            )
                            ON DUPLICATE KEY UPDATE
                                posicao = VALUES(posicao),
                                sincronizado_em = CURRENT_TIMESTAMP
                        ";

$comandoVinculoCatalogo = $pdo->prepare($sqlVinculoCatalogo);



// Inicia o contador
$totalSincronizados = 0;
$posicaoGlobal = 1;
$paginasSincronizadas = 0;

for ($pagina = 1; $pagina <= $quantidadePaginas; $pagina++) {
    $urlPagina = $urlBase . '&page=' . $pagina;

    $dados = buscarTMDB($urlPagina, $token);

    foreach ($dados['results'] as $indice => $filmeTMDB){


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

    // Zera a chave do trailer, pois o filme pode não possuir um trailer válido
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
            'duracao_minutos' => $dadosExtras['runtime'] ?? null,
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

        $consultaFilmeId->execute(['tmdb_id' => $filmeCineWave['tmdb_id']]);

        $filmeId = $consultaFilmeId->fetchColumn();

        if ($filmeId === false) {
            throw new RuntimeException(
                'Não foi possível localizar o filme salvo no banco.'
            );
        }

        $filmeId = (int) $filmeId;

        $comandoVinculoCatalogo->execute([
            'filme_id' => $filmeId,
            'catalogo_id' => $catalogoId,
            'posicao' => $posicaoGlobal
        ]);

    // incrementa o contador
        $posicaoGlobal++;
        $totalSincronizados++;

    }
        $paginasSincronizadas++;

    if ($pagina >= ($dados['total_pages'] ?? 1)) {
        break;
    }
}

// resposta da sincronização dos filmes
$resposta = [
    'status' => 'sucesso',
    'catalogo' => $chaveCatalogo,
    'paginas_sincronizadas' => $paginasSincronizadas,
    'total_sincronizados' => $totalSincronizados
];


echo json_encode(
    $resposta,
    JSON_UNESCAPED_UNICODE |
    JSON_UNESCAPED_SLASHES |
    JSON_PRETTY_PRINT
);

?>