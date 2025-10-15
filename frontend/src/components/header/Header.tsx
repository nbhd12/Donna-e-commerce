import { useState } from "react";
import "./Header.css";
import hero from "../../assets/hero.jpg";

export function Header() {
  const [shop, setShop] = useState(false);
  const [sort, setSort] = useState(false);

  return (
    <header className="header">
      <div className="nav">
        <div className="nav-left">
          <span className="logo">Donna</span>

          <div className="dropdown-wrap">
            <span className="menu-link" onClick={() => setShop(!shop)}>
              Shop ▼
            </span>
            {shop && (
              <ul className="dropdown">
                <li>Bags</li>
                <li>Accessories</li>
                <li>Shoes</li>
              </ul>
            )}
          </div>

          <span className="menu-link">On Sale</span>
          <span className="menu-link">New Arrivals</span>
        </div>

        <div className="nav-right">
          <span>🛒</span>
          <span>👤</span>
        </div>
      </div>

      <div className="hero">
        <img src={hero} alt="Banner" />
      </div>

      <div className="filter-bar">
        <h3 className="filter-title">Mini Bags</h3>

        <div className="filter-right">
          <span>Showing 1–10 of 100 Products</span>

          <div className="dropdown-wrap">
            <span className="menu-link" onClick={() => setSort(!sort)}>
              Sort by Most Popular ▼
            </span>
            {sort && (
              <ul className="dropdown right">
                <li>Most Popular</li>
                <li>Price: Low to High</li>
                <li>Price: High to Low</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
