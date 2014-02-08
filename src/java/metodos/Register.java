/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package metodos;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.bean.Usuario;
import model.dao.DaoUsuario;

/**
 *
 * @author Treewy-Netbook
 */
public class Register extends HttpServlet {
  protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();
    try {
      Usuario user = new Usuario();
      user.setLogin(request.getParameter("email"));
      user.setEmail(request.getParameter("email"));
      user.setSenha(request.getParameter("senha"));
      user.setNome(request.getParameter("nome"));
      DaoUsuario dao = new DaoUsuario(); //cria uma instancia do DAO usuario
      Boolean success = dao.setUsuario(user);
      out.print(success);
    } catch (SQLException ex) {
      Logger.getLogger(Register.class.getName()).log(Level.SEVERE, null, ex);
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
