package com.requiredauthentication.auth_backend;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("KeyHolder")
public class KeyHolder {
    @Id
    private String id;

    private String key;

    public KeyHolder(String id, String key) {
        this.id = id;
        this.key = key;
    }

    public String getKey() {
        return key;
    }
}
