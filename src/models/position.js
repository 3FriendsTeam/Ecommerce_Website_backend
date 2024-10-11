'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một Position có nhiều Employee_Position
    this.hasMany(models.Employee_Position, { foreignKey: 'PositionID' });
  }
  }
  Position.init({
    PositionName: DataTypes.STRING,
    Notes: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
    LastUpdated: DataTypes.DATE,
    DeletedDate: DataTypes.DATE,
    CreatedBy: DataTypes.STRING,
    DeletedBy: DataTypes.STRING,
    UpdatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Position',
  });
  return Position;
};