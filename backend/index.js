import express from "express";
import "dotenv/config";
import { DBconnect } from "./src/config/db.config.js";
import mainrouter from './src/routes/main.js'
import cookieParser from "cookie-parser"

const app = express();
DBconnect();
app.use(express.json());
app.use(cookieParser());
app.use(mainrouter);

const PORT = process.env.PORT;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
