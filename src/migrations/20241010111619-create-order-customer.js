'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderCustomers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OrderDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      OrderStatus: {
        type: Sequelize.STRING(255), // Đặt giới hạn kích thước tương đương VARCHAR(255)
        allowNull: false
      },
      TotalAmount: {
        type: Sequelize.DECIMAL(18, 2), // Đặt kích thước tương đương DECIMAL(18, 2)
        allowNull: false,
        defaultValue: 0.00
      },
      PaymentMethodID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'PaymentMethods', // Tham chiếu tới bảng PaymentMethods
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // Đặt NULL khi phương thức thanh toán bị xóa
      },
      EmployeeID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Employees', // Tham chiếu tới bảng Employees
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // Đặt NULL khi nhân viên bị xóa
      },
      PromotionID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Promotions', // Tham chiếu tới bảng Promotions
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // Đặt NULL khi khuyến mãi bị xóa
      },
      // CustomerID: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'Customers', // Tham chiếu tới bảng Customers
      //     key: 'id'
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE' // Xóa đơn hàng khi khách hàng bị xóa
      // },
      
      PaymentStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      PaymentDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      AddressID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'ShippingAddresses',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('OrderCustomers');
  }
};
