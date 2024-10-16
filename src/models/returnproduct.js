'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReturnProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     // Mỗi ReturnProduct thuộc về một Customer
    this.belongsTo(models.Customer, { foreignKey: 'CustomerID' });
    // Mỗi ReturnProduct thuộc về một Employee
    this.belongsTo(models.Employee, { foreignKey: 'EmployeeID' });
    // Một ReturnProduct có nhiều ReturnDetail
    this.hasMany(models.ReturnDetail, { foreignKey: 'ReturnProductID' });

    }
  }
  ReturnProduct.init({
    CustomerID: DataTypes.STRING,
    EmployeeID: DataTypes.INTEGER,
    RequestDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ReturnProduct',
  });
  return ReturnProduct;
};