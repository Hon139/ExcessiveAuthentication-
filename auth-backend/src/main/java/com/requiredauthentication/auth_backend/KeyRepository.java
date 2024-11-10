package com.requiredauthentication.auth_backend;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface KeyRepository extends MongoRepository<KeyHolder, String> {
    Optional<KeyHolder> findByKey(String key);

}
