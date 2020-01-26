import { IsEmail } from 'class-validator';
import * as crypto from 'crypto';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: '' })
  image: string;

  @Column()
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @ManyToMany(type => ArticleEntity)
  @JoinTable()
  favorites: ArticleEntity[];

  @OneToMany(
    type => ArticleEntity,
    article => article.author
  )
  articles: ArticleEntity[];

  @OneToMany(
    type => CommentEntity,
    comment => comment.user
  )
  comments: CommentEntity[];
}
