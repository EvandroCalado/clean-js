module.exports = function userRegisterUseCase({ userRepository }) {
  return async function ({ name, cpf, phone, address, email }) {
    await userRepository.register({ name, cpf, phone, address, email });
  };
};
