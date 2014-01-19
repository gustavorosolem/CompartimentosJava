/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package model.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.bean.Usuario;
import Conexao.GerenciadorConexao;

/**
 *
 * @author Treewy-Netbook
 */
public class DaoUsuario {

  public Usuario getUsuario(String login, String senha) throws SQLException {
    Connection conn = GerenciadorConexao.getConection();
    PreparedStatement stm = null;
    ResultSet rs = null;
    try {
      stm = conn.prepareStatement("SELECT id, nome FROM tb_usuario WHERE login LIKE ? AND senha LIKE ?");
      stm.setString(1, login);
      stm.setString(2, senha);
      rs = stm.executeQuery();
      if (rs.next()) {
        Usuario user = new Usuario();
        user.setId(rs.getInt("id"));
        user.setLogin(login);
        user.setSenha(senha);
        user.setNome(rs.getString("nome"));
        return user;
      }
      System.out.println("Rodou!");
    } catch (SQLException e) {
      System.out.println("Erro na inserção:" + e.getMessage());
    } finally {
      GerenciadorConexao.close(conn, stm, rs);
    }
    return null;
  }
}
