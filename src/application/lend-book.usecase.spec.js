const lendBookUsecase = require('./lend-book.usecase');

describe('lendBookUseCase', () => {
  const lendRepository = {
    lend: jest.fn(),
    userHasBookWithSameIsbn: jest.fn(),
  };

  it('should lend a book', async () => {
    const lendBookDTO = {
      useId: 'valid_useId',
      bookId: 'valid_BookId',
      out_date: new Date('2024-10-09'),
      return_date: new Date('2024-10-09'),
    };

    const sut = lendBookUsecase({ lendRepository });
    const output = await sut(lendBookDTO);

    expect(output.right).toBeNull();
    expect(lendRepository.lend).toHaveBeenCalledWith(lendBookDTO);
    expect(lendRepository.lend).toHaveBeenCalledTimes(1);
  });
});
