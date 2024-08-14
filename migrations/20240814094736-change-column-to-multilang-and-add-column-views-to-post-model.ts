import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.renameColumn(
      'Posts',
      'smallDescription',
      'smallDescriptionEn',
    );

    await queryInterface.changeColumn('Posts', 'smallDescriptionEn', {
      type: DataTypes.TEXT,
    });

    await queryInterface.renameColumn('Posts', 'description', 'descriptionEn');

    await queryInterface.changeColumn('Posts', 'descriptionEn', {
      type: DataTypes.TEXT,
    });

    await queryInterface.renameColumn('Posts', 'title', 'titleEn');

    await queryInterface.changeColumn('Posts', 'titleEn', {
      type: DataTypes.STRING,
    });

    await queryInterface.changeColumn('Posts', 'img', {
      type: DataTypes.STRING,
    });

    await queryInterface.addColumn('Posts', 'views', {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {},
};
