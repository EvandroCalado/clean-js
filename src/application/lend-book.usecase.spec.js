const { Either } = require('../shared/errors');
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
      outDate: new Date('2024-10-09'),
      returnDate: new Date('2024-10-09'),
    };

    const sut = lendBookUsecase({ lendRepository });
    const output = await sut(lendBookDTO);

    expect(output.right).toBeNull();
    expect(lendRepository.lend).toHaveBeenCalledWith(lendBookDTO);
    expect(lendRepository.lend).toHaveBeenCalledTimes(1);
  });

  it('should a Either.left if returnDate to be before outDate', async () => {
    const lendBookDTO = {
      useId: 'valid_useId',
      bookId: 'valid_BookId',
      outDate: new Date('2024-10-09'),
      returnDate: new Date('2024-10-08'),
    };

    const sut = lendBookUsecase({ lendRepository });
    const output = await sut(lendBookDTO);

    expect(output.left).toEqual(Either.returnDateInvalid);
  });
});
