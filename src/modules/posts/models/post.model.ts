import { Column, Model,Table } from "sequelize-typescript";

@Table
export class Post extends Model { 
    @Column
    title: string;
    
    @Column
    img: string;

    @Column({ type: 'TEXT' })
    description: string;

    @Column({ type: 'TEXT' })
    smallDescription: string;
}