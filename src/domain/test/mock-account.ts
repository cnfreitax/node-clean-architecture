import { AccountModel } from '../models/account';
import { AddAccountParams } from '../usecases/account/addAccount';
import { AuthenticationParams } from '../usecases/account/authentication';

export const mockFakeAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any@email.com',
  password: 'hashed_password',
});

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any@mail.com',
  password: 'any_password',
});

export const mockFakeAuthentication = (): AuthenticationParams => ({
  email: 'any@mail.com',
  password: 'any_password',
});
