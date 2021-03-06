SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';


-- -----------------------------------------------------
-- Table `tb_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tb_usuario` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `login` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_registro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tb_registro` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `url_nome` VARCHAR(32) NOT NULL,
  `passo` DOUBLE NULL,
  `periodo` DOUBLE NULL,
  `t` DOUBLE NULL,
  `metodo` INT(11) NULL,
  `data_criacao` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `data_modificacao` TIMESTAMP NULL,
  `request_ip` VARCHAR(45) NULL,
  `request_useragent` VARCHAR(150) NULL,
  `privado` TINYINT(1) NULL DEFAULT 0,
  `tb_usuario_id` BIGINT(20) UNSIGNED NULL,
  UNIQUE INDEX `id` (`id` ASC),
  UNIQUE INDEX `url_nome_UNIQUE` (`url_nome` ASC),
  PRIMARY KEY (`id`),
  INDEX `fk_tb_registro_tb_usuario1_idx` (`tb_usuario_id` ASC),
  CONSTRAINT `fk_tb_registro_tb_usuario1`
    FOREIGN KEY (`tb_usuario_id`)
    REFERENCES `tb_usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_caixa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tb_caixa` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(32) NOT NULL,
  `valor` DOUBLE NULL,
  `internal_id` VARCHAR(32) NOT NULL,
  `posTop` INT NULL,
  `posLeft` INT NULL,
  `tb_registro_id` BIGINT(20) UNSIGNED NOT NULL,
  UNIQUE INDEX `id` (`id` ASC),
  PRIMARY KEY (`id`),
  INDEX `fk_tb_caixa_tb_registro_idx` (`tb_registro_id` ASC),
  CONSTRAINT `fk_tb_caixa_tb_registro`
    FOREIGN KEY (`tb_registro_id`)
    REFERENCES `tb_registro` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_ligacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tb_ligacoes` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `caixa_saida_id` VARCHAR(32) NOT NULL,
  `caixa_chegada_id` VARCHAR(32) NOT NULL,
  `valor` DOUBLE NULL DEFAULT NULL,
  `tb_registro_id` BIGINT(20) UNSIGNED NOT NULL,
  UNIQUE INDEX `id` (`id` ASC),
  PRIMARY KEY (`id`),
  INDEX `fk_tb_ligacoes_tb_registro1_idx` (`tb_registro_id` ASC),
  CONSTRAINT `fk_tb_ligacoes_tb_registro1`
    FOREIGN KEY (`tb_registro_id`)
    REFERENCES `tb_registro` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
