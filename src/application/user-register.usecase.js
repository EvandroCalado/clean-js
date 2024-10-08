module.exports = function userRegisterUseCase({ userRepository }) {
  if (!userRepository) {
    throw new Error('UserRepository is required');
  }

  return async function ({ name, cpf, phone, address, email }) {
    await userRepository.register({ name, cpf, phone, address, email });
  };
};
