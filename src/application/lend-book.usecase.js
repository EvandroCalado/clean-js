const { AppError, Either } = require('../shared/errors');

module.exports = function lendBookUseCase({ lendRepository }) {
  if (!lendRepository) throw new AppError(AppError.dependencyError);

  return async function ({ useId, bookId, out_date, return_date }) {
    const fields = [useId, bookId, out_date, return_date];

    for (const field of fields) {
      if (!field) throw new AppError(AppError.missingParamsError);
    }

    if (out_date.getTime() > return_date.getTime()) {
      Either.left(Either.returnDateInvalid());
    }

    const userHasBookWithSameIsbn = await lendRepository.userHasBookWithSameIsbn({ useId, bookId });

    if (userHasBookWithSameIsbn) {
      Either.left(Either.userHasBookWithSameIsbn());
    }

    await lendRepository.lend({ useId, bookId, out_date, return_date });

    return Either.right(null);
  };
};
