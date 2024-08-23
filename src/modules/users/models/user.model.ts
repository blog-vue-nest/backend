import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Post } from 'src/modules/posts/models/post.model';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Post, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  posts: Post[];
}
