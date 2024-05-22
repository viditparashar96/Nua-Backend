import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import logger from "morgan";
import { connectdb } from "./configs/db";
dotenv.config();
connectdb();
const app: Express = express();

const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", require("./routes/user.route"));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhosts:${port}`);
});
