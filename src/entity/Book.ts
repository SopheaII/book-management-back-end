import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User.entity";
import { BookIssue } from "./BookIssue";

@Entity({ name: "books" })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  genre: string;

  @Column({ type: "date", nullable: true })
  publishedDate: Date;

  @Column({ default: true })
  available: boolean;

  @OneToOne(() => BookIssue, (bookIssue) => bookIssue.book)
  @JoinColumn()
  bookIssue: BookIssue;

  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
