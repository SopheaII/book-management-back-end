// import "reflect-metadata";
// import { DataSource } from "typeorm";
// import { User } from "./entity/User";

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "postgres",
//   password: "1111",
//   database: "mydatabase",
//   synchronize: true,
//   logging: false,
//   entities: [User],
//   migrations: [],
//   subscribers: [],
// });

import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { User } from "./entity/User";
import { Book } from "./entity/Book";
import { BookIssue } from "./entity/BookIssue";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  synchronize: NODE_ENV === "dev" ? true : false,
  //logging logs sql command on the treminal
  logging: NODE_ENV === "dev" ? false : false,
  entities: [User, Book, BookIssue],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});
