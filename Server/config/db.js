const { Sequelize } = require("sequelize");
const wsaModel = require("../models/wsa.model");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.NAME,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.SQL_PORT,
    dialect: process.env.DIALECT,
    database: process.env.DB,
    pool: {
      max: 10,
      min: 0,
      idle: 30000,
    },
    dialectOptions: {
      options: {
        encrypt: false,
      },
    },
  }
);

const db = {};

const models = wsaModel(sequelize);
Object.keys(models).forEach(modelName => {
  db[modelName] = models[modelName];
});

db.sequelize = sequelize;

sequelize.sync({ alter: true });

module.exports = db;
