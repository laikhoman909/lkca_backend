import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

/**
 * EncryptionService handles RSA key generation and password encryption/decryption
 * 
 * Flow:
 * 1. Client requests public key from /auth/public-key
 * 2. Client encrypts password with public key
 * 3. Client sends encrypted password to login/register
 * 4. Server decrypts password with private key
 */
@Injectable()
export class EncryptionService {
  private publicKey: string;
  private privateKey: string;

  constructor(private readonly configService: ConfigService) {
    // Generate RSA key pair on application start
    this.generateKeyPair();
  }

  /**
   * Generate RSA key pair for password encryption
   * Keys are generated once and stored in memory
   */
  private generateKeyPair(): void {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    this.publicKey = publicKey;
    this.privateKey = privateKey;

    console.log('🔐 RSA key pair generated successfully');
  }

  /**
   * Get the public key for client-side encryption
   * Clients use this key to encrypt passwords before sending
   */
  getPublicKey(): string {
    return this.publicKey;
  }

  /**
   * Decrypt password encrypted with the public key
   * Used in login/register endpoints
   */
  decryptPassword(encryptedPassword: string): string {
    try {
      const decrypted = crypto.privateDecrypt(
        {
          key: this.privateKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: 'sha256',
        },
        Buffer.from(encryptedPassword, 'base64'),
      );

      return decrypted.toString('utf8');
    } catch (error) {
      throw new Error('Failed to decrypt password. Invalid encrypted data.');
    }
  }

  /**
   * Verify if a value is encrypted (base64 and proper length)
   */
  isEncrypted(value: string): boolean {
    // Check if it's a valid base64 string and has appropriate length for RSA encrypted data
    const base64Regex = /^[A-Za-z0-9+/]+=*$/;
    return base64Regex.test(value) && value.length > 100;
  }

  /**
   * Utility method to encrypt data with public key (for testing)
   */
  encryptForTesting(data: string): string {
    const encrypted = crypto.publicEncrypt(
      {
        key: this.publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      Buffer.from(data, 'utf8'),
    );

    return encrypted.toString('base64');
  }
}