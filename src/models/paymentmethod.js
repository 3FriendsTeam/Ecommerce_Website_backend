'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       // Một PaymentMethod có nhiều OrderCustomer
    this.hasMany(models.OrderCustomer, { foreignKey: 'PaymentMethodID' });

    }
  }
  PaymentMethod.init({
    PaymentMethodName: DataTypes.STRING,
    Description: DataTypes.TEXT,
    Status: DataTypes.STRING,
    StartDate: DataTypes.DATE,
    EndDate: DataTypes.DATE,
    ApplicableFee: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
    LastUpdated: DataTypes.DATE,
    DeletedDate: DataTypes.DATE,
    CreatedBy: DataTypes.STRING,
    DeletedBy: DataTypes.STRING,
    UpdatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PaymentMethod',
  });
  return PaymentMethod;
};