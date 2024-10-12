const { typeormServer } = require('../setup');

const typeormBookRepository = typeormServer.getRepository('Book');

const bookRepository = () => {
  const register = async ({ name, quantity, author, genre, isbn }) => {
    await typeormBookRepository.save({ name, quantity, author, genre, isbn });
  };

  const existsByIsbn = async (isbn) => {
    const book = await typeormBookRepository.findOneBy({ isbn });

    return !!book;
  };

  return {
    register,
    existsByIsbn,
  };
};

module.exports = { bookRepository, typeormBookRepository };
