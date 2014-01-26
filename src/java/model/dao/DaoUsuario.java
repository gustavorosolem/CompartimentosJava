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
import model.bean.Usuario;

/**
 *
 * @author Treewy-Netbook
 */
public class DaoUsuario {

  public Usuario getUsuario(String email, String senha) throws SQLException {
    Connection conn = GerenciadorConexao.getConection();
    PreparedStatement stm = null;
    ResultSet rs = null;
    try {
      stm = conn.prepareStatement("SELECT id, nome FROM tb_usuario WHERE email LIKE ? AND senha LIKE ?");
      stm.setString(1, email);
      stm.setString(2, senha);
      rs = stm.executeQuery();
      if (rs.next()) {
        Usuario user = new Usuario();
        user.setId(rs.getInt("id"));
        user.setLogin(email);
        user.setSenha(senha);
        user.setNome(rs.getString("nome"));
        return user;
      }
      System.out.println("Rodou!");
    } catch (SQLException e) {
      System.out.println("Erro:" + e.getMessage());
    } finally {
      GerenciadorConexao.close(conn, stm, rs);
    }
    return null;
  }

  public boolean setUsuario(Usuario user) throws SQLException {
    Connection conn = GerenciadorConexao.getConection();
    PreparedStatement stm = null;
    try {
      stm = conn.prepareStatement("INSERT INTO tb_usuario (nome, login, senha, email) VALUES (?,?,?,?)");
      stm.setString(1, user.getNome());
      stm.setString(2, user.getLogin());
      stm.setString(3, user.getSenha());
      stm.setString(4, user.getEmail());
      stm.execute();
      System.out.println("Cadastrado");
      return true;
    } catch (SQLException e) {
      System.out.println("Erro na inserção:" + e.getMessage());
      return false;
    } finally {
      GerenciadorConexao.close(conn, stm);
    }
  }
}
