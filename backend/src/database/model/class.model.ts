import { DataTypes, literal, Model, Optional } from 'sequelize';
import db from '.';
import IClass from '../interfaces/IClass';
import User from './users.model';

type ClassCreationAttributes = Optional<IClass, 'id'>;

export default class Class extends Model<IClass, ClassCreationAttributes> implements IClass {
  public id!: number;
  public class_name!: string;
  public user_id!: number;
  public book!: string;
  public unit!: string;
  public deleted!: boolean;
  public created_at!: Date;
  public updated_at!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate() {
    this.belongsTo(User, { foreignKey: 'user_id' });
  }
}

Class.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    book: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    modelName: 'Class',
    tableName: 'class',
    timestamps: true,
    underscored: true,
  },
);
