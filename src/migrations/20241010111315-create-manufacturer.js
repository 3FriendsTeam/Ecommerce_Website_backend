'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Manufacturers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ManufacturerName: {
        type: Sequelize.STRING,
        allowNull: false // Đảm bảo tên nhà sản xuất là bắt buộc
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // Tự động gán thời gian hiện tại
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // Tự động gán thời gian hiện tại
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Manufacturers');
  }
};
