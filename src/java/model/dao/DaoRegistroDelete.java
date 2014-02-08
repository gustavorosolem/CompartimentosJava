package model.dao;

import Conexao.GerenciadorConexao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Gustavo Rosolem
 */
public class DaoRegistroDelete {

  public String DeleteRegistro(String registroId, String userId) throws SQLException {
    Connection conn = GerenciadorConexao.getConection();
    conn.setAutoCommit(false);
    PreparedStatement stm = null;
    ResultSet rs = null;
    Long resultId = null;
    String resultUser = "NULL";
    String resposta = "false";
    try {
      if (userId.equals("false")) {
        stm = conn.prepareStatement("SELECT id, tb_usuario_id FROM tb_registro WHERE url_nome LIKE ?");
        stm.setString(1, registroId);
      } else {
        stm = conn.prepareStatement("SELECT id, tb_usuario_id FROM tb_registro WHERE url_nome LIKE ? AND tb_usuario_id = ?");
        stm.setString(1, registroId);
        stm.setString(2, userId);
      }
      rs = stm.executeQuery();
      if (rs.next()) {
        resultId = rs.getLong("id");
        resultUser = rs.getString("tb_usuario_id");
        System.out.println("resultUser: " + resultUser);
      }
      if (userId.equals("false") && !resultUser.equals("NULL")) {
        resposta = "false";
      } else if (resultId != null) {
        stm = conn.prepareStatement("DELETE FROM tb_caixa WHERE tb_registro_id = " + resultId);
        stm.execute();
        stm = conn.prepareStatement("DELETE FROM tb_ligacoes WHERE tb_registro_id = " + resultId);
        stm.execute();
        stm = conn.prepareStatement("DELETE FROM tb_registro WHERE id = " + resultId);
        stm.execute();
        conn.commit();
        resposta = "true";
      }





    } catch (SQLException e) {
      System.out.println("Erro:" + e.getMessage());
    } finally {
      GerenciadorConexao.close(conn, stm, rs);
    }
    return resposta;
  }
}
