import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class UserSessionId extends Model {
  public id!: number;
  public userId!: number;
  public sessionId!: number;
  public deleted!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

UserSessionId.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    sessionId: {
      field: 'session_id',
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'user_session_id',
    timestamps: true,
    underscored: true,
    sequelize: db,
  },
);
