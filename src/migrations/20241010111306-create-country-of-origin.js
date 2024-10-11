'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CountryOfOrigins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CountryName: {
        type: Sequelize.STRING,
        allowNull: false // Đảm bảo tên quốc gia là bắt buộc
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
    await queryInterface.dropTable('CountryOfOrigins');
  }
};
