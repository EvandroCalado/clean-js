const { Either, AppError } = require('../shared/errors');

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

    const cpfExists = await userRepository.existsByCpf(cpf);

    if (cpfExists) return Either.left(Either.valueRegistered('CPF'));

    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) return Either.left(Either.valueRegistered('Email'));

    await userRepository.register({ name, cpf, phone, address, email });

    return Either.right(null);
  };
};
