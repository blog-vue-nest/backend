import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/modules/categories/models/category.model';

@Table
export class Post extends Model {
  @ForeignKey(() => Category)
  @Column({ type: DataTypes.INTEGER })
  categoryId: number;

  @Column({ type: DataTypes.STRING })
  titleEn: string;

  @Column({ type: DataTypes.STRING })
  titleUa: string;

  @Column({ type: DataTypes.STRING })
  img: string;

  @Column({ type: DataTypes.TEXT })
  descriptionEn: string;

  @Column({ type: DataTypes.TEXT })
  descriptionUa: string;

  @Column({ type: DataTypes.TEXT })
  smallDescriptionEn: string;

  @Column({ type: DataTypes.TEXT })
  smallDescriptionUa: string;

  @Column({ type: DataTypes.INTEGER, defaultValue: 0 })
  views: number;

  @BelongsTo(() => Category)
  category: Category;
}
