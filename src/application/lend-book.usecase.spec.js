const { Either, AppError } = require('../shared/errors');
const lendBookUsecase = require('./lend-book.usecase');

describe('lendBookUseCase', () => {
  const lendRepository = {
    lend: jest.fn(),
    userHasBookWithSameIsbn: jest.fn(),
    findLendBookById: jest.fn(),
  };

  const emailService = {
    sendLendBookEmail: jest.fn(),
  };

  it('should lend a book', async () => {
    lendRepository.lend.mockResolvedValue('valid_lendId');
    lendRepository.findLendBookById.mockResolvedValue({
      user: {
        name: 'valid_name',
        cpf: 'valid_cpf',
        email: 'valid_email',
      },
      book: {
        name: 'valid_bookName',
      },
    });

    const lendBookDTO = {
      useId: 'valid_useId',
      bookId: 'valid_BookId',
      outDate: new Date('2024-10-09'),
      returnDate: new Date('2024-10-09'),
    };

    const sut = lendBookUsecase({ lendRepository, emailService });
    const output = await sut(lendBookDTO);

    expect(output.right).toBeNull();
    expect(lendRepository.lend).toHaveBeenCalledWith(lendBookDTO);
    expect(lendRepository.lend).toHaveBeenCalledTimes(1);
    expect(emailService.sendLendBookEmail).toHaveBeenCalledWith({
      user: 'valid_name',
      cpf: 'valid_cpf',
      email: 'valid_email',
      book: 'valid_bookName',
      outDate: lendBookDTO.outDate,
      returnDate: lendBookDTO.returnDate,
    });
  });

  it('should a Either.left if returnDate to be before outDate', async () => {
    const lendBookDTO = {
      useId: 'valid_useId',
      bookId: 'valid_BookId',
      outDate: new Date('2024-10-09'),
      returnDate: new Date('2024-10-08'),
    };

    const sut = lendBookUsecase({ lendRepository, emailService });
    const output = await sut(lendBookDTO);

    expect(output.left).toEqual(Either.returnDateInvalid);
  });

  it('should a Either.left if user try lend a book with same ISBN as the one he already has', async () => {
    lendRepository.userHasBookWithSameIsbn.mockResolvedValue(true);

    const lendBookDTO = {
      useId: 'valid_useId',
      bookId: 'valid_BookId',
      outDate: new Date('2024-10-09'),
      returnDate: new Date('2024-10-09'),
    };

    const sut = lendBookUsecase({ lendRepository, emailService });
    const output = await sut(lendBookDTO);

    expect(output.left).toEqual(Either.userHasBookWithSameIsbn);
    expect(lendRepository.userHasBookWithSameIsbn).toHaveBeenCalledWith({
      useId: lendBookDTO.useId,
      bookId: lendBookDTO.bookId,
    });
    expect(lendRepository.userHasBookWithSameIsbn).toHaveBeenCalledTimes(1);
  });

  it('should return a AppError if lendRepository not provided', async () => {
    expect(() => lendBookUsecase({})).toThrow(new AppError(AppError.dependencyError));
  });

  it('should return a AppError if all params not provided', async () => {
    const sut = lendBookUsecase({ lendRepository, emailService });

    expect(() => sut({})).rejects.toThrow(new AppError(AppError.missingParamsError));
  });
});
