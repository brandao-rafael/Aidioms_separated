/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('class', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      class_name: {
        type: Sequelize.STRING,
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
      book: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      unit: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      deleted: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('class');
  },
};
