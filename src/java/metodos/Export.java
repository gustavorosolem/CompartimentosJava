/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package metodos;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.bean.Dados;

/**
 *
 * @author Gustavo Rosolem
 */
public class Export extends HttpServlet {

  protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setContentType("text/html;charset=UTF-8");
    //PrintWriter out = response.getWriter();
    ServletOutputStream out = null;
    try {
      String type = request.getParameter("type");
      String dados = URLDecoder.decode(request.getParameter("dados"), "UTF-8");
      Gson gson = new Gson();
      Type listType = new TypeToken<LinkedList<LinkedList<Dados>>>() {
      }.getType();
      List data = gson.fromJson(dados, listType);

      if (type.equals("txt")) {
        out = response.getOutputStream();
        response.setContentType("application/octet-stream");
        response.addHeader("Content-Disposition", "attachment; filename=\"compartimentos." + type + "\";");
        System.out.println(data);
        System.out.println(data.get(0));
        /*for (int i = 0; i < data.get(0).size(); i++) {
          
         /*tabela += '<tr>';
         tabela += '<td>' + dps[0][i].x + '</td>';
         for (int j = 0; j < dps.size(); j++) {
         tabela += '<td>' + dps[j][i].y + '</td>';
         }
         tabela += '</tr>';
         }
         /*for (String d : data) {          System.out.println(d);
          out.println(d);

         }*/
        //out.print(dados); // coloca os dados aqui
      }
      out.flush();
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
