const { bookRepository, typeormBookRepository } = require('./book.repository');

describe('bookRepository', () => {
  let sut;

  beforeEach(async () => {
    await typeormBookRepository.delete({});
  });

  beforeAll(async () => {
    sut = bookRepository();
  });

  const bookDTO = {
    name: 'valid_name',
    quantity: 1,
    author: 'valid_author',
    genre: 'valid_genre',
    isbn: 'valid_isbn',
  };

  it('should return void when registered a book', async () => {
    const bookRegistered = await sut.register(bookDTO);

    expect(bookRegistered).toBeUndefined();
  });

  it('should return true if exists a book with valid isbn', async () => {
    await typeormBookRepository.save(bookDTO);
    const existsByIsbn = await sut.existsByIsbn('valid_isbn');

    expect(existsByIsbn).toBe(true);
  });

  it('should return false if not exists a book with valid isbn', async () => {
    await typeormBookRepository.save(bookDTO);
    const existsByIsbn = await sut.existsByIsbn('invalid_isbn');

    expect(existsByIsbn).toBe(false);
  });
});
