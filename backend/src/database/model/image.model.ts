import { DataTypes, Model, Optional } from "sequelize";
import db from '.';
import User from "./users.model";

interface ImageGeneratedAttributes {
  id: number;
  user_id: number;
  prompt: string;
  output: string;
  deleted: boolean;
} 

interface ImageGeneratedCreationAttributes extends Optional<ImageGeneratedAttributes, "id" | "deleted"> {} 

export class ImageGenerated extends Model<ImageGeneratedAttributes, ImageGeneratedCreationAttributes> implements ImageGeneratedAttributes {
  id!: number;
  user_id!: number;
  prompt!: string;
  output!: string;
  deleted!: boolean;
  readonly createdAt!:Date;
  readonly updatedAt!: Date;
  public readonly user?: User;
} 
ImageGenerated.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  }, 
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: "User",
      key: "id",
    },
  },
  prompt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  output: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, 
{
  tableName: "imageGenerated",
  sequelize: db,
  paranoid: true,
  timestamps: true,
  underscored: true,
} );

ImageGenerated.belongsTo(User,{ foreignKey: "user_id", as: "user", });