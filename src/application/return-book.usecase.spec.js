const returnBookUseCase = require('./return-book.usecase');

describe('returnBookUseCase', () => {
  const lendRepository = {
    return: jest.fn(),
  };

  it('should return book without late fee', async () => {
    const returnBookDTO = {
      lendId: 'valid_lendId',
      returnDate: new Date('2024-10-10'),
    };

    const sut = returnBookUseCase({ lendRepository });
    const output = await sut(returnBookDTO);

    expect(output.right).toBe('Late fee: $0.00');
    expect(lendRepository.return).toHaveBeenCalledWith(returnBookDTO);
    expect(lendRepository.return).toHaveBeenCalledTimes(1);
  });
});
