import { Model, INTEGER, STRING, BOOLEAN, DATE } from 'sequelize';
import db from '.';

export default class User extends Model {
  declare id: number;
  declare name: string;
  declare phone: string;
  declare email: string;
  declare password: string;
  declare isVerified: boolean;
}

User.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: INTEGER,
    },
    name: {
      allowNull: false,
      type: STRING,
      unique: false,
    },
    email: {
      allowNull: false,
      type: STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: STRING,
    },
    phone: {
      allowNull: false,
      type: STRING(45),
    },
    birth: {
      allowNull: false,
      type: DATE,
    },
    emailVerified: {
      allowNull: false,
      defaultValue: false,
      type: BOOLEAN,
    },
    deleted: {
      allowNull: false,
      defaultValue: false,
      type: BOOLEAN,
    },
    createdAt: {
      allowNull: false,
      type: DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DATE,
    },
  },
  {
    tableName: 'user',
    underscored: true,
    timestamps: true,
    sequelize: db,
  },
);
