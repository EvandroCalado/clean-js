const { Either } = require('../shared/errors');

module.exports = function bookRegisterUseCase({ bookRepository }) {
  return async function ({ name, quantity, author, genre, isbn }) {
    await bookRepository.register({ name, quantity, author, genre, isbn });

    return Either.right(null);
  };
};
