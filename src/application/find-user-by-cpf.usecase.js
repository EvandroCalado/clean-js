const { Either } = require('../shared/errors');

module.exports = function findUserByCpfUseCase({ userRepository }) {
  return async function ({ cpf }) {
    const user = await userRepository.findByCpf(cpf);

    return Either.right(user);
  };
};
