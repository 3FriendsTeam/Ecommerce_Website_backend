'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee_Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Mỗi Employee_Position thuộc về một Employee
    this.belongsTo(models.Employee, { foreignKey: 'EmployeeID' });
    // Mỗi Employee_Position thuộc về một Position
    this.belongsTo(models.Position, { foreignKey: 'PositionID' });

    }
  }
  Employee_Position.init({
    EmployeeID: DataTypes.INTEGER,
    PositionID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee_Position',
  });
  return Employee_Position;
};