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
});
