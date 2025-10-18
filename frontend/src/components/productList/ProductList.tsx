import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ProductList.css";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string | null;
  description: string | null;
  category_name: "Tote" | "Handbag" | "Minibags" | "Sling";
};

export function ProductList() {
  const { category } = useParams<{ category: string }>();
  const currentCategory = (category || "minibags").toLowerCase();

  const categoryMap: Record<string, Product["category_name"]> = {
    minibags: "Minibags",
    handbags: "Handbag",
    totebags: "Tote",
    slingbags: "Sling",
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((all: Product[]) => {
        const wanted = categoryMap[currentCategory] || "Minibags";
        const filtered = all.filter((p) => p.category_name === wanted);
        setProducts(filtered);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [currentCategory]);

  if (loading) return <p style={{ padding: 24 }}>Loading…</p>;

  return (
    <section className="product-list">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <div className="image-placeholder" />
          <h4>{p.name}</h4>
          <p>${p.price}</p>
          <Link to={`/product/${p.id}`}>
            <button>Show More</button>
          </Link>
        </div>
      ))}
    </section>
  );
}