/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines-per-function */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('chat', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_session_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user_session_id',
          key: 'id',
        },
      },
      prompt: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      output: {
        type: Sequelize.TEXT('long'),
      },
      prompt_offensive: {
        type: Sequelize.BOOLEAN,
      },
      output_offensive: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('chat');
  },
};
