import { AccountModel } from '../../../../domain/models/account';
import { AddAccountParams } from '../../../../domain/usecases/account/addAccount';

export interface AddAccountRepository {
  add(accountData: AddAccountParams): Promise<AccountModel>;
}
