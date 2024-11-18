'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductName: {
        type: Sequelize.STRING,
        allowNull: false // Không cho phép giá trị null
      },
      ListedPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false // Không cho phép giá trị null
      },
      RepresentativeImage: {
        type: Sequelize.STRING
      },
      Stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0 // Giá trị mặc định là 0
      },
      Description: {
        type: Sequelize.TEXT
      },
      PromotionalPrice: {
        type: Sequelize.DECIMAL
      },
      Status: {
        type: Sequelize.STRING,
        allowNull: false // Không cho phép giá trị null
      },
      Sold: {
        type: Sequelize.INTEGER,
        defaultValue: 0 // Giá trị mặc định là 0
      },
      DeletedAt: {
        type: Sequelize.DATE
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
        allowNull: true,
        defaultValue: false 
      },
      CategoryID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories', // Bảng liên kết
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // Khi xóa ProductType, đặt ProductTypeID thành null
      },
      WarrantyPolicyID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'WarrantyPolicies', // Bảng liên kết
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // Khi xóa WarrantyPolicy, đặt WarrantyPolicyID thành null
      },
      ManufacturerID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Manufacturers', // Bảng liên kết
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // Khi xóa Manufacturer, đặt ManufacturerID thành null
      },
      CountryID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CountryOfOrigins', // Bảng liên kết
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // Khi xóa Country, đặt CountryID thành null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // Tự động gán ngày tạo hiện tại
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // Tự động gán ngày cập nhật hiện tại
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
