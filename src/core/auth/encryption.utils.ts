import * as crypto from 'crypto';

export interface EncryptionResult {
  encryptedData: string;
  iv: string;
  publicKey: string;
}

export class EncryptionUtils {
  /**
   * Generate a unique public key for each user
   * This key is used as part of the encryption process
   */
  static generatePublicKey(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Derive an encryption key from user's public key and a master secret
   * This ensures each user has a unique encryption key
   */
  static deriveEncryptionKey(publicKey: string, salt: string): Buffer {
    const masterSecret = process.env.JWT_SECRET || 'master-encryption-secret';
    return crypto.pbkdf2Sync(
      publicKey + masterSecret,
      salt,
      100000,
      32,
      'sha512',
    );
  }

  /**
   * Encrypt password using AES-256-GCM with user's unique public key
   * Returns encrypted data, IV, and public key for storage
   */
  static encryptPassword(password: string, publicKey: string): EncryptionResult {
    const salt = crypto.randomBytes(16);
    const encryptionKey = this.deriveEncryptionKey(publicKey, salt.toString('hex'));
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey, iv);
    
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encryptedData: encrypted + ':' + authTag.toString('hex'),
      iv: iv.toString('hex'),
      publicKey: publicKey,
    };
  }

  /**
   * Decrypt password using AES-256-GCM with user's unique public key
   */
  static decryptPassword(encryptedData: string, iv: string, publicKey: string): string {
    const salt = crypto.randomBytes(16);
    const encryptionKey = this.deriveEncryptionKey(publicKey, salt.toString('hex'));
    
    const [encrypted, authTag] = encryptedData.split(':');
    
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      encryptionKey,
      Buffer.from(iv, 'hex'),
    );
    
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  /**
   * Hash password using bcrypt-like approach with unique salt per user
   * This is the primary method for password storage
   */
  static hashPassword(password: string, publicKey: string): string {
    const salt = crypto.createHash('sha256').update(publicKey).digest('hex').slice(0, 22);
    const hash = crypto.pbkdf2Sync(
      password,
      salt,
      100000,
      64,
      'sha512',
    );
    return `pbkdf2-sha512$100000$${salt}$${hash.toString('hex')}`;
  }

  /**
   * Verify password against stored hash
   */
  static verifyPassword(password: string, storedHash: string, publicKey: string): boolean {
    const parts = storedHash.split('$');
    if (parts.length !== 4 || parts[0] !== 'pbkdf2-sha512') {
      return false;
    }
    
    const iterations = parseInt(parts[1]);
    const salt = parts[2];
    const hash = parts[3];
    
    const verifyHash = crypto.pbkdf2Sync(
      password,
      salt,
      iterations,
      64,
      'sha512',
    );
    
    return crypto.timingSafeEqual(
      Buffer.from(hash, 'hex'),
      verifyHash,
    );
  }
}