const path = require('path');

const databaseOptions = {
  logging: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? console.log : false,
  pool: { maxConnections: 10, minConnections: 1 },
  dialectOptions: {},
};

if (process.env.DATABASE_SSL && JSON.parse(process.env.DATABASE_SSL.toLowerCase())) {
  const rejectUnauthorized = process.env.DATABASE_REJECT_UNAUTHORIZED;
  if (rejectUnauthorized && (JSON.parse(rejectUnauthorized.toLowerCase()) === false)) {
    databaseOptions.dialectOptions.ssl = { rejectUnauthorized: false };
    console.log(databaseOptions.dialectOptions);
  } else {
    databaseOptions.dialectOptions.ssl = true;
  }
}

console.log(databaseOptions);

module.exports = [{
  name: 'acts',
  modelsDir: path.resolve(__dirname, '../models/acts'),
  connection: {
    url: process.env.DATABASE_URL,
    options: { ...databaseOptions },
  },
}, {
  name: 'drugs',
  modelsDir: path.resolve(__dirname, '../models/drugs'),
  connection: {
    url: process.env.ANOTHER_DB_URL,
    options: { ...databaseOptions }
  }
}];
