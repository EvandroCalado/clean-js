const { typeormServer } = require('../setup');

const typeormUserRepository = typeormServer.getRepository('User');

const userRepository = () => {
  const register = async ({ name, cpf, phone, address, email }) => {
    await typeormUserRepository.save({ name, cpf, phone, address, email });
  };

  const findByCpf = async (cpf) => {
    const user = await typeormUserRepository.findOne({ where: { cpf } });

    return user;
  };

  const existsByCpf = async (cpf) => {
    const user = await typeormUserRepository.findOne({ where: { cpf } });

    return !!user;
  };

  return {
    register,
    findByCpf,
    existsByCpf,
  };
};

module.exports = { userRepository, typeormUserRepository };
