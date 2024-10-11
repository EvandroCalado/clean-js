const typeorm = require('typeorm');

const typeormServer = new typeorm.DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true,
  dropSchema: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
});

module.exports = { typeormServer };
