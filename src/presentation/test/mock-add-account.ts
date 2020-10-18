import { AccountModel } from '../../domain/models/account';
import { mockFakeAccountModel } from '../../domain/test';
import {
  AddAccount,
  AddAccountParams,
} from '../../domain/usecases/account/addAccount';

export const mockAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockFakeAccountModel());
    }
  }

  return new AddAccountStub();
};
