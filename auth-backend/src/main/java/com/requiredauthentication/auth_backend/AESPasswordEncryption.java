package com.requiredauthentication.auth_backend;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import java.util.Base64;
import java.security.SecureRandom;
import java.security.NoSuchAlgorithmException;
import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.InvalidAlgorithmParameterException;

public class AESPasswordEncryption {

    // Define constants
    private static final int KEY_LENGTH = 256; // AES 256-bit encryption
    private static final int ITERATION_COUNT = 65536; // PBKDF2 iteration count
    private static final int SALT_LENGTH = 16; // Salt length in bytes
    private static final int IV_LENGTH = 16; // IV length in bytes (for AES CBC mode)

    public static void main(String[] args) throws Exception {
        String password = "securePassword123";
        String originalMessage = "Hello World";

        // Encrypt the message
        String encryptedMessage = encrypt(originalMessage, password);
        System.out.println("Encrypted Message: " + encryptedMessage);

        // Decrypt the message
        String decryptedMessage = decrypt(encryptedMessage, password);
        System.out.println("Decrypted Message: " + decryptedMessage);
    }

    // AES encryption using a password
    public static String encrypt(String message, String password) throws Exception {
        // Generate a salt
        byte[] salt = new byte[SALT_LENGTH];
        new SecureRandom().nextBytes(salt);

        // Derive the key from the password and salt
        SecretKeySpec key = new SecretKeySpec(deriveKey(password, salt), "AES");

        // Generate a random IV (Initialization Vector)
        byte[] iv = new byte[IV_LENGTH];
        new SecureRandom().nextBytes(iv);
        IvParameterSpec ivSpec = new IvParameterSpec(iv);

        // Create AES cipher
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, key, ivSpec);

        // Encrypt the message
        byte[] encryptedData = cipher.doFinal(message.getBytes());

        // Combine salt and IV with encrypted data
        byte[] encryptedMessage = new byte[salt.length + iv.length + encryptedData.length];
        System.arraycopy(salt, 0, encryptedMessage, 0, salt.length);
        System.arraycopy(iv, 0, encryptedMessage, salt.length, iv.length);
        System.arraycopy(encryptedData, 0, encryptedMessage, salt.length + iv.length, encryptedData.length);

        // Return as base64 string
        return Base64.getEncoder().encodeToString(encryptedMessage);
    }

    // AES decryption using a password
    public static String decrypt(String encryptedMessage, String password) throws Exception {
        // Decode the base64-encoded encrypted message
        byte[] encryptedData = Base64.getDecoder().decode(encryptedMessage);

        // Extract salt and IV from the encrypted message
        byte[] salt = new byte[SALT_LENGTH];
        byte[] iv = new byte[IV_LENGTH];
        byte[] encryptedContent = new byte[encryptedData.length - SALT_LENGTH - IV_LENGTH];

        System.arraycopy(encryptedData, 0, salt, 0, SALT_LENGTH);
        System.arraycopy(encryptedData, SALT_LENGTH, iv, 0, IV_LENGTH);
        System.arraycopy(encryptedData, SALT_LENGTH + IV_LENGTH, encryptedContent, 0, encryptedContent.length);

        // Derive the key from the password and salt
        SecretKeySpec key = new SecretKeySpec(deriveKey(password, salt), "AES");

        // Create AES cipher
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        IvParameterSpec ivSpec = new IvParameterSpec(iv);
        cipher.init(Cipher.DECRYPT_MODE, key, ivSpec);

        // Decrypt the message
        byte[] decryptedData = cipher.doFinal(encryptedContent);
        return new String(decryptedData);
    }

    // Derive a key from the password and salt using PBKDF2
    private static byte[] deriveKey(String password, byte[] salt) throws Exception {
        PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), salt, ITERATION_COUNT, KEY_LENGTH);
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        return factory.generateSecret(spec).getEncoded();
    }
}
