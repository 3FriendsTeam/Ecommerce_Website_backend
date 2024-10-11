'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReturnDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     // Mỗi ReturnDetail thuộc về một ReturnProduct
    this.belongsTo(models.ReturnProduct, { foreignKey: 'ReturnProductID' });
    // Mỗi ReturnDetail thuộc về một Product
    this.belongsTo(models.Product, { foreignKey: 'ProductID' });
    // Mỗi ReturnDetail thuộc về một ReturnRequest
    this.belongsTo(models.ReturnRequest, { foreignKey: 'RequestID' });

    }
  }
  ReturnDetail.init({
    ReturnProductID: DataTypes.INTEGER,
    ProductID: DataTypes.INTEGER,
    Quantity: DataTypes.INTEGER,
    ReturnImage: DataTypes.STRING,
    Reason: DataTypes.STRING,
    Status: DataTypes.STRING,
    RequestID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReturnDetail',
  });
  return ReturnDetail;
};