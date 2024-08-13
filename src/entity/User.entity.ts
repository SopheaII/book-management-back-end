import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { T } from "../common";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: false })
  password: string;

  @Column("jsonb", {
    default: () => `'${JSON.stringify([T.RoleEnum[2]])}'`, // Default to an array containing a single role
    nullable: false,
  })
  role: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
