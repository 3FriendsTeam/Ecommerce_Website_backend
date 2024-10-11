'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DeliveryReceiptDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' // Đảm bảo tính nhất quán khi Product bị cập nhật
      },
      ReceiptID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'DeliveryReceipts',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' // Đảm bảo tính nhất quán khi DeliveryReceipt bị cập nhật
      },
      Quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      UnitPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      TotalPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      Unit: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('DeliveryReceiptDetails');
  }
};
