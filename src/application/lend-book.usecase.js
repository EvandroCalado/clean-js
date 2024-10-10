const { AppError, Either } = require('../shared/errors');

module.exports = function lendBookUseCase({ lendRepository, emailService }) {
  if (!lendRepository || !emailService) throw new AppError(AppError.dependencyError);

  return async function ({ useId, bookId, outDate, returnDate }) {
    const fields = [useId, bookId, outDate, returnDate];

    for (const field of fields) {
      if (!field) throw new AppError(AppError.missingParamsError);
    }

    if (outDate.getTime() > returnDate.getTime()) {
      return Either.left(Either.returnDateInvalid);
    }

    const userHasBookWithSameIsbn = await lendRepository.userHasBookWithSameIsbn({ useId, bookId });

    if (userHasBookWithSameIsbn) {
      return Either.left(Either.userHasBookWithSameIsbn);
    }

    const lendId = await lendRepository.lend({ useId, bookId, outDate, returnDate });

    const { user, book } = await lendRepository.findLendBookById(lendId);

    await emailService.sendLendBookEmail({
      userName: user.name,
      cpf: user.cpf,
      email: user.email,
      bookName: book.name,
      outDate,
      returnDate,
    });

    return Either.right(null);
  };
};
