const { Either } = require('../shared/errors');

module.exports = function findBookByNameOrIsbnUseCase({ bookRepository }) {
  return async function ({ value }) {
    const books = await bookRepository.findByNameOrIsbn(value);

    return Either.right(books);
  };
};
