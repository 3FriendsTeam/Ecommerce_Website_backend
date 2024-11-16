'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WarrantyPolicies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ImgProfile : {
        type: Sequelize.STRING,
        allowNull: true
      },
      WarrantyProvider: {
        type: Sequelize.STRING,
        allowNull: false
      },
      WarrantyConditions: {
        type: Sequelize.STRING,
        allowNull: true
      },
      PolicyContent: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      DeletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      CreatedBy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      DeletedBy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      UpdatedBy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      IsDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WarrantyPolicies');
  }
};
