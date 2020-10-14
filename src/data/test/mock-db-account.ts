import { AccountModel } from '../../domain/models/account';
import { AddAccountRepository } from '../protocols/db/account/add-account-repository';
import { mockFakeAccountModel } from '../../domain/test';
import { AddAccountParams } from '../../domain/usecases/account/addAccount';
import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository';
import { UpdateAccessTokenRepository } from '../protocols/db/account/update-access-token-repository';
import { LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository';

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountParams): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockFakeAccountModel()));
    }
  }
  return new AddAccountRepositoryStub();
};

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockFakeAccountModel()));
    }
  }
  return new LoadAccountByEmailRepositoryStub();
};

export const mockUpdateAccessToken = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenStub implements UpdateAccessTokenRepository {
    async updateAccessToken(id: string, token: string): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new UpdateAccessTokenStub();
};

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub
    implements LoadAccountByTokenRepository {
    async loadByToken(token: string, role: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockFakeAccountModel()));
    }
  }
  return new LoadAccountByTokenRepositoryStub();
};
