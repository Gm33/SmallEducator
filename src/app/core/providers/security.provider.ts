import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SecurityProvider {

  // The private key which is required to encrypt and decrypt.
  private encryptSecretKey: string = 'vy1mdsxHnU6YsKom5mK6RdVkjN7HT2PS1PDTNjolByOIWHjMqVhOJePfXciyZjTsRGftwcjq8DSkes0C';

  constructor() { }

  encryptData(data) {
    try {
      return AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
    }
  }

  decryptData(data) {
    try {
      const bytes = AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
