import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";

@Entity()
export class BookIssue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  desc: string;

  @OneToOne(() => Book, (book) => book.bookIssue)
  @JoinColumn()
  book: Book;
}
