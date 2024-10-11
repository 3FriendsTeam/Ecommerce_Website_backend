'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductAttributeDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     // Mỗi ProductAttributeDetail thuộc về một Product
    this.belongsTo(models.Product, { foreignKey: 'ProductID' });
    // Mỗi ProductAttributeDetail thuộc về một ProductAttribute
    this.belongsTo(models.ProductAttribute, { foreignKey: 'AttributeID' });

    }
  }
  ProductAttributeDetail.init({
    ProductID: DataTypes.INTEGER,
    AttributeID: DataTypes.INTEGER,
    AttributeValue: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductAttributeDetail',
  });
  return ProductAttributeDetail;
};