import { useEffect, useState } from "react";
// import "./../styles/catalog.css";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <section className="catalog">
      <div className="cards">
        {products.map((p) => (
          <div key={p.id} className="card">
            <img src={p.imageUrl} alt={p.name} />
            <h4>{p.name}</h4>
            <p className="price">{p.price} €</p>
            <button className="show-more">Show more</button>
          </div>
        ))}
      </div>
    </section>
  );
}
