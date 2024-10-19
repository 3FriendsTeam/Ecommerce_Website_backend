'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Một Customer có nhiều ShippingAddress
    this.hasMany(models.ShippingAddress, { foreignKey: 'CustomerID' });
    // Một Customer có nhiều ReturnProduct
    this.hasMany(models.ReturnProduct, { foreignKey: 'CustomerID' });
    // Một Customer có nhiều Review
    this.hasMany(models.Review, { foreignKey: 'CustomerID' });
    // Một Customer có nhiều OrderCustomer
    this.hasMany(models.OrderCustomer, { foreignKey: 'CustomerID' });

    }
  }
  Customer.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,  // Xác định đây là khóa chính
    },
    CustomerName: DataTypes.STRING,
    Gender: DataTypes.STRING,
    JoinDate: DataTypes.DATE,
    Email: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    BirthDate: DataTypes.DATE,
    Password: DataTypes.STRING,
    IsVerified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};