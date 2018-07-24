import crypto from 'crypto';

class Utils {
  static generateId() {
    return crypto.randomBytes(8).toString('hex');
  }
}
module.exports = Utils;
