import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})

export class EncrDecrService {

    encryptSecretKey = "mySecretKeyHere";
    encryptedKey = "3EFC1E6734BBD5EB14D133CBE39CB305"; // mySecretKeyHere => aes-128 => 

    encrypt(msg) {
        const keySize = 256;
        const salt = CryptoJS.lib.WordArray.random(16);
        const key = CryptoJS.PBKDF2(this.encryptSecretKey, salt, {
            keySize: keySize / 32,
            iterations: 100
        });
        const iv = CryptoJS.lib.WordArray.random(128 / 8);
        const encrypted = CryptoJS.AES.encrypt(msg, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        const result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
        return result;
    }

    decrypt(ciphertextB64) {

        const key = CryptoJS.enc.Utf8.parse(this.encryptedKey);
        const iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);

        const decrypted = CryptoJS.AES.decrypt(ciphertextB64, key, { iv: iv });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}
