// src/components/Header.tsx
import "./../header/Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="logo">DONNA</div>
      <nav>
        <ul className="menu">
          <li>Shop</li>;
          <li>On Sale</li>;
          <li>New Arrivals</li>
          <li>Cart</li>
        </ul>
      </nav>
    </header>
  );
}
