/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package metodos;

import com.google.gson.Gson;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.URLDecoder;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.bean.Dados;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;

/**
 *
 * @author Gustavo Rosolem
 */
public class Export extends HttpServlet {

  protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    //ServletOutputStream out = response.getOutputStream();
    ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
    DataOutputStream out = new DataOutputStream(byteOut);
    response.setContentType("application/octet-stream");
    String type = request.getParameter("type");
    String sep;
    if (type.equals("txt")) {
      sep = "\t";
    } else if (type.equals("csv")) {
      sep = ";";
    } else {
      sep = ";";
    }
    String dados = URLDecoder.decode(request.getParameter("dados"), "UTF-8");
    Gson gson = new Gson();
    Dados data = gson.fromJson(dados, Dados.class);
    try {
      //Type listType = new TypeToken<LinkedList<LinkedList<Dados>>>() {}.getType();
      //out.writeBytes(dados);
      if (type.equals("txt") || type.equals("csv")) {
        out.writeBytes("Passo");
        for (int i = 0; i < data.dados.size(); i++) {
          out.writeBytes(sep + data.dados.get(i).label);
        }
        for (int i = 0; i < data.dados.get(0).pontos.size(); i++) {
          out.writeBytes("\r\n");
          out.writeBytes(String.valueOf(data.dados.get(0).pontos.get(i).x));
          System.out.println(data.dados.get(0).pontos.get(i));
          for (int j = 0; j < data.dados.size(); j++) {
            out.writeBytes(sep);
            out.writeBytes(String.valueOf(data.dados.get(j).pontos.get(i).y));
          }
        }
      } else if (type.equals("xls")) {
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet1 = wb.createSheet("Compartimentos");

        //Config Geral
        //sheet1.setPrintGridlines(false);
        //sheet1.setDisplayGridlines(false);
        HSSFRow row = null;
        HSSFCell cel = null;

        //Bold
        HSSFFont fonte = wb.createFont();
        fonte.setFontName("Arial");
        fonte.setBoldweight((short) 700);
        HSSFCellStyle bold = wb.createCellStyle();
        bold.setFont(fonte);

        row = sheet1.createRow(0);
        cel = row.createCell(0);
        cel.setCellStyle(bold);
        cel.setCellValue("Passo");
        for (int i = 0; i < data.dados.size(); i++) {
          cel = row.createCell(i + 1);
          cel.setCellStyle(bold);
          cel.setCellValue((String) data.dados.get(i).label);
        }
        for (int i = 0; i < data.dados.get(0).pontos.size(); i++) {
          row = sheet1.createRow(i + 1);
          cel = row.createCell(0);
          cel.setCellType(Cell.CELL_TYPE_NUMERIC);
          cel.setCellValue((Double) data.dados.get(0).pontos.get(i).x);
          for (int j = 0; j < data.dados.size(); j++) {
            cel = row.createCell(j + 1);
            cel.setCellType(Cell.CELL_TYPE_NUMERIC);
            cel.setCellValue((Double) data.dados.get(j).pontos.get(i).y);
          }
        }
        wb.write(out);
      } else {
        out.writeChars("Formato não identificado");
        System.out.println(type);
      }
    } catch (Exception e) {
      System.out.println(e);
      out.writeBytes(e.toString());
    } finally {
      response.addHeader("Content-Disposition", "attachment; filename=\"compartimentos-" + data.url + "." + type + "\";");
      byte[] buf = byteOut.toByteArray();
      response.setContentLength(buf.length);
      ServletOutputStream servletOut = response.getOutputStream();
      servletOut.write(buf);
      servletOut.close();
      out.flush();
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
