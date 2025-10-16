import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import session from "express-session";
import path from "node:path";
import { fileURLToPath } from "node:url";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";

dotenv.config();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const SESSION_SECRET = process.env.SESSION_SECRET || "defaultSecretKey";

const app = express();

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "public")));


app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, 
      httpOnly: true,
      secure: false,          
    },
  })
);

app.get ("/", (req, res) => {
res.send ("Bienvenue sur  Donna e-commerce!")
})


app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);


app.listen(PORT, () => {
   console.log(`Server running on: http://localhost:${PORT}`);
   console.log(`CORS allowed from: ${FRONTEND_URL}`);
});
