// src/components/Header.tsx
import "./../header/Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="logo">DONNA SHOP</div>
      <nav>
        <ul className="menu">
          <li>On Sale</li>;
          <li>New Arrivals</li>
        </ul>
      </nav>
    </header>
  );
}
