import { AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { AddAccountModel } from '../../../../domain/usecases/addAccount';
import { AccountModel } from '../../../../domain/models/account';
import { MongoHelpepr } from '../helpers/mongo-helepr';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelpepr.getCollection('accounts');
    const result = await accountCollection.insert(accountData);
    const account = result.ops[0];
    const { _id, ...accountWithoutId } = account;
    return Object.assign({}, accountWithoutId, { id: _id });
  }
}
