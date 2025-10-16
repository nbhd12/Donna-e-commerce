import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ProductList.css";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export function ProductList() {
  const { category } = useParams<{ category: string }>();
  const currentCategory = (category || "minibags").toLowerCase();

  const fakeData: Record<string, Product[]> = {
    minibags: [
      { id: 1, name: "Mini Crossbody Bag", price: 89, image: "", description: "Stylish and compact bag." },
      { id: 2, name: "Mini Tote", price: 99, image: "", description: "Small tote perfect for essentials." },
    ],
    handbags: [
      { id: 3, name: "Leather Handbag", price: 120, image: "", description: "Elegant handbag made from real leather." },
      { id: 4, name: "Elegant Handbag", price: 135, image: "", description: "Perfect for business or casual use." },
    ],
  };

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(fakeData[currentCategory] || fakeData["minibags"]);
  }, [currentCategory]);

  return (
    <section className="product-list">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <div className="image-placeholder"></div>
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