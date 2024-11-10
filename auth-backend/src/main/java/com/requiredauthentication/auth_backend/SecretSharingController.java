package com.requiredauthentication.auth_backend;

import com.codahale.shamir.Scheme;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.HashMap;
import java.util.regex.Pattern;

@RestController
public class SecretSharingController {
private Scheme scheme;
private Map<Integer, byte[]> part;
private int partLength;

    @Autowired
    KeyRepository keyRepository;

    @PutMapping("/secret")
    public void secretSharing(@RequestBody String[] passwords) throws Exception {
        scheme = new Scheme(new SecureRandom(), 4, 2);
        String s = "Hello World!";
        byte[] secret = s.getBytes(StandardCharsets.UTF_8);
        Map<Integer, byte[]> parts = scheme.split(secret);
        part = parts;
        partLength = parts.get(1).length;

        keyRepository.deleteAll();
        for (Map.Entry<Integer, byte[]> entry : parts.entrySet()) {
            String message = Base64.getEncoder().encodeToString(entry.getValue());
            message = entry.getKey() + ":" + message;
            String password = passwords[entry.getKey()-1];
            String encryptedMessage = AESPasswordEncryption.encrypt(message, password);
            KeyHolder keyHolder = new KeyHolder(UUID.randomUUID().toString(), encryptedMessage);
            keyRepository.save(keyHolder);
        }

    }

    @PostMapping("/restore")
    public String restore(@RequestBody String[] passwords) throws Exception {
        String regex = "^[0-9]+:.+$";
        Pattern pattern = Pattern.compile(regex);
        Map<Integer, byte[]> parts = new HashMap<>();
        List<KeyHolder> keys = keyRepository.findAll();
        System.out.println(keys.size());
        for (String password : passwords) {
            System.out.println("password: " + password);
            String decrypted = "";
            for (KeyHolder keyHolder : keys) {
                try {
                    decrypted = AESPasswordEncryption.decrypt(keyHolder.getKey(), password);
                } catch (Exception e) {
                    decrypted = "";
                }
                System.out.println(decrypted);
                if (pattern.matcher(decrypted).matches()) {
                    System.out.println("matches");
                    break;
                }
            }
            String[] message = decrypted.split(":");
            parts.put(Integer.parseInt(message[0]), Base64.getDecoder().decode(message[1]));
        }
        for (Map.Entry<Integer, byte[]> entry : parts.entrySet()) {
            System.out.println(entry.getKey() + ":" + entry.getValue());
            System.out.println(entry.getValue().length);
            System.out.println(part.get(entry.getKey()).length);
            String rec = new String(entry.getValue(), StandardCharsets.UTF_8);
            String old = new String(part.get(entry.getKey()), StandardCharsets.UTF_8);
            System.out.println(new String(entry.getValue(), StandardCharsets.UTF_8));
            System.out.println(new String(part.get(entry.getKey()), StandardCharsets.UTF_8));
            System.out.println(rec.equals(old));
        }
        byte[] recovered = scheme.join(parts);
        byte[] actual = scheme.join(part);
        System.out.println(new String(actual, StandardCharsets.UTF_8));
        return new String(recovered, StandardCharsets.UTF_8);
    }

}
