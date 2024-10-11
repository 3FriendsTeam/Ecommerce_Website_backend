'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Một Supplier có nhiều DeliveryReceipt
    this.hasMany(models.DeliveryReceipt, { foreignKey: 'SupplierID' });
  }
  }
  Supplier.init({
    SupplierName: DataTypes.STRING,
    Address: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    Email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Supplier',
  });
  return Supplier;
};