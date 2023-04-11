/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines-per-function */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('imageGenerated', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      prompt: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      output: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('imageGenerated');
  },
};
