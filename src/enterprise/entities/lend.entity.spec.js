const lendEntity = require('./lend.entity');

describe('lendEntity', () => {
  it('should not generate late fee', () => {
    const result = lendEntity.calculateLateFee({
      returnDate: '2024-10-11',
      returnedDate: '2024-10-10',
    });

    expect(result).toBe('Late fee: $0.00');
  });
});
