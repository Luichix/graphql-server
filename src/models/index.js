const dbConfig = require("../../database/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }  
});

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.database = require("./models")(sequelize,Sequelize)

sequelize.authenticate()
  .then(() => {
    console.log('Sequelize is connected')
  })
  .catch(err => {
    console.log('Sequelize is Not Connected')
  })

module.exports = db;