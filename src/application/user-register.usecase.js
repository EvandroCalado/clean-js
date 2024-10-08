const { Either } = require('../shared/errors');
const AppError = require('../shared/errors/AppError');

module.exports = function userRegisterUseCase({ userRepository }) {
  if (!userRepository) {
    throw new AppError(AppError.dependencyError);
  }

  return async function ({ name, cpf, phone, address, email }) {
    const checkFields = [name, cpf, phone, address, email];

    for (const field of checkFields) {
      if (field === undefined) {
        throw new AppError(AppError.missingParamsError);
      }
    }

    const cpfExists = await userRepository.findByCpf(cpf);

    if (cpfExists) return Either.left(Either.valueRegistered(cpf));

    await userRepository.register({ name, cpf, phone, address, email });

    return Either.right(null);
  };
};
