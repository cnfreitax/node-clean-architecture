import { LoadAccountByEmailRepository } from '../db-authentication/db-authentication-protocols';
import {
  Hasher,
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadByEmailRepository: LoadAccountByEmailRepository,
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadByEmailRepository.loadByEmail(
      accountData.email,
    );

    if (!account) {
      const passwordHashed = await this.hasher.hash(accountData.password);

      const newAccount = await this.addAccountRepository.add(
        Object.assign({}, accountData, {
          password: passwordHashed,
        }),
      );
      return newAccount;
    }
    return null;
  }
}
