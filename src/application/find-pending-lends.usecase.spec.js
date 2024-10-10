const { AppError } = require('../shared/errors');
const findPendingLendsUsecase = require('./find-pending-lends.usecase');
const findPendingLendsUseCase = require('./find-pending-lends.usecase');

describe('findLendUseCase', () => {
  const lendRepository = {
    findPendingLends: jest.fn(),
  };

  it('should return pending lends', async () => {
    const findLendDTO = {
      use: {
        name: 'valid_name',
        cpf: 'valid_cpf',
      },
      book: {
        name: 'valid_bookName',
      },
      outDate: new Date('2024-10-09'),
      returnDate: new Date('2024-10-09'),
    };
    lendRepository.findPendingLends.mockResolvedValue([findLendDTO]);

    const sut = findPendingLendsUseCase({ lendRepository });
    const output = await sut();

    expect(output.right[0]).toEqual(findLendDTO);
    expect(output.right).toHaveLength(1);
    expect(lendRepository.findPendingLends).toHaveBeenCalledTimes(1);
  });

  it('should return throw AppError if lendRepository not provided', async () => {
    expect(() => findPendingLendsUsecase({})).toThrow(new AppError(AppError.dependencyError));
  });
});
