const AppError = require('./AppError');

describe('AppError', () => {
  it('should AppError is instance of Error', () => {
    const appError = new AppError('message');

    expect(appError).toBeInstanceOf(Error);
  });

  it('should AppError message is correct', () => {
    const message = 'test message';
    const appError = new AppError(message);

    expect(appError.message).toBe(message);
  });
});
