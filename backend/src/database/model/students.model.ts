/* eslint-disable max-len */
import { Model, DataTypes, Optional } from 'sequelize';
import db from '.';
import IStudent from '../interfaces/IStudents';
import Class from './class.model';

type StudentCreationAttributes = Optional<IStudent, 'id'>;

export default class Student extends Model<IStudent, StudentCreationAttributes> implements IStudent {
  public id!: number;
  public name!: string;
  public email!: string;
  public birth!: Date;
  public class_id!: number;
  public difficult?: string;
  public best_activities?: string;
  public email_verified!: boolean;
  public deleted!: boolean;
  public created_at!: Date;
  public updated_at!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate() {
    this.belongsTo(Class, { foreignKey: 'class_id' });
  }
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'class',
        key: 'id',
      },
    },
    difficult: {
      type: DataTypes.STRING(45),
    },
    best_activities: {
      type: DataTypes.STRING(45),
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Student',
    tableName: 'student',
    timestamps: true,
    underscored: true,
  },
);
