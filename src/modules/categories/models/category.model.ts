import { DataTypes } from 'sequelize';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Post } from 'src/modules/posts/models/post.model';

@Table
export class Category extends Model {
  @Column({ type: DataTypes.STRING })
  titleEn: string;

  @Column({ type: DataTypes.STRING })
  titleUa: string;

  @HasMany(() => Post, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  posts: Post[];
}
