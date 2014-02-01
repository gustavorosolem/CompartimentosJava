/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package model.dao;

import Conexao.GerenciadorConexao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

public class DaoUsuarioComp {

  public List<String> UsuarioRegistros(String id) throws SQLException {
    Connection conn = GerenciadorConexao.getConection();
    PreparedStatement stm = null;
    ResultSet rs = null;
    List<String> registros = new ArrayList<String>();
    try {
      stm = conn.prepareStatement("SELECT url_nome FROM tb_registro WHERE tb_usuario_id LIKE ?");
      stm.setString(1, id);
      rs = stm.executeQuery();
      while (rs.next()) {
        registros.add(rs.getString("url_nome"));
      }
    } catch (SQLException e) {
      System.out.println("Erro:" + e.getMessage());
    } finally {
      GerenciadorConexao.close(conn, stm, rs);
    }
    return registros;
  }
}
