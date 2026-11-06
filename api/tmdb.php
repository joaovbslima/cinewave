<?php 


// Função genérica que faz a busca dos dados na TMDB,
// recebendo a URL dos dados necessários e o token de acesso.
function buscarTMDB($url, $token) {
    

    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    curl_setopt($curl, CURLOPT_HTTPHEADER,[
        'Accept: application/json',
        'Authorization: Bearer ' . $token
    ]);

    $resposta = curl_exec($curl);

    if(curl_errno($curl)) {
        echo "Erro no cURL: " . curl_error($curl);
        exit;
    }


    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    if ($status !== 200) {
        echo 'Erro HTTP: ' . $status;
        exit;
    }

    $dados = json_decode($resposta, true);

    return $dados;
    

}

function buscarMapaGeneros($tipo, $token) {
    $urlGeneros = "https://api.themoviedb.org/3/genre/$tipo/list?language=pt-BR";

    $dadosGeneros = buscarTMDB($urlGeneros, $token);

    $mapaGeneros = [];

    foreach ($dadosGeneros['genres'] as $genero) {
        $mapaGeneros[$genero['id']] = $genero['name'];

    }

    return $mapaGeneros;

}


?>