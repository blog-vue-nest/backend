'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },

      titleEn: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      titleUa: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      descriptionEn: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      descriptionUa: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      smallDescriptionEn: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      smallDescriptionUa: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      views: {
        type: Sequelize.DataTypes.INTEGER,
        default: 0,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Posts');
  },
};
