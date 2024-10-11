const { typeormServer } = require('../setup');

const typeormUserRepository = typeormServer.getRepository('User');

const userRepository = () => {
  const register = async ({ name, cpf, phone, address, email }) => {
    await typeormUserRepository.save({ name, cpf, phone, address, email });
  };

  return {
    register,
  };
};

module.exports = { userRepository, typeormUserRepository };
