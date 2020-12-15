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

 const dbModel = require("./models")
 const filmModel = require("./films")

 const Model = dbModel(sequelize,Sequelize)
 const Film = filmModel(sequelize,Sequelize)

sequelize.authenticate()
  .then(() => {
    console.log('Sequelize is Connected')
  })
  .catch(err => {
    console.log('Sequelize is Not Connected')
  })

  sequelize.sync({ force: false }).then(() => {
    console.log("synchronized tables")
// console.log("Drop and re-sync db.");
});


module.exports = {
  Model,
  Film
}