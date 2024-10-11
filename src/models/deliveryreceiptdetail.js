'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeliveryReceiptDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        // Mỗi DeliveryReceiptDetail thuộc về một Product
    this.belongsTo(models.Product, { foreignKey: 'ProductID' });
    // Mỗi DeliveryReceiptDetail thuộc về một DeliveryReceipt
    this.belongsTo(models.DeliveryReceipt, { foreignKey: 'ReceiptID' });

    }
  }
  DeliveryReceiptDetail.init({
    ProductID: DataTypes.INTEGER,
    ReceiptID: DataTypes.INTEGER,
    Quantity: DataTypes.INTEGER,
    UnitPrice: DataTypes.STRING,
    TotalPrice: DataTypes.DECIMAL,
    Unit: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DeliveryReceiptDetail',
  });
  return DeliveryReceiptDetail;
};
