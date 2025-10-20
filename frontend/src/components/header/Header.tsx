// src/components/Header.tsx
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import "./Header.css";

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        DONNA
      </Link>

      <button 
        className="mobile-menu-btn" 
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      <nav>
        <ul className={`menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li className={isActive('/category') ? 'active' : ''}>
            <Link to="/category" onClick={() => setMobileMenuOpen(false)}>
              Shop
            </Link>
          </li>
          <li className={isActive('/sale') ? 'active' : ''}>
            <Link to="/category?sale=true" onClick={() => setMobileMenuOpen(false)}>
              On Sale
            </Link>
          </li>
          <li className={isActive('/') ? 'active' : ''}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              New Arrivals
            </Link>
          </li>
        </ul>
      </nav>

      <div className="header-actions">
        <button className="icon-btn" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>

        <Link to="/cart" className="icon-btn cart-btn" aria-label="Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span className="cart-badge">0</span>
        </Link>

        <Link to="/profile" className="icon-btn" aria-label="Profile">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </Link>
      </div>
    </header>
  );
}