export class ServerError extends Error {
  constructor() {
    super('Hi! An unexpected error has ocurred. Try again later.');
    this.name = 'ServerError';
  }
}
