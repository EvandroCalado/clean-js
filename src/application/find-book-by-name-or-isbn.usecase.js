const { Either, AppError } = require('../shared/errors');

module.exports = function findBookByNameOrIsbnUseCase({ bookRepository }) {
  if (!bookRepository) throw new AppError(AppError.dependencyError);

  return async function ({ value }) {
    if (!value) throw new AppError(AppError.missingParamsError);

    const books = await bookRepository.findByNameOrIsbn(value);

    return Either.right(books);
  };
};
