// Simple password hashing using Node.js crypto (no external dependencies)
import crypto from 'crypto';

const ITERATIONS = 10000;
const KEY_LENGTH = 64;
const DIGEST = 'sha512';

/**
 * Hash a password using PBKDF2
 */
export async function hashPassword(password: string): Promise<string> {
          return new Promise((resolve, reject) => {
                    const salt = crypto.randomBytes(16).toString('hex');
                    crypto.pbkdf2(password, salt, ITERATIONS, KEY_LENGTH, DIGEST, (err, derivedKey) => {
                              if (err) reject(err);
                              resolve(`${salt}:${derivedKey.toString('hex')}`);
                    });
          });
}

/**
 * Compare a password with a stored hash
 */
export async function comparePassword(password: string, storedHash: string): Promise<boolean> {
          return new Promise((resolve, reject) => {
                    const [salt, key] = storedHash.split(':');
                    if (!salt || !key) {
                              resolve(false);
                              return;
                    }
                    crypto.pbkdf2(password, salt, ITERATIONS, KEY_LENGTH, DIGEST, (err, derivedKey) => {
                              if (err) reject(err);
                              resolve(derivedKey.toString('hex') === key);
                    });
          });
}
