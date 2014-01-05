package com.hackathon.persona;

import java.io.InputStream;
import java.net.URL;
import java.net.URLEncoder;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.PutMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.json.JSONObject;

import com.google.appengine.api.urlfetch.FetchOptions;
import com.google.appengine.api.urlfetch.HTTPHeader;
import com.google.appengine.api.urlfetch.HTTPMethod;
import com.google.appengine.api.urlfetch.HTTPRequest;
import com.google.appengine.api.urlfetch.HTTPResponse;
import com.google.appengine.api.urlfetch.URLFetchService;
import com.google.appengine.api.urlfetch.URLFetchServiceFactory;

public class ApigeeConnect 
{
	public final static String ORG = "mailrecipe";
	public final static String APP = "salesrecipe";
	public final static String USER = "salesrecipe";
	public final static String PASS = "mailrecipe";
	
	private String access_token;
	
	private FetchOptions getOptions()
	{
	    FetchOptions fetchOptions = FetchOptions.Builder.withDefaults();
	    fetchOptions.doNotValidateCertificate();
	    fetchOptions.setDeadline(60D);
	    return fetchOptions;
	}
	
	public ApigeeConnect() throws Exception
	{
	    URLFetchService fetcher = URLFetchServiceFactory.getURLFetchService();
	    URL url = new URL("https://api.usergrid.com/"+ORG+"/"+APP+"/token");
        String authjs = "{\"grant_type\":\"password\",\"username\":\""+USER+"\",\"password\":\""+PASS+"\"}";
        HTTPRequest request = new HTTPRequest(url, HTTPMethod.POST, getOptions());
        request.setPayload(authjs.getBytes("UTF-8"));
        HTTPResponse rs = fetcher.fetch(request);
        JSONObject rsp = new JSONObject(new String(rs.getContent()));
		this.access_token = (String)rsp.get("access_token");
	}

	public String query(String type, String query) throws Exception
	{
	    URLFetchService fetcher = URLFetchServiceFactory.getURLFetchService();
	    URL url = new URL("https://api.usergrid.com/"+ORG+"/"+APP+"/"+type);
        HTTPRequest request = new HTTPRequest(url, HTTPMethod.GET, getOptions());
        request.setHeader(new HTTPHeader("Authorization", "Bearer " + access_token));
        String qry = "ql="+URLEncoder.encode(query);
        request.setPayload(qry.getBytes("UTF-8"));
        HTTPResponse rs = fetcher.fetch(request);
	    return new String(rs.getContent());
	}
	
	public String create(String type, String json) throws Exception
	{
		HttpClient httpclient = new HttpClient();
		PostMethod post = new PostMethod("https://api.usergrid.com/"+ORG+"/"+APP+"/"+type+"/");
		post.setRequestHeader("Authorization", "Bearer " + access_token);
		StringRequestEntity requestEntity = new StringRequestEntity(json, "application/json", "UTF-8");
		post.setRequestEntity(requestEntity);
		httpclient.executeMethod(post);
		InputStream is = post.getResponseBodyAsStream();
	    return HttpConnect.convert(is);
	}

	public String read(String type, String id) throws Exception
	{
	    URLFetchService fetcher = URLFetchServiceFactory.getURLFetchService();
	    URL url = new URL("https://api.usergrid.com/"+ORG+"/"+APP+"/"+type+"/"+id);
        HTTPRequest request = new HTTPRequest(url, HTTPMethod.GET, getOptions());
        request.setHeader(new HTTPHeader("Authorization", "Bearer " + access_token));
        HTTPResponse rs = fetcher.fetch(request);
	    return new String(rs.getContent());
	}
	
	public String update(String type, String id, String json) throws Exception
	{
		HttpClient httpclient = new HttpClient();
		PutMethod put = new PutMethod("https://api.usergrid.com/"+ORG+"/"+APP+"/"+type+"/"+id);
		put.setRequestHeader("Authorization", "Bearer " + access_token);
		StringRequestEntity requestEntity = new StringRequestEntity(json, "application/json", "UTF-8");
		put.setRequestEntity(requestEntity);
		httpclient.executeMethod(put);
		InputStream is = put.getResponseBodyAsStream();
	    return HttpConnect.convert(is);
	}
	
	public static void main(String[] args) throws Exception
	{
		ApigeeConnect cn = new ApigeeConnect();
		//String cr = cn.update("cases", "3e7bdeda-684e-11e3-aae4-9fd8f000f962", "{\"name\":\"Mani Doraisamy\", \"company\":\"Hello\"}");
		String cr = cn.create("cases", "[{\"name\":\"mani.doraisamy@gmail.com\"}, {\"name\":\"aslatha@gmail.com\"}]");
		System.out.println(cr);
		String qry = cn.query("cases", "select *");
		System.out.println(qry);
	}

}
