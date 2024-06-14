import * as dotenv from "dotenv";
// @ts-ignore
import express from "express";
// @ts-ignore
import cors from "cors";
import router from "./routes/index.routes";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
