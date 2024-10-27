'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Một Promotion có nhiều OrderCustomer
    this.hasMany(models.OrderCustomer, { foreignKey: 'PromotionID' });
  }
  }
  Promotion.init({
    PromotionName: DataTypes.STRING,
    DiscountValue: DataTypes.INTEGER,
    Quantity: DataTypes.INTEGER,
    MinValue: DataTypes.DECIMAL,
    MaxDiscount: DataTypes.DECIMAL,
    Code: DataTypes.STRING,
    StartDate: DataTypes.DATE,
    EndDate: DataTypes.DATE,
    DeletedAt: DataTypes.DATE,
    CreatedBy: DataTypes.STRING,
    DeletedBy: DataTypes.STRING,
    UpdatedBy: DataTypes.STRING,
    IsDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Promotion',
  });
  return Promotion;
};