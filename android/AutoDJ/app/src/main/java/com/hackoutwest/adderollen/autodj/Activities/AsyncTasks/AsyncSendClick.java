package com.hackoutwest.adderollen.autodj.Activities.AsyncTasks;

import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;

import com.hackoutwest.adderollen.autodj.Activities.Constants;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by adderollen on 2016-08-09.
 */
public class AsyncSendClick extends AsyncTask<Map<String, String>, Void, Integer> {

    private Context context;
    private static final String TAG = "AsyncSendClick";

    public AsyncSendClick(Context context) {
        this.context = context;
    }

    @Override
    protected Integer doInBackground(Map... params) {
        Map<String, String>[] parameters = params.clone();

        if(parameters.length > 1) {
            throw new IllegalArgumentException("Too many parameters");
        }

        String age = parameters[0].get(Constants.AGE);
        String gender = parameters[0].get(Constants.GENDER);
        String value = parameters[0].get(Constants.VALUE);
        Long timestamp = new Date().getTime();

        try {
            String url = Constants.BASE_URL + "/updates";
            URL urlObj = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) urlObj.openConnection();

            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type","application/json");

            // Add all the data
            JSONObject requestData = new JSONObject();
            requestData.put("age", age);
            requestData.put("gender", gender);
            requestData.put("value", value);
            requestData.put("timestamp", timestamp);

            // Send the data
            connection.setDoOutput(true);
            DataOutputStream write = new DataOutputStream(connection.getOutputStream());
            write.writeUTF(requestData.toString());
            write.flush();
            write.close();

            // Receive the response
            int responseCode = connection.getResponseCode();
            Log.d(TAG, "Send data to server: " + requestData.toString(2));
            Log.d(TAG, "Resonse code: " + responseCode);

            BufferedReader inData = new BufferedReader(
                    new InputStreamReader(connection.getInputStream()));
            String output;
            StringBuffer response = new StringBuffer();

            while ((output = inData.readLine()) != null) {
                response.append(output);
            }
            inData.close();

            Log.d(TAG, "Response: " + response.toString());


        } catch (MalformedURLException e) {
            Log.e(TAG, e.getMessage());
            e.printStackTrace();
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
