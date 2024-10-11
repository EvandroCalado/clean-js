const { userRepository } = require('./user.repository');

describe('userRepository', () => {
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
});
