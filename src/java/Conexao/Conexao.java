package Conexao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Conexao {
  //construtor

  public Conexao(String tipo, Tratamento valores) throws SQLException {
    Connection conn = GerenciadorConexao.getConection();
    PreparedStatement stm = null;
    ResultSet rs = null;
    PreparedStatement stm2 = null;
    ResultSet rs2 = null;
    try {
      //Verifica se o URL_NOME ja existe
      stm2 = conn.prepareStatement("SELECT id FROM tb_registro WHERE url_nome LIKE ?");
      stm2.setString(1, valores.url_nome);
      rs2 = stm2.executeQuery();
      String id = null;
      while (rs2.next()) {
        id = rs2.getString("id");
      }
      System.out.println(id);
      conn.setAutoCommit(false);
      String query;
      //Insert na tabela registro
      if (id == null) {
        query = "INSERT INTO tb_registro (url_nome, passo, periodo, t, metodo, data_modificacao, request_ip, request_useragent) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP,?,?)";
        stm = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
      } else {
        stm2 = conn.prepareStatement("DELETE FROM tb_caixa WHERE tb_registro_id = " + id);
        stm2.execute();
        stm2 = conn.prepareStatement("DELETE FROM tb_ligacoes WHERE tb_registro_id = " + id);
        stm2.execute();
        query = "UPDATE tb_registro SET url_nome=?, passo=?, periodo=?, t=?, metodo=?, data_modificacao=CURRENT_TIMESTAMP, request_ip=?, request_useragent=? WHERE id=" + id;
        stm = conn.prepareStatement(query);
      }
      long key = -1L;
      stm.setString(1, valores.url_nome);
      stm.setDouble(2, valores.passo);
      stm.setDouble(3, valores.periodo);
      stm.setDouble(4, valores.t);
      stm.setInt(5, valores.metodo);
      stm.setString(6, valores.request_ip);
      stm.setString(7, valores.request_useragent);
      stm.execute();
      if (id == null) {
        rs = stm.getGeneratedKeys();
        if (rs != null && rs.next()) {
          key = rs.getLong(1);
        }
      } else {
        key = Long.valueOf(id).longValue();
      }
      stm.clearParameters();
      conn.commit();

      //Insert na tabela caixa
      query = "INSERT INTO tb_caixa (nome, valor, internal_id, posTop, posLeft, tb_registro_id) VALUES (?,?,?,?,?,?)";
      stm = conn.prepareStatement(query);
      for (int i = 0; i < valores.caixa.size(); i++) {
        stm.setString(1, valores.caixa.get(i).nome);
        stm.setDouble(2, valores.caixa.get(i).valor);
        stm.setString(3, valores.caixa.get(i).id);
        stm.setInt(4, valores.caixa.get(i).posTop);
        stm.setInt(5, valores.caixa.get(i).posLeft);
        stm.setLong(6, key);
        stm.addBatch();
        if ((i + 1) % 1000 == 0) {
          stm.executeBatch();
        }
      }
      stm.executeBatch();

      //Insert na tabela ligacoes
      query = "INSERT INTO tb_ligacoes (caixa_saida_id, caixa_chegada_id, valor, tb_registro_id) VALUES (?,?,?,?)";
      stm = conn.prepareStatement(query);
      for (int i = 0; i < valores.ligacao.size(); i++) {
        stm.setString(1, valores.ligacao.get(i).saida_id);
        stm.setString(2, valores.ligacao.get(i).chegada_id);
        stm.setDouble(3, valores.ligacao.get(i).valor);
        stm.setLong(4, key);
        stm.addBatch();
        if ((i + 1) % 1000 == 0) {
          stm.executeBatch();
        }
      }
      stm.executeBatch();

      conn.commit();

      System.out.println("Rodou!");
    } catch (SQLException e) {
      System.out.println("Erro na inserção:" + e.getMessage());
    } finally {
      GerenciadorConexao.close(conn, stm, stm2, rs, rs2);
    }
  }
}
