/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines-per-function */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_session_id', {
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
      session_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
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
    await queryInterface.dropTable('user_session_id');
  },
};
