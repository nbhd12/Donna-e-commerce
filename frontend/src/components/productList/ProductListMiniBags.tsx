import { useEffect, useState } from "react";
import "./productList.css";

// тип данных для одного товара
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export function ProductListMiniBags() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // 🚀 если backend запущен, подключаем настоящий API:
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => {
        // если сервер недоступен — фейковые данные
        setProducts([
          {
            id: 1,
            name: "Mini Crossbody Bag",
            price: 89,
            image: "/src/assets/bag1.jpg",
          },
          {
            id: 2,
            name: "Leather Shoulder Bag",
            price: 120,
            image: "/src/assets/bag2.jpg",
          },
          {
            id: 3,
            name: "Evening Clutch",
            price: 95,
            image: "/src/assets/bag3.jpg",
          },
          {
            id: 4,
            name: "Mini Tote Bag",
            price: 110,
            image: "/src/assets/bag4.jpg",
          },
        ]);
      });
  }, []);

  return (
    <section className="product-list">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <img src={p.image} alt={p.name} />
          <h4>{p.name}</h4>
          <p>${p.price}</p>
          <button>Show More</button>
        </div>
      ))}
    </section>
  );
}
