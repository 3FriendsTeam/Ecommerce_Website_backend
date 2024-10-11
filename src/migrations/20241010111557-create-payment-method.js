'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentMethods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PaymentMethodName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Description: {
        type: Sequelize.TEXT
      },
      Status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      StartDate: {
        type: Sequelize.DATE
      },
      EndDate: {
        type: Sequelize.DATE
      },
      ApplicableFee: {
        type: Sequelize.DECIMAL
      },
      CreatedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW // Gán ngày hiện tại khi tạo
      },
      LastUpdated: {
        type: Sequelize.DATE
      },
      DeletedDate: {
        type: Sequelize.DATE
      },
      CreatedBy: {
        type: Sequelize.STRING
      },
      DeletedBy: {
        type: Sequelize.STRING
      },
      UpdatedBy: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('PaymentMethods');
  }
};
