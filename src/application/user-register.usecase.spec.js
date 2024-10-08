const AppError = require('../shared/errors/AppError');
const userRegisterUseCase = require('./user-register.usecase');

describe('userRegisterUseCase', () => {
  const userRepository = {
    register: jest.fn(),
    findByCpf: jest.fn(),
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

  it('should return a throw error if user repositiry not provider', () => {
    expect(() => userRegisterUseCase({})).toThrow(new AppError(AppError.dependencyError));
  });

  it('should return a throw error if missing params', async () => {
    const sut = userRegisterUseCase({ userRepository });

    await expect(() => sut({})).rejects.toThrow(new AppError(AppError.missingParamsError));
  });

  it('should return a throw error if exists cpf registered', () => {
    userRepository.findByCpf.mockResolvedValue(true);

    const userDTO = {
      name: 'valid_name',
      cpf: 'registered_cpf',
      phone: 'valid_phone',
      address: 'valid_address',
      email: 'valid_email',
    };

    const sut = userRegisterUseCase({ userRepository });

    expect(() => sut(userDTO)).rejects.toThrow(new AppError('CPF already exists'));
  });
});
