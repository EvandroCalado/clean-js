const { AppError } = require('../shared/errors');
const findBookByNameOrIsbnUseCase = require('./find-book-by-name-or-isbn.usecase');

describe('findBookByNameOrIsbnUseCase', () => {
  const bookRepository = {
    findByNameOrIsbn: jest.fn(),
  };

  it('should return a book if name or isbn is registered', async () => {
    const nameIsbnDTO = {
      value: 'valid_name or valid_isbn',
    };

    const outputDTO = [
      {
        name: 'valid_name',
        quantity: 'valid_quantity',
        author: 'valid_author',
        genre: 'valid_genre',
        isbn: 'valid_isbn',
      },
    ];
    bookRepository.findByNameOrIsbn.mockResolvedValue(outputDTO);

    const sut = findBookByNameOrIsbnUseCase({ bookRepository });
    const output = await sut(nameIsbnDTO);

    expect(output.right).toEqual(outputDTO);
    expect(bookRepository.findByNameOrIsbn).toHaveBeenCalledWith(nameIsbnDTO.value);
    expect(bookRepository.findByNameOrIsbn).toHaveBeenCalledTimes(1);
  });

  it('should return aarray empty if name or isbn is not registered', async () => {
    bookRepository.findByNameOrIsbn.mockResolvedValue([]);

    const nameIsbnDTO = {
      value: 'invalid_name or invalid_isbn',
    };

    const sut = findBookByNameOrIsbnUseCase({ bookRepository });
    const output = await sut(nameIsbnDTO);

    expect(output.right).toEqual([]);
    expect(bookRepository.findByNameOrIsbn).toHaveBeenCalledWith(nameIsbnDTO.value);
    expect(bookRepository.findByNameOrIsbn).toHaveBeenCalledTimes(1);
  });

  it('should return a throw AppError if book repository not provider', () => {
    expect(() => findBookByNameOrIsbnUseCase({})).toThrow(new AppError(AppError.dependencyError));
  });
});
