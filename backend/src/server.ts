import express from "express";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const app = express();

app.get ("/", (req, res) => {
res.send ("Bienvenue sur  Donna e-commerce!")
})

app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(` http://localhost:${PORT}`);
});
