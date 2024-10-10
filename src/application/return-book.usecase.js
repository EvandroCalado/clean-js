const { Either } = require('../shared/errors');

module.exports = function returnBookUseCase({ lendRepository }) {
  return async function ({ lendId, returnedDate }) {
    const { returnDate } = await lendRepository.return({ lendId, returnedDate });

    const verifyReturnDate = new Date(returnDate).getTime() < new Date(returnedDate).getTime();
    const verifyLateFee = verifyReturnDate ? 'Late fee: $10.00' : 'Late fee: $0.00';

    return Either.right(verifyLateFee);
  };
};
