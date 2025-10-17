import express from "express";
import productRouter from "./routes/ProductRoutes";
import categoryRouter from "./routes/CategoryRoutes";
import cors from "cors";

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());


app.use("/categories", categoryRouter);
app.use("/products", productRouter);


app.get("/", (req, res) => res.send("Donna backend fonctionne "));

app.listen(5000, () => {
  console.log("Serveur backend démarré sur le port 5000");
});
