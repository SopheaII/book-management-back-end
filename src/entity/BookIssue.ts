import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";

@Entity({ name: "bookIssues" })
export class BookIssue {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  status: string;

  @Column()
  desc: string;

  @OneToOne(() => Book, (book) => book.bookIssue)
  @JoinColumn()
  book: Book;
}
