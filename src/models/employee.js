'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Một Employee có nhiều Employee_Position
    this.hasMany(models.Employee_Position, { foreignKey: 'EmployeeID' });
    // Một Employee có nhiều DeliveryReceipt
    this.hasMany(models.DeliveryReceipt, { foreignKey: 'EmployeeID' });
    // Một Employee có nhiều ReturnProduct
    this.hasMany(models.ReturnProduct, { foreignKey: 'EmployeeID' });
    // Một Employee có nhiều OrderCustomer
    this.hasMany(models.OrderCustomer, { foreignKey: 'EmployeeID' });

    }
  }
  Employee.init({
    ProfileImage: DataTypes.STRING,
    Username: DataTypes.STRING,
    Password: DataTypes.STRING,
    Role: DataTypes.STRING,
    FullName: DataTypes.STRING,
    DateOfBirth: DataTypes.DATE,
    Gender: DataTypes.STRING,
    Address: DataTypes.STRING,
    IDNumber: DataTypes.STRING,
    Email: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
    LastUpdated: DataTypes.DATE,
    DeletedDate: DataTypes.DATE,
    CreatedBy: DataTypes.STRING,
    DeletedBy: DataTypes.STRING,
    UpdatedBy: DataTypes.STRING,
    IsDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};