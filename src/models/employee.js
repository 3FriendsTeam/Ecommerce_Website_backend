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
      // Mỗi Employee có nhiều DeliveryReceipt
      this.hasMany(models.DeliveryReceipt, { foreignKey: 'EmployeeID' });
      // Mỗi Employee có nhiều ReturnProduct
      this.hasMany(models.ReturnProduct, { foreignKey: 'EmployeeID' });
      // Mỗi Employee có nhiều OrderCustomer
      this.hasMany(models.OrderCustomer, { foreignKey: 'EmployeeID' });
      // Mỗi Employee thuộc về một Position
      this.belongsTo(models.Position, { foreignKey: 'PositionID' });
    }
  }
  Employee.init({
    Username: DataTypes.STRING,
    Password: DataTypes.STRING,
    PositionID: DataTypes.INTEGER,
    FullName: DataTypes.STRING,
    DateOfBirth: DataTypes.DATE,
    Gender: DataTypes.STRING,
    Address: DataTypes.STRING,
    Email: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    IsActive : DataTypes.BOOLEAN,
    DeletedAt: DataTypes.DATE,
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

