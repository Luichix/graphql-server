const dbConfig = require("../../database/db.config.js");

const Sequelize = require("sequelize");

const FilmModel = require('./films')
const UserModel = require('./users')

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

const Film = FilmModel(sequelize,Sequelize)
const User = UserModel(sequelize,Sequelize)

sequelize.authenticate()
  .then(() => {
    console.log('Sequelize is connected')
  })
  .catch(err => {
    console.log('Sequelize is Not Connected')
  })

sequelize.sync({ force: false }).then(() => {
    console.log("Synchronized tables")
});

module.exports = {
  Film,
  User
};