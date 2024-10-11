const { typeormServer } = require('../setup');
const { userRepository, typeormUserRepository } = require('./user.repository');

describe('userRepository', () => {
  beforeEach(async () => {
    await typeormUserRepository.delete({});
  });

  it('should return void when registered a user', async () => {
    const sut = userRepository();

    const userRegistered = await sut.register({
      name: 'valid_name',
      cpf: 'valid_cpf',
      phone: 'valid_phone',
      address: 'valid_address',
      email: 'valid_email',
    });

    expect(userRegistered).toBeUndefined();
  });

  it('should return a user when find by cpf with valid cpf', async () => {
    await typeormUserRepository.save({
      name: 'new_valid_name',
      cpf: 'new_valid_cpf',
      phone: 'new_valid_phone',
      address: 'new_valid_address',
      email: 'new_valid_email',
    });

    const sut = userRepository();

    const findByCpfRegistered = await sut.findByCpf('new_valid_cpf');

    expect(findByCpfRegistered.id).toBeDefined();
    expect(findByCpfRegistered.cpf).toBe('new_valid_cpf');
  });
});
