'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Promotions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PromotionName: {
        type: Sequelize.STRING,
        allowNull: false // Không cho phép giá trị null
      },
      DiscountValue: {
        type: Sequelize.DECIMAL, // Dùng DECIMAL để hỗ trợ phần thập phân
        allowNull: false
      },
      Quantity: {
        type: Sequelize.INTEGER,
        allowNull: true // Có thể để trống nếu không bắt buộc
      },
      MinValue: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      MaxDiscount: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      Code: {
        type: Sequelize.STRING,
        allowNull: true
      },
      StartDate: {
        type: Sequelize.DATE,
        allowNull: false // Không cho phép giá trị null
      },
      EndDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      CreatedDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      LastUpdated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      DeletedDate: {
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
        defaultValue: false // Mặc định là chưa xóa
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // Tự động gán ngày hiện tại
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // Tự động gán ngày hiện tại
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Promotions');
  }
};
