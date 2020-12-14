module.exports = (sequelize, Sequelize) => {
    const DataTable = sequelize.define("staffData", {
      lastname: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      card: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      typeContract: {
        type: Sequelize.STRING
      },
      startContract: {
        type: Sequelize.DATEONLY
      },
      finishContract: {
        type: Sequelize.DATEONLY
      },
      area: {
        type: Sequelize.STRING
      },
      job: {
        type: Sequelize.STRING
      },
      monthlySalary: {
        type: Sequelize.DECIMAL(10,2)
      },
      regime: {
        type: Sequelize.STRING
      },
      workday: {
        type: Sequelize.STRING
      },
      timeControl: {
        type: Sequelize.BOOLEAN
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return DataTable;
  };
