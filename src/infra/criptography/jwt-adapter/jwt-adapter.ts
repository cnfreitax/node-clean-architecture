import { Encrypter } from '../../../data/protocols/criptography/encrypter';
import jwt from 'jsonwebtoken';
import { Decrypter } from '../../../data/protocols/criptography/decrypter';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret);
    return accessToken;
  }

  async decrypt(value: string): Promise<string> {
    const token: any = await jwt.verify(value, this.secret);
    return token;
  }
}
