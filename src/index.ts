import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import authRoute from "./router/auth";
import userRoute from "./router/user";
import bookRoute from "./router/book";
import bookIssueRoute from "./router/book-issue";

import cors = require("cors");
import "reflect-metadata";
import { errorHandler } from "./middleware/error.middleware";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use(errorHandler);
// const { PORT = 3000 } = process.env;
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/book", bookRoute);
app.use("/api/book-issue", bookIssueRoute);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(8080, () => {
      console.log("Server is running on http://localhost:" + 8080);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
