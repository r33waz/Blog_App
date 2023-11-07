import express from "express";
import "dotenv/config";
import { DBconnect } from "./src/config/db.config.js";
import mainrouter from "./src/routes/main.js";
// import cookieParser from "cookie-parser"
import cors from "cors";
import session from "express-session";

const app = express();
DBconnect();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY, // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
      sameSite: "Lax",
      secure: false
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with the origin of your frontend application
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(mainrouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
