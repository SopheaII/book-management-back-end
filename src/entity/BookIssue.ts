import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Book } from "./Book";
import { User } from "./User.entity";

@Entity({ name: "bookIssues" })
export class BookIssue {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  status: string;

  @Column()
  desc: string;

  // @OneToOne(() => Book, (book) => book.bookIssue)
  // @JoinColumn()
  // book: Book;

  @ManyToOne(() => Book, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  book: Book;

  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
