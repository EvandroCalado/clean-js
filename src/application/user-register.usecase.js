const AppError = require('../shared/errors/AppError');

module.exports = function userRegisterUseCase({ userRepository }) {
  if (!userRepository) {
    throw new AppError(AppError.dependencyError);
  }

  return async function ({ name, cpf, phone, address, email }) {
    await userRepository.register({ name, cpf, phone, address, email });
  };
};
