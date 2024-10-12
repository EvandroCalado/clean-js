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

  it('should return a book if finded a book with valid name', async () => {
    await typeormBookRepository.save(bookDTO);
    const findByIsbnOrName = await sut.findByNameOrIsbn('valid_name');

    expect(findByIsbnOrName).toHaveLength(1);
    expect(findByIsbnOrName[0].name).toBe('valid_name');
  });

  it('should return a book if finded a book with valid isbn', async () => {
    await typeormBookRepository.save(bookDTO);
    const findByIsbnOrName = await sut.findByNameOrIsbn('valid_isbn');

    expect(findByIsbnOrName).toHaveLength(1);
    expect(findByIsbnOrName[0].isbn).toBe('valid_isbn');
  });

  it('should return empty array of books if finded a book with invalid name or invalid isbn', async () => {
    const findByIsbnOrName = await sut.findByNameOrIsbn('invalid_value');

    expect(findByIsbnOrName).toEqual([]);
    expect(findByIsbnOrName).toHaveLength(0);
  });
});
