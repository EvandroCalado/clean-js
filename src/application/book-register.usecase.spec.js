const { AppError, Either } = require('../shared/errors');
const bookRegisterUseCase = require('./book-register.usecase');

describe('bookRegisterUseCase', () => {
  const bookRepository = {
    register: jest.fn(),
    existsByIsbn: jest.fn(),
  };

  it('should register a book', async () => {
    const bookDTO = {
      name: 'valid_name',
      quantity: 'valid_quantity',
      author: 'valid_author',
      genre: 'valid_genre',
      isbn: 'valid_isbn',
    };

    const sut = bookRegisterUseCase({ bookRepository });
    const output = await sut(bookDTO);

    expect(output.right).toBeNull();
    expect(bookRepository.register).toHaveBeenCalledWith(bookDTO);
    expect(bookRepository.register).toHaveBeenCalledTimes(1);
  });

  it('should return a throw AppError if book repositiry not provider', () => {
    expect(() => bookRegisterUseCase({})).toThrow(new AppError(AppError.dependencyError));
  });

  it('should return a throw AppError if book missing params', async () => {
    const sut = bookRegisterUseCase({ bookRepository });

    await expect(() => sut({})).rejects.toThrow(new AppError(AppError.missingParamsError));
  });

  it('should return a Either.left if exists isbn registered', async () => {
    bookRepository.existsByIsbn.mockResolvedValue(true);

    const bookDTO = {
      name: 'valid_name',
      quantity: 'valid_quantity',
      author: 'valid_author',
      genre: 'valid_genre',
      isbn: 'registered_isbn',
    };

    const sut = bookRegisterUseCase({ bookRepository });
    const output = await sut(bookDTO);

    expect(output.left).toEqual(Either.valueRegistered('isbn'));
    expect(bookRepository.existsByIsbn).toHaveBeenCalledWith(bookDTO.isbn);
    expect(bookRepository.existsByIsbn).toHaveBeenCalledTimes(1);
  });
});
