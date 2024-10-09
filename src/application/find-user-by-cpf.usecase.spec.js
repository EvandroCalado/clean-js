const findUserByCpfUseCase = require('./find-user-by-cpf.usecase');

describe('findUserByCpfUseCase', () => {
  const userRepository = {
    findByCpf: jest.fn(),
  };

  it('should return a user if cpf is registered', async () => {
    const cpfDTO = {
      cpf: 'valid_cpf',
    };

    const outputDTO = {
      id: 'any_id',
      name: 'any_name',
      cpf: 'registered_cpf',
      phone: 'any_phone',
      address: 'any_address',
      email: 'any_email',
    };
    userRepository.findByCpf.mockResolvedValue(outputDTO);

    const sut = findUserByCpfUseCase({ userRepository });
    const output = await sut(cpfDTO);

    expect(output.right).toEqual(outputDTO);
    expect(userRepository.findByCpf).toHaveBeenCalledWith(cpfDTO.cpf);
    expect(userRepository.findByCpf).toHaveBeenCalledTimes(1);
  });
});
