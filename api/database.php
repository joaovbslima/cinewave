<?php

function conectarBanco(array $config): PDO
{
    $db = $config['db'];

    $dsn = "mysql:host={$db['host']};dbname={$db['nome']};charset={$db['charset']}";

    $opcoes = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ];

    $pdo = new PDO(
        $dsn,
        $db['usuario'],
        $db['senha'],
        $opcoes
    );

    return $pdo;
}