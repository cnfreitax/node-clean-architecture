import { EmailValidator } from '../presentation/protocols/email-validotr';

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return false;
  }
}
