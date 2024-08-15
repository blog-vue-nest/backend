import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Post extends Model {
  @Column({ type: DataTypes.STRING })
  titleEn: string;

  @Column({ type: DataTypes.STRING })
  img: string;

  @Column({ type: DataTypes.TEXT })
  descriptionEn: string;

  @Column({ type: DataTypes.TEXT })
  smallDescriptionEn: string;

  @Column({ type: DataTypes.INTEGER })
  views: number;
}
