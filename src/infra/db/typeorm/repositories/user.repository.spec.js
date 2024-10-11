const { typeormServer } = require('../setup');
const { userRepository, typeormUserRepository } = require('./user.repository');

describe('userRepository', () => {
  let sut;

  beforeEach(async () => {
    await typeormUserRepository.delete({});
  });

  beforeAll(async () => {
    sut = userRepository();
  });

  const userDTO = {
    name: 'valid_name',
    cpf: 'valid_cpf',
    phone: 'valid_phone',
    address: 'valid_address',
    email: 'valid_email',
  };

  it('should return void when registered a user', async () => {
    const userRegistered = await sut.register(userDTO);

    expect(userRegistered).toBeUndefined();
  });

  it('should return a user when find by cpf with valid cpf', async () => {
    await typeormUserRepository.save(userDTO);

    const findByCpfRegistered = await sut.findByCpf('valid_cpf');

    expect(findByCpfRegistered.id).toBeDefined();
    expect(findByCpfRegistered.cpf).toBe('valid_cpf');
  });

  it('should return null if cpf is not registered', async () => {
    const findByCpfRegistered = await sut.findByCpf('not_registered_cpf');

    expect(findByCpfRegistered).toBeNull();
  });

  it('should return true if exists a user with valid cpf', async () => {
    await typeormUserRepository.save(userDTO);

    const existsByCpf = await sut.existsByCpf('valid_cpf');

    expect(existsByCpf).toBe(true);
  });

  it('should return false if exists a user with valid cpf', async () => {
    await typeormUserRepository.save(userDTO);

    const existsByCpf = await sut.existsByCpf('invalid_cpf');

    expect(existsByCpf).toBe(false);
  });

  it('should return true if exists a user with valid email', async () => {
    await typeormUserRepository.save(userDTO);

    const existsByEmail = await sut.existsByEmail('valid_email');

    expect(existsByEmail).toBe(true);
  });
});
