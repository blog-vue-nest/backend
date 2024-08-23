'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Posts', 'userId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: true,
    });

    await queryInterface.changeColumn('Posts', 'img', {
      type: Sequelize.DataTypes.TEXT('long'),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Posts', 'userId');

    await queryInterface.changeColumn('Posts', 'img', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
  },
};
