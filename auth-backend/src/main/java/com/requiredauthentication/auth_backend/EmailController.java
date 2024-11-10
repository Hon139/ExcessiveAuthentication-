package com.requiredauthentication.auth_backend;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Random;

@RestController
public class EmailController {
    private JavaMailSender mailSender;
    private int verificationCode; 

    public EmailController(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }

    @PostMapping("/verifyCode")
    public String verifyCode(@RequestBody int code){
        if (code == verificationCode){
            return "Code Verified!";
        } else {
            return "Invalid Code!";
        }
    }


    @PutMapping("/sendEmail")
    public String sendEmail(@RequestBody String email){
        try {
            Random rand = new Random();
            verificationCode = rand.nextInt(1000000);
            

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("26342@noreply.com");
        message.setTo(email);
        message.setSubject("YOUR Verification Code");
        message.setText("Your verification code is: " + verificationCode);
        mailSender.send(message);
        return "Email Sent!";
        } catch (Exception e) {
            return  e.getMessage();
        }
    }
}
