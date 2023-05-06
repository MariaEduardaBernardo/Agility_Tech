import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import com.mysql.cj.jdbc.MysqlDataSource;

public class MeuServlet extends HttpServlet {
  private DataSource dataSource;

  public void init() throws ServletException {
    MysqlDataSource ds = new MysqlDataSource();
    ds.setURL("jdbc:mysql://localhost:3306/PDS");
    ds.setUser("usuario");
    ds.setPassword("senha");
    dataSource = ds;
  }

  protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
    String nome = request.getParameter("nome");
    String email = request.getParameter("email");

    try (Connection conn =
