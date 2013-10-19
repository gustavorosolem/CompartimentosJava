package Conexao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

public class Conexao {
    //construtor
    public Conexao(Tratamento valores) throws SQLException {
        Connection conn = GerenciadorConexao.getConection();
        try {
            //String url_nome = Long.toHexString(Double.doubleToLongBits(Math.random()));
            String query = "insert into tb_registro (url_nome, passo, periodo, t, metodo) values (?,?,?,?,?)";
            PreparedStatement stm = conn.prepareStatement(query);
            /*stm.setString(1, url_nome);
            stm.setDouble(2, pass);
            stm.setDouble(3, temp);
            stm.setDouble(4, te);
            stm.setDouble(5, met);*/
            stm.execute();
            stm.clearParameters();       
            GerenciadorConexao.close(conn, stm);
            System.out.println("Rodou!");
        } catch (SQLException e) {
            System.out.println("Erro na inserção:" + e.getMessage());
        }
    }
}


    