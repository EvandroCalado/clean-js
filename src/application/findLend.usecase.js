const { AppError, Either } = require('../shared/errors');

module.exports = function findLendUseCase({ lendRepository }) {
  if (!lendRepository) throw new AppError(AppError.dependencyError);

  return async function () {
    const lends = await lendRepository.findPendingBooks();
    return Either.right(lends);
  };
};
