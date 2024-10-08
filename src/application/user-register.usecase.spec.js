const { Either, AppError } = require('../shared/errors');
const userRegisterUseCase = require('./user-register.usecase');

describe('userRegisterUseCase', () => {
  const userRepository = {
    register: jest.fn(),
    findByCpf: jest.fn(),
    findByEmail: jest.fn(),
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

    expect(output.right).toBeNull();
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

  it('should return a Either.left if exists cpf registered', async () => {
    userRepository.findByCpf.mockResolvedValue(true);

    const userDTO = {
      name: 'valid_name',
      cpf: 'registered_cpf',
      phone: 'valid_phone',
      address: 'valid_address',
      email: 'valid_email',
    };

    const sut = userRegisterUseCase({ userRepository });
    const output = await sut(userDTO);

    expect(output.right).toBeNull();
    expect(output.left).toEqual(Either.valueRegistered('CPF'));
    expect(userRepository.findByCpf).toHaveBeenCalledWith(userDTO.cpf);
    expect(userRepository.findByCpf).toHaveBeenCalledTimes(1);
  });

  it('should return a Either.left if exists email registered', async () => {
    userRepository.findByCpf.mockResolvedValue(false);
    userRepository.findByEmail.mockResolvedValue(true);

    const userDTO = {
      name: 'valid_name',
      cpf: 'valid_cpf',
      phone: 'valid_phone',
      address: 'valid_address',
      email: 'registered_email',
    };

    const sut = userRegisterUseCase({ userRepository });
    const output = await sut(userDTO);

    expect(output.right).toBeNull();
    expect(output.left).toEqual(Either.valueRegistered('Email'));
    expect(userRepository.findByEmail).toHaveBeenCalledWith(userDTO.email);
    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
  });
});
