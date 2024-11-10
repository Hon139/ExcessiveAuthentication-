package com.requiredauthentication.auth_backend;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    @Value("${signalwire.space_url}")
    private String spaceUrl;

    @Value("${signalwire.project_id}")
    private String projectId;

    @Value("${signalwire.api_token}")
    private String apiToken;

    @Value("${signalwire.from_number}")
    private String fromNumber;

    public String sendSms(String to, String message) {
        String url = "https://" + spaceUrl + "/api/laml/2010-04-01/Accounts/" + projectId + "/Messages.json";
        try {
            HttpResponse<String> response = Unirest.post(url)
                    .basicAuth(projectId, apiToken)
                    .field("From", fromNumber)
                    .field("To", to)
                    .field("Body", message)
                    .asString();
            System.out.println("from:" + fromNumber);

            if (response.getStatus() == 201) {
                System.out.println("Message sent successfully!");
                return "Message sent to " + to;
            } else {
                System.out.println("Error: " + response.getBody());
                return "Failed to send message.";
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "An error occurred while sending the message.";
        }
    }
}
