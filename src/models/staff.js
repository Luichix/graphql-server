module.exports = (sequelize,type) => {
    return sequelize.define("staffData", {
        
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        lastname: type.STRING,
        firstname: type.STRING,
        card: type.STRING,
        phone: type.STRING,
        typeContract: type.STRING,
        startContract: type.DATEONLY,
        finishContract: type.DATEONLY,
        area: type.STRING,
        job: type.STRING,
        monthlySalary: type.DECIMAL(10,2),
        regime: type.STRING,
        workday: type.STRING,
        timeControl: type.BOOLEAN,
        paymentMethod: type.STRING
      })
}  