SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';


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
  UNIQUE INDEX `id` (`id` ASC),
  UNIQUE INDEX `url_nome_UNIQUE` (`url_nome` ASC),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_caixa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tb_caixa` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(32) NOT NULL,
  `valor` DOUBLE NULL,
  `internal_id` VARCHAR(32) NOT NULL,
  `tb_registro_id` BIGINT(20) UNSIGNED NOT NULL,
  UNIQUE INDEX `id` (`id` ASC),
  PRIMARY KEY (`id`),
  INDEX `fk_tb_caixa_tb_registro_idx` (`tb_registro_id` ASC),
  CONSTRAINT `fk_tb_caixa_tb_registro`
    FOREIGN KEY (`tb_registro_id`)
    REFERENCES `tb_registro` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
