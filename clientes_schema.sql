CREATE TABLE `vendas`.`clientes` ( `id` INT NOT NULL AUTO_INCREMENT , `nome` VARCHAR(50) NOT NULL , 
`telefone` VARCHAR(50) NOT NULL , `data_compra` DATE NOT NULL , `total_compra` VARCHAR(50) NOT NULL , 
`tipo_pagamento` VARCHAR(50) NOT NULL , `observacao` TEXT NOT NULL , `status` VARCHAR(50) NOT NULL DEFAULT 'ativo' , 
PRIMARY KEY (`id`)) ENGINE = InnoDB;