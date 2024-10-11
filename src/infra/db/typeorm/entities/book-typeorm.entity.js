const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Book',
  tableName: 'Books',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    quantity: {
      type: 'int',
    },
    author: {
      type: 'varchar',
    },
    genre: {
      type: 'varchar',
    },
    isbn: {
      type: 'varchar',
      unique: true,
    },
  },
});
