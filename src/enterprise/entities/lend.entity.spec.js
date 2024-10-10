const { AppError } = require('../../shared/errors');
const lendEntity = require('./lend.entity');

describe('lendEntity', () => {
  it('should not generate late fee', () => {
    const result = lendEntity.calculateLateFee({
      returnDate: '2024-10-11',
      returnedDate: '2024-10-11',
    });

    expect(result).toBe('Late fee: $0.00');
  });

  it('should generate late fee', () => {
    const result = lendEntity.calculateLateFee({
      returnDate: '2024-10-11',
      returnedDate: '2024-10-12',
    });

    expect(result).toBe('Late fee: $10.00');
  });

  it('should throw AppError if all required fields not provided', () => {
    expect(() => lendEntity.calculateLateFee({})).toThrow(new AppError(AppError.missingParamsError));
  });
});
