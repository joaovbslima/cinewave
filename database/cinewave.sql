-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 12/11/2026 às 18:58
-- Versão do servidor: 10.11.16-MariaDB
-- Versão do PHP: 8.3.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `cinewave`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `catalogos`
--

CREATE TABLE `catalogos` (
  `id` int(10) UNSIGNED NOT NULL,
  `chave` varchar(50) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `catalogos`
--

INSERT INTO `catalogos` (`id`, `chave`, `nome`, `criado_em`) VALUES
(1, 'now_playing', 'Em exibição', '2026-11-10 15:38:39'),
(2, 'top_rated', 'Mais bem avaliados', '2026-11-10 15:38:39');

-- --------------------------------------------------------

--
-- Estrutura para tabela `filmes`
--

CREATE TABLE `filmes` (
  `id` int(10) UNSIGNED NOT NULL,
  `tmdb_id` int(10) UNSIGNED NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `titulo_original` varchar(255) DEFAULT NULL,
  `sinopse` text DEFAULT NULL,
  `data_lancamento` date DEFAULT NULL,
  `duracao_minutos` smallint(5) UNSIGNED DEFAULT NULL,
  `classificacao_indicativa` varchar(10) DEFAULT NULL,
  `nota` decimal(4,2) UNSIGNED NOT NULL DEFAULT 0.00,
  `quantidade_votos` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `popularidade` decimal(10,3) UNSIGNED NOT NULL DEFAULT 0.000,
  `idioma_original` char(2) DEFAULT NULL,
  `generos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`generos`)),
  `poster_path` varchar(255) DEFAULT NULL,
  `backdrop_path` varchar(255) DEFAULT NULL,
  `trailer_key` varchar(100) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `filmes_catalogos`
--

CREATE TABLE `filmes_catalogos` (
  `filme_id` int(10) UNSIGNED NOT NULL,
  `catalogo_id` int(10) UNSIGNED NOT NULL,
  `posicao` smallint(5) UNSIGNED NOT NULL,
  `sincronizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `catalogos`
--
ALTER TABLE `catalogos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_catalogos_chave` (`chave`);

--
-- Índices de tabela `filmes`
--
ALTER TABLE `filmes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_filmes_tmdb_id` (`tmdb_id`),
  ADD KEY `idx_filmes_data_lancamento` (`data_lancamento`);

--
-- Índices de tabela `filmes_catalogos`
--
ALTER TABLE `filmes_catalogos`
  ADD PRIMARY KEY (`filme_id`,`catalogo_id`),
  ADD KEY `idx_filmes_catalogos_catalogo_posicao` (`catalogo_id`,`posicao`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `catalogos`
--
ALTER TABLE `catalogos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `filmes`
--
ALTER TABLE `filmes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `filmes_catalogos`
--
ALTER TABLE `filmes_catalogos`
  ADD CONSTRAINT `fk_filmes_catalogos_catalogo` FOREIGN KEY (`catalogo_id`) REFERENCES `catalogos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_filmes_catalogos_filme` FOREIGN KEY (`filme_id`) REFERENCES `filmes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
