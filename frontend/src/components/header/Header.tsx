import { Link } from "react-router-dom";
import "./Header.css";
import hero from "../../assets/hero.jpg";

export function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <div className="left-section">
          <div className="logo">DONNA</div>

          <nav className="nav-links">
            <Link to="/products/manybags">Mini Bags</Link>
            <Link to="/products/handbags">Hand Bags</Link>
            <Link to="/products/totebags">Tote Bags</Link>
            <Link to="/products/slingbags">Sling Bags</Link>
          </nav>
        </div>

        <div className="right-section">
          <Link to="/cart" className="icon-link">🛒</Link>
          <Link to="/profile" className="icon-link">👤</Link>
        </div>
      </div>

      <section className="hero">
        <img src={hero} alt="Mini Bags Collection" />
      </section>

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
    </header>
  );
}