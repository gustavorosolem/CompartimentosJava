package Conexao;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

public class PegaDados extends HttpServlet {

  protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    try {
      String tipo = request.getParameter("tipo");
      Gson gson = new Gson();

      if (tipo.equals("insert")) {
        response.setContentType("text/html;charset=UTF-8");
        String valores = request.getParameter("valores");
        Tratamento valoresTratados = gson.fromJson(valores, Tratamento.class);
        valoresTratados.request_ip = request.getRemoteAddr();
        valoresTratados.request_useragent = request.getHeader("user-agent");
        System.out.println("JSON = \t" + gson.toJson(valoresTratados));
        Conexao con = new Conexao(tipo, valoresTratados);
        out.println("Salvo com Sucesso!");
      } else if (tipo.equals("select")) {
        response.setContentType("text/json");
        String url_nome = request.getParameter("url_nome");
        Conexao_select con = new Conexao_select(tipo, url_nome);
        out.println(gson.toJson(con));
      }
    } catch (SQLException ex) {
      Logger.getLogger(PegaDados.class.getName()).log(Level.SEVERE, null, ex);
      out.println("Ocorreu um erro. Tente novamente");
    } finally {
      out.close();
    }
  }

  // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
  /**
   * Handles the HTTP
   * <code>GET</code> method.
   *
   * @param request servlet request
   * @param response servlet response
   * @throws ServletException if a servlet-specific error occurs
   * @throws IOException if an I/O error occurs
   */
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    processRequest(request, response);
  }

  /**
   * Handles the HTTP
   * <code>POST</code> method.
   *
   * @param request servlet request
   * @param response servlet response
   * @throws ServletException if a servlet-specific error occurs
   * @throws IOException if an I/O error occurs
   */
  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    processRequest(request, response);
  }

  /**
   * Returns a short description of the servlet.
   *
   * @return a String containing servlet description
   */
  @Override
  public String getServletInfo() {
    return "Short description";
  }// </editor-fold>
}
