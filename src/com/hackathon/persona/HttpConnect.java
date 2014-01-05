package com.hackathon.persona;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Scanner;

import org.json.JSONObject;
import org.json.JSONTokener;

public class HttpConnect {
	
	public static String convert(InputStream is) throws Exception
	{
	    Scanner s = new Scanner(is).useDelimiter("\\A");
	    String str = s.hasNext() ? s.next() : "";
	    is.close(); s.close();
	    return str;
	}
	
	public static JSONObject toJson(InputStream is) throws Exception
	{
        JSONObject rsp = new JSONObject(new JSONTokener(new InputStreamReader(is)));
        is.close();
        return rsp;
	}

}
