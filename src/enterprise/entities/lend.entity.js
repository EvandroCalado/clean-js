const lendEntity = () => {
  const calculateDaysLateFee = ({ returnDate, returnedDate }) => {
    return new Date(returnDate).getTime() < new Date(returnedDate).getTime();
  };

  const calculateLateFee = ({ returnDate, returnedDate }) => {
    const daysLateFee = calculateDaysLateFee({ returnDate, returnedDate });
    return `Late fee: $${daysLateFee ? '10.00' : '0.00'}`;
  };

  return {
    calculateLateFee,
  };
};

module.exports = lendEntity();
