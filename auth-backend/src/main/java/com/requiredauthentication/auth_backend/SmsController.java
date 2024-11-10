package com.requiredauthentication.auth_backend;

import com.requiredauthentication.auth_backend.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Random;

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
        return smsService.sendSms(number, "Your verification code is: " + verificationCode);
    }

    @PostMapping("/verifyCode")
    public String verifyCode(@RequestBody int code){
        if (code == verificationCode){
            return "Code Verified!";
        } else {
            return "Invalid Code!";
        }
    }
}
