'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProductDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       // Mỗi OrderProductDetail thuộc về một OrderCustomer
    this.belongsTo(models.OrderCustomer, { foreignKey: 'OrderID' });
    // Mỗi OrderProductDetail thuộc về một Product
    this.belongsTo(models.Product, { foreignKey: 'ProductID' });
    }
  }
  OrderProductDetail.init({
    OrderID: DataTypes.INTEGER,
    ProductID: DataTypes.INTEGER,
    UnitPrice: DataTypes.DECIMAL,
    Quantity: DataTypes.STRING,
    Notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrderProductDetail',
  });
  return OrderProductDetail;
};