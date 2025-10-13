// src/pages/CatalogPage.tsx
import { Header } from "../../components/header/Header";
import { ProductList } from "../../components/productList/ProductListMiniBags";
import { Footer } from "../../components/footer/Footer";
// import "../styles/catalog.css";
import hero from "../assets/hero.jpg"; // 

export function CatalogPage() {
  return (
    <>
      <Header />

      {/* Hero banner */}
      <section className="hero">
        <img src={hero} alt="collection" />
      </section>

      {/* Filters */}
      <section className="filter-bar">
        <h3>Mini Bags</h3>
        <div className="filter-info">
          <span>Showing 1–10 of 100 Products</span>
          <select>
            <option>Most Popular</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </section>

      {/* Products */}
      <ProductList />

   
      {/* Footer */}
      <Footer />
    </>
  );
}
