const bookRegisterUseCase = require('./book-register.usecase');

describe('bookRegisterUseCase', () => {
  const bookRepository = {
    register: jest.fn(),
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
});
