const { Either, AppError } = require('../shared/errors');

module.exports = function findUserByCpfUseCase({ userRepository }) {
  if (!userRepository) {
    throw new AppError(AppError.dependencyError);
  }

  return async function ({ cpf }) {
    const user = await userRepository.findByCpf(cpf);

    return Either.right(user);
  };
};
