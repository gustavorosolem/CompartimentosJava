package Conexao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

public class Conexao {

    private String connectionString;
    private String driverName = "com.mysql.jdbc.Driver"; //driver do MySQL
    private String database;
    private String user;
    private String password;
    private String host;
    private Connection connection = null;
    private double passo;
    private double periodo;

    //construtor
    public Conexao(double pass , double temp, double te, double met) throws SQLException {

        Connection conn = GerenciadorConexao.getConection();

       try {

            String url_nome = "teste3";
            String query = "insert into tb_registro (url_nome, passo, periodo, t, metodo) values (?,?,?,?,?)";
            PreparedStatement stm = conn.prepareStatement(query);
            stm.setString(1, url_nome);
            stm.setDouble(2, pass);
            stm.setDouble(3, temp);
            stm.setDouble(4, te);
            stm.setDouble(5, met);
            stm.execute();
            stm.clearParameters();       
            GerenciadorConexao.close(conn, stm);
            System.out.println("Rodou!");



        } catch (SQLException e) {
            System.out.println("Erro na inserção:" + e.getMessage());
        }
    }
}


    