import { Model, DataTypes } from 'sequelize';
import UserSessionId from './userSessionId.model';
import db from '.';

export default class Chat extends Model {
  public id!: number;
  public userSessionId!: number;
  public prompt!: string;
  public output!: string | null;
  public promptOffensive!: boolean | null;
  public outputOffensive!: boolean | null;
  public deleted!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userSessionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: UserSessionId,
        key: 'id',
      },
    },
    prompt: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    output: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    promptOffensive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    outputOffensive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
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
    tableName: 'chat',
    timestamps: true,
    underscored: true,
    sequelize: db,
  },
);

Chat.belongsTo(UserSessionId, {
  foreignKey: 'user_session_id',
  targetKey: 'id',
  as: 'userSession',
});
