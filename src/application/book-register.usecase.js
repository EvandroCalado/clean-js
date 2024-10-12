const { Either, AppError } = require('../shared/errors');

module.exports = function bookRegisterUseCase({ bookRepository }) {
  if (!bookRepository) throw new AppError(AppError.dependencyError);

  return async function ({ name, quantity, author, genre, isbn }) {
    const checkFields = [name, quantity, author, genre, isbn];

    for (const field of checkFields) {
      if (field === undefined) {
        throw new AppError(AppError.missingParamsError);
      }
    }

    const isbnExists = await bookRepository.existsByIsbn(isbn);

    if (isbnExists) return Either.left(Either.valueRegistered('isbn'));

    await bookRepository.register({ name, quantity, author, genre, isbn });

    return Either.right(null);
  };
};
