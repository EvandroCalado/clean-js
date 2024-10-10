const lendEntity = require('../enterprise/entities/lend.entity');
const { Either, AppError } = require('../shared/errors');

module.exports = function returnBookUseCase({ lendRepository }) {
  if (!lendRepository) throw new AppError(AppError.dependencyError);

  return async function ({ lendId, returnedDate }) {
    if (!lendId || !returnedDate) {
      throw new AppError(AppError.missingParamsError);
    }

    const { returnDate } = await lendRepository.return({ lendId, returnedDate });

    const verifyLateFee = lendEntity.calculateLateFee({ returnDate, returnedDate });

    return Either.right(verifyLateFee);
  };
};
