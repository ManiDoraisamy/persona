package com.hackathon.persona;

import java.io.IOException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class PersonaServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException 
	{
		try
		{
			String email = req.getParameter("email");
			ApigeeConnect cn = new ApigeeConnect();
			String prfjs = cn.read("profiles", email);
			resp.getWriter().write(prfjs);
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			throw new IOException(ex);
		}
	}
}
