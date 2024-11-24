'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeliveryReceipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Mỗi DeliveryReceipt thuộc về một Supplier
    this.belongsTo(models.Supplier, { foreignKey: 'SupplierID' });
    // Mỗi DeliveryReceipt thuộc về một Employee
    this.belongsTo(models.Employee, { foreignKey: 'EmployeeID' });
    // Một DeliveryReceipt có nhiều DeliveryReceiptDetail
    this.hasMany(models.DeliveryReceiptDetail, { foreignKey: 'ReceiptID' });
    }
  }
  DeliveryReceipt.init({
    DeliveryDate: DataTypes.DATE,
    Notes: DataTypes.TEXT,
    SupplierID: DataTypes.INTEGER,
    EmployeeID: DataTypes.INTEGER,
    Status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DeliveryReceipt',
  });
  return DeliveryReceipt;
};