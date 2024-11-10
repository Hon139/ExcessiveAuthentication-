package com.requiredauthentication.auth_backend;

import com.requiredauthentication.auth_backend.SmsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Random;

@Slf4j
@RestController
@RequestMapping("/sms")
public class SmsController {

    @Autowired
    private SmsService smsService;
    private int verificationCode;

    @PutMapping("/send")
    public String sendSms(@RequestBody String number) {
        Random rand = new Random();
        verificationCode = rand.nextInt(1000000);

        System.out.println(number);
        log.info("sent code to " + number);
        return smsService.sendSms(number, "Your YUSoSecure verification code is: " + verificationCode);
    }

    @PostMapping("/verifyCode")
    public String verifyCode(@RequestBody int code){
        if (code == verificationCode){
            return "Code Verified!";
        } else {
            return "Invalid Code!";
        }
    }

    @PostMapping("/receive")
    public String receiveSms(@RequestParam Map<String, String> messageData) {
        String from = messageData.get("From");  // Sender's phone number
        String to = messageData.get("To");      // Your SignalWire number
        String body = messageData.get("Body");  // The message content

        System.out.println("Received SMS from: " + from);
        System.out.println("Message content: " + body);
        log.info("Received SMS from: " + from);

        // Process the message as needed (e.g., save it to a database, respond, etc.)
        smsService.sendSms(from, "Message Received");
        return "Message received successfully";
    }
}
