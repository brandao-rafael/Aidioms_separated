/* eslint-disable import/no-cycle */
import { Model, INTEGER, BOOLEAN, DATE } from 'sequelize';
import User from './users.model';
import db from '.';

export default class UserCode extends Model {
  public id!: number;
  public code!: string;
  public isVerified!: boolean;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserCode.init({
  id: {
    type: INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  code: {
    type: INTEGER,
    allowNull: false,
  },
  deleted: {
    type: BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DATE,
  },
}, {
  tableName: 'user_code',
  timestamps: true,
  underscored: true,
  sequelize: db,
});

UserCode.belongsTo(User, { foreignKey: 'userId' });
