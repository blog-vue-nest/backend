import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/modules/categories/models/category.model';
import { User } from 'src/modules/users/models/user.model';

@Table
export class Post extends Model {
  @ForeignKey(() => Category)
  @Column({ type: DataTypes.INTEGER })
  categoryId: number;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  userId: number;

  @Column({ type: DataTypes.STRING })
  titleEn: string;

  @Column({ type: DataTypes.STRING })
  titleUa: string;

  @Column({ type: DataTypes.TEXT })
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

  @BelongsTo(() => User)
  user: User;
}
