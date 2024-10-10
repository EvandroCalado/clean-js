const { AppError } = require('../../shared/errors');

const lendEntity = () => {
  const calculateDaysLateFee = ({ returnDate, returnedDate }) => {
    return new Date(returnDate).getTime() < new Date(returnedDate).getTime();
  };

  const calculateLateFee = ({ returnDate, returnedDate }) => {
    if (!returnDate || !returnedDate) {
      throw new AppError(AppError.missingParamsError);
    }

    const daysLateFee = calculateDaysLateFee({ returnDate, returnedDate });
    return `Late fee: $${daysLateFee ? '10.00' : '0.00'}`;
  };

  return {
    calculateLateFee,
  };
};

module.exports = lendEntity();
