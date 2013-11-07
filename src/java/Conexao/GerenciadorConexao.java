package Conexao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class GerenciadorConexao {

    public static Connection getConection()
            throws SQLException {
        Connection conn = null;
        try {
            Class.forName("org.gjt.mm.mysql.Driver");
            //conn = DriverManager.getConnection("jdbc:mysql://treewy.com:3306/treewyco_testes", "treewyco_teste", "1q2w3e");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/teste", "root", "1q2w3e");
        } catch (ClassNotFoundException e) {
            throw new SQLException("Driver não encontrado: ", e);
        } catch (SQLException e) {
            throw new SQLException("Erro ao obter a conexão: ", e);
        }

        return conn;
    }

    public static void close(Connection conn, Statement stmt) {
        try {
            if (stmt != null) {
                stmt.close();
            }

            if (conn != null) {
                conn.close();
            }
        } catch (SQLException e) {

           //System.out.println("Problemas no fechamento da conexão "+e);
        }
    }

    public static void close(Connection conn, Statement stmt, ResultSet rs) {
        try {
            if (stmt != null) {
                stmt.close();
            }

            if (rs != null) {
                rs.close();
            }

            if (conn != null) {
                conn.close();
            }
        } catch (SQLException e) {
           //System.out.println("Problemas no fechamento da conexão "+e);
        }
    }

    public static void close(Connection conn, Statement stmt, Statement stmt1, ResultSet rs) {
        try {
            if (stmt != null) {
                stmt.close();
            }

            if (stmt1 != null) {
                stmt1.close();
            }

            if (rs != null) {
                rs.close();
            }

            if (conn != null) {
                conn.close();
            }
        } catch (SQLException e) {
           //System.out.println("Problemas no fechamento da conexão "+e);
        }
    }

    public static void close(Connection conn, Statement stmt, Statement stmt1, Statement stmt2, ResultSet rs) {
        try {
            if (stmt != null) {
                stmt.close();
            }

            if (stmt1 != null) {
                stmt1.close();
            }

            if (stmt2 != null) {
                stmt2.close();
            }

            if (rs != null) {
                rs.close();
            }

            if (conn != null) {
                conn.close();
            }
        } catch (SQLException e) {
           //System.out.println("Problemas no fechamento da conexão "+e);
        }
    }

    public static void close(Connection conn, Statement stmt, ResultSet rs1, ResultSet rs2) {
        try {
            if (stmt != null) {
                stmt.close();
            }

            if (rs1 != null) {
                rs1.close();
            }

            if (rs2 != null) {
                rs2.close();
            }

            if (conn != null) {
                conn.close();
            }
        } catch (SQLException e) {
           //System.out.println("Problemas no fechamento da conexão "+e);
        }
    }

    public static void close(Connection conn, Statement stmt, Statement stmt1, ResultSet rs1, ResultSet rs2) {
        try {
            if (stmt != null) {
                stmt.close();
            }

            if (stmt1 != null) {
                stmt1.close();
            }

            if (rs1 != null) {
                rs1.close();
            }

            if (rs2 != null) {
                rs2.close();
            }

            if (conn != null) {
                conn.close();
            }
        } catch (SQLException e) {
           //System.out.println("Problemas no fechamento da conexão "+e);
        }
    }
}
