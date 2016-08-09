package com.hackoutwest.adderollen.autodj.Activities.AsyncTasks;

import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;

import com.hackoutwest.adderollen.autodj.Activities.Constants;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Date;
import java.util.Map;

/**
 * Created by adderollen on 2016-08-09.
 */
public class AsyncSendUpdate extends AsyncTask<Map<String, String>, Void, Integer> {

    private static final String TAG = "AsyncSendUpdate";

    private Context context;

    public AsyncSendUpdate(Context context) {
        this.context = context;
    }

    @Override
    protected Integer doInBackground(Map<String, String>... params) {
        Map<String, String>[] parameters = params.clone();

        if(parameters.length > 1) {
            throw new IllegalArgumentException("Too many parameters");
        }

        String age = parameters[0].get(Constants.AGE);
        String gender = parameters[0].get(Constants.GENDER);
        String value = parameters[0].get(Constants.VALUE);
        Long timestamp = new Date().getTime();

        HttpClient httpClient = new DefaultHttpClient();
        HttpPost httpPost = new HttpPost(Constants.BASE_URL+"/guestUpdate");

        JSONObject requestData = new JSONObject();

        try {
            requestData.put("age", age);
            requestData.put("gender", gender);
            requestData.put("value", value);
            requestData.put("timestamp", timestamp);

            StringEntity se = new StringEntity(requestData.toString(), "UTF-8");
            se.setContentType("application/json");
            se.setContentEncoding(new BasicHeader(HTTP.CONTENT_TYPE,"application/json"));

            httpPost.setEntity(se);

            // Execute HTTP Post Request
            HttpResponse httpResponse = httpClient.execute(httpPost);
            int status = httpResponse.getStatusLine().getStatusCode();
            String responsText = EntityUtils.toString(httpResponse.getEntity(), "UTF-8");

            Log.d(TAG, responsText);

        } catch (IOException e) {
            Log.e(TAG, e.getMessage());
            e.printStackTrace();
        } catch (JSONException e) {
            Log.e(TAG, e.getMessage());
            e.printStackTrace();
        }


        return null;
    }
}
