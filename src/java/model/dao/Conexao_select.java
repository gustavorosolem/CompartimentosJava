package model.dao;

import Conexao.GerenciadorConexao;
import model.bean.Ligacao;
import model.bean.Registro;
import model.bean.Blocos;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Conexao_select {
  private Registro valores = new Registro();
  public Conexao_select(String tipo, String url_nome) throws SQLException {
    Connection conn = GerenciadorConexao.getConection();
    PreparedStatement stm = null;
    ResultSet rs = null;
    try {
      //Select na tabela registro
      stm = conn.prepareStatement("SELECT * FROM tb_registro WHERE url_nome LIKE ?");
      stm.setString(1, url_nome);
      rs = stm.executeQuery();
      int id = 0;
      valores.vazio = true;
      while (rs.next()) {
        id = rs.getInt("id");
        valores.url_nome = rs.getString("url_nome");
        valores.passo = rs.getDouble("passo");
        valores.periodo = rs.getDouble("periodo");
        valores.t = rs.getDouble("t");
        valores.metodo = rs.getInt("metodo");
        valores.privado = rs.getBoolean("privado");
        valores.usuario_id = rs.getString("tb_usuario_id");
        valores.vazio = false;
      }

      //Select na tabela caixa
      stm = conn.prepareStatement("SELECT * FROM tb_caixa WHERE tb_registro_id=?");
      stm.setInt(1, id);
      rs = stm.executeQuery();
      while (rs.next()) {
        Blocos blocos = new Blocos();
        blocos.id = rs.getString("internal_id");
        blocos.nome = rs.getString("nome");
        blocos.valor = rs.getDouble("valor");
        blocos.posTop = rs.getInt("posTop");
        blocos.posLeft = rs.getInt("posLeft");
        valores.caixa.add(blocos);
      }

      //Select na tabela caixa
      stm = conn.prepareStatement("SELECT * FROM tb_ligacoes WHERE tb_registro_id=?");
      stm.setInt(1, id);
      rs = stm.executeQuery();
      while (rs.next()) {
        Ligacao ligacao = new Ligacao();
        ligacao.saida_id = rs.getString("caixa_saida_id");
        ligacao.chegada_id = rs.getString("caixa_chegada_id");
        ligacao.valor = rs.getDouble("valor");
        valores.ligacao.add(ligacao);
      }

      System.out.println("valores: " + valores);
    } catch (SQLException e) {
      System.out.println("Erro na inserção:" + e.getMessage());
    } finally {
      GerenciadorConexao.close(conn, stm, rs);
    }
  }

  public Registro getResultado() {
    return valores;
  }
}
