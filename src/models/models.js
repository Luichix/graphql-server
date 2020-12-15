module.exports = (sequelize, type) => {
    const DataTable = sequelize.define("staffData", {
      lastname: {
        type: type.STRING
      },
      firstname: {
        type: type.STRING
      },
      card: {
        type: type.STRING
      },
      phone: {
        type: type.STRING
      },
      typeContract: {
        type: type.STRING
      },
      startContract: {
        type: type.DATEONLY
      },
      finishContract: {
        type: type.DATEONLY
      },
      area: {
        type: type.STRING
      },
      job: {
        type: type.STRING
      },
      monthlySalary: {
        type: type.DECIMAL(10,2)
      },
      regime: {
        type: type.STRING
      },
      workday: {
        type: type.STRING
      },
      timeControl: {
        type: type.BOOLEAN
      },
      paymentMethod: {
        type: type.STRING
      },
      published: {
        type: type.BOOLEAN
      }
    });

    const filmTable = sequelize.define('film', {
      id:{
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      title: type.STRING,
      description: type.STRING,
      score: type.STRING,
      director: type.STRING
  });
  
  return filmTable, DataTable;

  };
