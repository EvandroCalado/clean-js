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
});
