/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package metodos;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import model.bean.Usuario;
import model.dao.DaoUsuario;

/**
 *
 * @author Treewy-Netbook
 */
public class Login extends HttpServlet {
  private static final long serialVersionUID = 7633293501883840556L;
  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    HttpSession session = request.getSession(); //obtem a sessao do usuario, caso exista
    response.setContentType("text/html;charset=UTF-8");
    Usuario user = null;
    String login_form = request.getParameter("email"); // Pega o Login vindo do formulario
    String senha_form = request.getParameter("senha"); //Pega a senha vinda do formulario

    try {
      DaoUsuario dao = new DaoUsuario(); //cria uma instancia do DAO usuario
      user = dao.getUsuario(login_form, senha_form);
    } catch (Exception e) {
      System.out.println(e);
    }

    //se nao encontrou usuario no banco, redireciona para a pagina de erro!
    if (user == null) {
      session.invalidate();
      out.print(false);
    } else {
      //se o dao retornar um usuario, coloca o mesmo na sessao
      session.setAttribute("user", user);
      Gson gson = new Gson();
      out.print(gson.toJson(user));
    }
    out.close();
  }
}
