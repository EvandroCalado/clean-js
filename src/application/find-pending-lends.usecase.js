const { AppError, Either } = require('../shared/errors');

module.exports = function findPendingLendsUseCase({ lendRepository }) {
  if (!lendRepository) throw new AppError(AppError.dependencyError);

  return async function () {
    const lends = await lendRepository.findPendingLends();
    return Either.right(lends);
  };
};
