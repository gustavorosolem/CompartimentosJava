package functions;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Gustavo Rosolem
 */
public class exportTXT extends HttpServlet {

  private static final int BYTES_DOWNLOAD = 1024;

  @Override
  public void doGet(HttpServletRequest request,
          HttpServletResponse response) throws IOException {
    response.setContentType("text/plain");
    response.setHeader("Content-Disposition",
            "attachment;filename=downloadname.txt");
    ServletContext ctx = getServletContext();
    InputStream is = ctx.getResourceAsStream("/testing.txt");

    int read = 0;
    byte[] bytes = new byte[BYTES_DOWNLOAD];
    OutputStream os = response.getOutputStream();

    while ((read = is.read(bytes)) != -1) {
      os.write(bytes, 0, read);
    }
    os.flush();
    os.close();
  }
}
