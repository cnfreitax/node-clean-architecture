import { AccountModel } from '../../domain/models/account';
import { mockFakeAccountModel } from '../../domain/test';
import { LoadAccountByToken } from '../middlewares/auth-middlewares-protocols';

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(accessToken: string, role?: string): Promise<AccountModel> {
      const account = mockFakeAccountModel();
      return Promise.resolve(account);
    }
  }
  return new LoadAccountByTokenStub();
};
