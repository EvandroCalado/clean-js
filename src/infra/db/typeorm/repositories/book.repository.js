const { typeormServer } = require('../setup');

const typeormBookRepository = typeormServer.getRepository('Book');

const bookRepository = () => {
  const register = async ({ name, quantity, author, genre, isbn }) => {
    await typeormBookRepository.save({ name, quantity, author, genre, isbn });
  };

  return {
    register,
  };
};

module.exports = { bookRepository, typeormBookRepository };
