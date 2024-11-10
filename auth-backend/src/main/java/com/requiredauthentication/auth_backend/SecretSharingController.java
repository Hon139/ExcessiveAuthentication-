package com.requiredauthentication.auth_backend;

import com.codahale.shamir.Scheme;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Map;
import java.util.Base64;
import java.util.HashMap;

@RestController
public class SecretSharingController {
private Scheme scheme;

    @GetMapping("/secret")
    public Map<Integer, byte[]> secretSharing(@RequestParam String s, @RequestParam int n, @RequestParam int k) {
        scheme = new Scheme(new SecureRandom(), n, k);
        byte[] secret = s.getBytes(StandardCharsets.UTF_8);
        Map<Integer, byte[]> parts = scheme.split(secret);

        return parts;
    }

    @PostMapping("/restore")
    public String restore(@RequestBody Map<Integer, byte[]> keys) {
        byte[] recovered = scheme.join(keys);
        return new String(recovered, StandardCharsets.UTF_8);
    }

}
