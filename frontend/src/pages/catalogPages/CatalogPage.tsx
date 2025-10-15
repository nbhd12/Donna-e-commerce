import { useEffect, useState } from "react";
import { ProductList } from "../../components/productList/ProductListMiniBags";
import hero from "../../assets/hero.jpg";

export function CatalogPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("http://localhost:5000/api/categories");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setCategories(data);
      } catch (err: any) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <>
    
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

      {/* Category list */}
      <section className="categories">
        <h3>Available Categories</h3>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>{cat.name}</li>
          ))}
        </ul>
      </section>

      {/* Products */}
      <ProductList />

      {/* Footer */}
      
    </>
  );
}

