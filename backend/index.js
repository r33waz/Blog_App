import express from "express";
import "dotenv/config";
import { DBconnect } from "./src/config/db.config.js";
import mainrouter from "./src/routes/main.js";
// import cookieParser from "cookie-parser"
import cors from "cors";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import swaggrJsdoc from "swagger-jsdoc";
const app = express();
DBconnect();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY, // Geting the session secret key from env file
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: "Lax",
      secure: false,
    },
  })
);

const PORT = process.env.PORT;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BLog-App API Documentation",
      version: "1.0.0",
      description: "A swagger document where all the api of Blog-App is stored",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/routes/*.js"], //path to all the api created directory
};

const swaggerDocs = swaggrJsdoc(swaggerOptions);
app.use("/api-docs/swagger/blog-app", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  cors({
    origin: "http://localhost:5173", // Add url of your frontrnd
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(mainrouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
