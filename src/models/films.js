module.exports = (sequelize, type) => {
  return sequelize.define('film', {
    id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: type.STRING,
    description: type.STRING,
    score: type.STRING,
    director: type.STRING
  })
};
