const AppError = require('../shared/errors/AppError');
const userRegisterUseCase = require('./user-register.usecase');

describe('userRegisterUseCase', () => {
  const userRepository = {
    register: jest.fn(),
  };

  it('should register a user', async () => {
    const userDTO = {
      name: 'valid_name',
      cpf: 'valid_cpf',
      phone: 'valid_phone',
      address: 'valid_address',
      email: 'valid_email',
    };

    const sut = userRegisterUseCase({ userRepository });
    const output = await sut(userDTO);

    expect(output).toBeUndefined();
    expect(userRepository.register).toHaveBeenCalledWith(userDTO);
    expect(userRepository.register).toHaveBeenCalledTimes(1);
  });

  it('should return a throw error if user repositiry not provider', async () => {
    expect(() => userRegisterUseCase({})).toThrow(new AppError(AppError.dependencyError));
  });
});
