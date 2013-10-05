/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
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

public class PegaDados extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            /*String[] myJsonData = request.getParameterValues("json[]");
            out.println("JSON = \t"+myJsonData[0]);
            System.out.println("JSON = \t"+myJsonData[0]);*/
            
            String passo = request.getParameter("passo");
            System.out.println("passo = \t"+passo);
            out.println("passo = \t"+passo);
           
            String periodo = request.getParameter("periodo");
            System.out.println("periodo = \t"+periodo);
             out.println("periodo = \t"+periodo);
           
            String t = request.getParameter("t");
            System.out.println("t = \t"+t);
            out.println("t = \t"+t);
           
            String metodo = request.getParameter("metodo");
            System.out.println("metodo = \t"+metodo);
            out.println("metodo = \t"+metodo);         
                      
           
            double pass = Double.valueOf(passo);
            double temp = Double.valueOf(periodo);
            double te = Double.valueOf(t);
            double met = Double.valueOf(metodo);
           
            Conexao con = new Conexao(pass,temp,te,met);     

        } catch (SQLException ex) {
            Logger.getLogger(PegaDados.class.getName()).log(Level.SEVERE, null, ex);
            
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
