const Sequelize = require("sequelize");

const connectionUrl = process.env.DATABASE_URL;
const databaseOptions = {
  pool: { maxConnections: 10, minConnections: 1 },
  dialectOptions: { ssl: { rejectUnauthorized: false } }
}

module.exports = new Sequelize(connectionUrl, databaseOptions);