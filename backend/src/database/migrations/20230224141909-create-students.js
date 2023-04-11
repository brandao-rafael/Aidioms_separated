/* eslint-disable max-lines-per-function */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true,
      },
      birth: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      class_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'class',
          key: 'id',
        },
      },
      difficult: {
        type: Sequelize.STRING(45),
      },
      best_activities: {
        type: Sequelize.STRING(45),
      },
      email_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      deleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('student');
  },
};
