import {
  AccountModel,
  LoadAccountByTokenRepository,
  LoadAccountByToken,
  Decrypter,
} from './db-load-account-by-token-protocols';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly descrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
  ) {}

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.descrypter.decrypt(accessToken);
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(
        accessToken,
        role,
      );
      return account;
    }
    return null;
  }
}
