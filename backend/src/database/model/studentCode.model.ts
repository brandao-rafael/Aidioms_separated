/* eslint-disable max-len */
import { Model, DataTypes, Optional } from 'sequelize';
import db from '.';
import User from './users.model';
import Student from './students.model';
import IStudentCode from '../interfaces/IStudentCode';

type StudentCodeCreationAttributes = Optional<IStudentCode, 'id'>;

export default class StudentCode extends Model<IStudentCode, StudentCodeCreationAttributes> implements IStudentCode {
  public id!: number;
  public user_id!: number;
  public student_id!: number;
  public code!: number;
  public deleted!: boolean;
  public created_at!: Date;
  public updated_at!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate() {
    this.belongsTo(User, { foreignKey: 'user_id' });
    this.belongsTo(Student, { foreignKey: 'student_id' });
  }
}

StudentCode.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'student',
        key: 'id',
      },
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: 'StudentCode',
    tableName: 'student_code',
    timestamps: true,
    underscored: true,
  },
);
