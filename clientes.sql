-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 27-Jun-2022 às 15:36
-- Versão do servidor: 10.4.22-MariaDB
-- versão do PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `vendas`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT primary KEY,
  `nome` varchar(50) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  `data_compra` text NOT NULL,
  `total_compra` varchar(50) NOT NULL,
  `tipo_pagamento` varchar(50) NOT NULL,
  `primeira_parcela` text NOT NULL,
  `segunda_parcela` varchar(50) NOT NULL,
  `terceira_parcela` varchar(50) NOT NULL,
  `quarta_parcela` varchar(50) NOT NULL,
  `quinta_parcela` varchar(50) NOT NULL,
  `observacao` text NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'ativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `telefone`, `data_compra`, `total_compra`, `tipo_pagamento`, `primeira_parcela`, `segunda_parcela`, `terceira_parcela`, `quarta_parcela`, `quinta_parcela`, `observacao`, `status`) VALUES
(1, 'Iago Almeida', '(77) 98872-8483', '22/06/2022', '300,00', 'Cartão', '', '', '', '', '', 'Cliente deu 100 reais de entrada', 'ativo'),
(2, 'Andreia  Brito Sousa', '(77) 98801-7040', '10/06/2022', '50,00', 'Cartão', '', '', '', '', '', 'Teste, Teste', 'inativo'),
(3, 'Fabio Santos', '(77) 98159-8098', '10/06/2022', '50,00', 'Cartão', '10/07/2022', '', '', '', '', 'Teste', 'ativo'),
(4, 'Andreia  Brito Sousa', '(77) 98872-8483', '10/06/2022', '10,00', 'Cartão', '10/07/2022', '', '', '', '', 'pijpijpij', 'ativo'),
(5, 'Karol', '98845-0000', '30/01/2022', '60,00', 'Dinheiro', '30/02/2022', '30/03/2022', '30/04/2022', '30/05/2022', '30/06/2022', 'Teste', 'ativo'),
(6, 'Elane', '98843-6974', '22/06/2022', '300,00', 'Cartão', '22/07/2022', '', '', '', '', 'Vendido calça jeans', 'ativo');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
