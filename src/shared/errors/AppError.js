module.exports = class AppError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }

  static dependencyError = 'Dependency is required';
  static missingParamsError = 'Params is required';
};
