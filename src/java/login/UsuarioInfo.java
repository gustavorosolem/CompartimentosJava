/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package login;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.*;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.bean.Usuario;
import model.dao.DaoUsuarioComp;

/**
 *
 * @author Treewy-Netbook
 */
public class UsuarioInfo extends HttpServlet {

  protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();
    try {
      Gson gson = new Gson();
      HttpSession session = request.getSession();
      if (session.getAttribute("user") != null) {
        Usuario user = (model.bean.Usuario) session.getAttribute("user");
        DaoUsuarioComp dao = new DaoUsuarioComp(); //cria uma instancia do DAO usuario
        List<String> registros;
        registros = dao.UsuarioRegistros(Integer.toString(user.getId()));

        final JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("nome", user.getNome());
        final JsonArray jsonRegistrosArray = new JsonArray();
        for (final String registro : registros) {
          final JsonPrimitive jsonRegistro = new JsonPrimitive(registro);
          jsonRegistrosArray.add(jsonRegistro);
        }
        jsonObject.add("urls", jsonRegistrosArray);

        gson.toJson(jsonObject, out);
      } else {
        out.print(false);
      }
    } catch (SQLException e) {
      System.out.println("Erro:" + e.getMessage());
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
