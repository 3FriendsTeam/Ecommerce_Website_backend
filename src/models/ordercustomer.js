'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderCustomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Mỗi OrderCustomer thuộc về một ShippingAddress
    this.belongsTo(models.ShippingAddress, { foreignKey: 'AddressID' });
    // Mỗi OrderCustomer thuộc về một PaymentMethod
    this.belongsTo(models.PaymentMethod, { foreignKey: 'PaymentMethodID' });
    // Mỗi OrderCustomer thuộc về một Employee
    this.belongsTo(models.Employee, { foreignKey: 'EmployeeID' });
    // Mỗi OrderCustomer thuộc về một Promotion
    this.belongsTo(models.Promotion, { foreignKey: 'PromotionID' });
    // Mỗi OrderCustomer thuộc về một Customer
    this.belongsTo(models.Customer, { foreignKey: 'CustomerID' });
    // Một OrderCustomer có nhiều OrderProductDetail
    this.hasMany(models.OrderProductDetail, { foreignKey: 'OrderID' });

    }
  }
  OrderCustomer.init({
    OrderDate: DataTypes.DATE,
    OrderStatus: DataTypes.STRING,
    TotalAmount: DataTypes.DECIMAL,
    PaymentMethodID: DataTypes.INTEGER,
    EmployeeID: DataTypes.INTEGER,
    PromotionID: DataTypes.INTEGER,
    CustomerID: DataTypes.STRING,
    PaymentStatus: DataTypes.BOOLEAN,
    PaymentDate: DataTypes.DATE,
    AddressID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderCustomer',
  });
  return OrderCustomer;
};