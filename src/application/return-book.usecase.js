const { Either } = require('../shared/errors');

module.exports = function returnBookUseCase({ lendRepository }) {
  return async function ({ lendId, returnDate }) {
    await lendRepository.return({ lendId, returnDate });

    const verifyLateFee = 'Late fee: $0.00';

    return Either.right(verifyLateFee);
  };
};
