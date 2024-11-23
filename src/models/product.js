'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    // Một Product có nhiều ProductSupplierDetails
    this.hasMany(models.ProductSupplierDetails, { foreignKey: 'ProductID' });
    // Mỗi Product thuộc về một Category
    this.belongsTo(models.Category, { foreignKey: 'CategoryID' });
    // Mỗi Product thuộc về một WarrantyPolicy
    this.belongsTo(models.WarrantyPolicy, { foreignKey: 'WarrantyPolicyID' });
    // Mỗi Product thuộc về một CountryOfOrigin
    this.belongsTo(models.CountryOfOrigin, { foreignKey: 'CountryID' });
    // Mỗi Product thuộc về một Manufacturer
    this.belongsTo(models.Manufacturer, { foreignKey: 'ManufacturerID' });
    // Một Product có nhiều ProductAttributeDetail
    this.hasMany(models.ProductAttributeDetail, { foreignKey: 'ProductID' });
    // Một Product có nhiều Image
    this.hasMany(models.Image, { foreignKey: 'ProductID' });
    // Một Product có nhiều Color
    this.hasMany(models.Color, { foreignKey: 'ProductID' });
    // Một Product có nhiều DeliveryReceiptDetail
    this.hasMany(models.DeliveryReceiptDetail, { foreignKey: 'ProductID' });
    // Một Product có nhiều ReturnDetail
    this.hasMany(models.ReturnDetail, { foreignKey: 'ProductID' });
    // Một Product có nhiều Review
    this.hasMany(models.Review, { foreignKey: 'ProductID' });
    // Một Product có nhiều OrderProductDetail
    this.hasMany(models.OrderProductDetail, { foreignKey: 'ProductID' });
      // define association here
    }  }
  Product.init({
    ProductName: DataTypes.STRING,
    ListedPrice: DataTypes.DECIMAL,
    RepresentativeImage: DataTypes.STRING,
    Stock: DataTypes.INTEGER,
    Description: DataTypes.TEXT,
    PromotionalPrice: DataTypes.DECIMAL,
    Status: DataTypes.STRING,
    Sold: DataTypes.INTEGER,
    DeletedAt: DataTypes.DATE,
    CreatedBy: DataTypes.STRING,
    DeletedBy: DataTypes.STRING,
    UpdatedBy: DataTypes.STRING,
    IsDeleted: DataTypes.BOOLEAN,
    CategoryID: DataTypes.INTEGER,
    WarrantyPolicyID: DataTypes.INTEGER,
    ManufacturerID: DataTypes.INTEGER,
    CountryID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};