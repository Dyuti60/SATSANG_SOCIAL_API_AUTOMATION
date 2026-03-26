import CryptoJS from "crypto-js";
export class DataGenerator{
    
    static generateRandomString(length: number = 20): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
}

    static generateCodeChallenge(str: string): string {
    const fullHash = CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
    return fullHash.substring(0, 32);
}

}