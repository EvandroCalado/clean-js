const { Like } = require('typeorm');
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

  const findByNameOrIsbn = async (value) => {
    const book = await typeormBookRepository.find({ where: [{ name: Like(`%${value}`) }, { isbn: value }] });

    return book;
  };

  return {
    register,
    existsByIsbn,
    findByNameOrIsbn,
  };
};

module.exports = { bookRepository, typeormBookRepository };
