'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShippingAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       // Mỗi ShippingAddress thuộc về một Customer
    this.belongsTo(models.Customer, { foreignKey: 'CustomerID' });
    // Một ShippingAddress có nhiều OrderCustomer
    this.hasMany(models.OrderCustomer, { foreignKey: 'AddressID' });

    }
  }
  ShippingAddress.init({
    RecipientName: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    Address: DataTypes.STRING,
    SpecificAddress: DataTypes.STRING,
    CustomerID: DataTypes.STRING,
    IsDeleted: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'ShippingAddress',
  });
  return ShippingAddress;
};