import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { CatalogPage } from "./pages/catalog/CatalogPage";


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/products/:category" element={<CatalogPage />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}