'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WarrantyPolicy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product, { foreignKey: 'WarrantyPolicyID' });    }
  }
  WarrantyPolicy.init({
    ImgProfile : DataTypes.STRING,
    WarrantyProvider: DataTypes.STRING,
    WarrantyConditions: DataTypes.STRING,
    PolicyContent: DataTypes.TEXT,
    DeletedAt: DataTypes.DATE,
    CreatedBy: DataTypes.STRING,
    DeletedBy: DataTypes.STRING,
    UpdatedBy: DataTypes.STRING,
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'WarrantyPolicy',
  });
  return WarrantyPolicy;
};