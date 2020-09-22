export class EmailInUseError extends Error {
  constructor() {
    super('Email alredy id use');
    this.name = 'InvalidParamError';
  }
}
