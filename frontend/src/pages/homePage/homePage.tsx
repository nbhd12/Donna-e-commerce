import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import type { Product } from '../../types/ProductModel';
import type { Category } from '../../types/CategoryModel';
import bannerImage from '../../assets/banner.png';
import './homePage.css';

const HomePage: React.FC = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [topSelling, setTopSelling] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categories: Category[] = [
    {
      id: 1,
      name: 'Hand Bags',
      description: 'Urna duis pellentesque vestibulum aliquet pharetra cursus aliquet orci.',
      image: '/cat1.png'
    },
    {
      id: 2,
      name: 'Sling Bags',
      description: 'Urna duis pellentesque vestibulum aliquet pharetra cursus aliquet orci.',
      image: '/cat2.png'
    },
    {
      id: 3,
      name: 'Tote Bags',
      description: 'Urna duis pellentesque vestibulum aliquet pharetra cursus aliquet orci.',
      image: 'cat3'
    },
    {
      id: 4,
      name: 'Mini Bags',
      description: 'Urna duis pellentesque vestibulum aliquet pharetra cursus aliquet orci.',
      image: '../cat4'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const allProducts = await productService.getAll();
        console.log('Products loaded:', allProducts);
        
        if (allProducts.length > 0) {
    
          const arrivals = allProducts.slice(0, 4);
          setNewArrivals(arrivals);
          
          const selling = allProducts.length > 4 
            ? allProducts.slice(4, 8) 
            : allProducts.slice(0, 4);
          setTopSelling(selling);
        }
        
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="homepage">
      
      <section className="banner-section">
        <img 
          src={bannerImage}
          alt="Donna Banner"
          className="banner-image"
        />
      </section>

      <section className="products-section">
        <h2 className="section-title">NEW ARRIVALS</h2>
        
        {newArrivals.length === 0 ? (
          <p className="no-products">No products available</p>
        ) : (
          <div className="products-grid">
            {newArrivals.map((product) => (
              <Link 
                to={`/product/${product.id}`} 
                key={product.id} 
                className="product-card"
              >
                <div className="product-image">
                  <img 
                    src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'} 
                    alt={product.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">€{product.price.toFixed(0)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="products-section">
        <h2 className="section-title">TOP SELLING</h2>
        
        {topSelling.length === 0 ? (
          <p className="no-products">No products available</p>
        ) : (
          <div className="products-grid">
            {topSelling.map((product) => (
              <Link 
                to={`/product/${product.id}`} 
                key={product.id} 
                className="product-card"
              >
                <div className="product-image">
                  <img 
                    src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'} 
                    alt={product.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">€{product.price.toFixed(0)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="categories-section">
        <h2 className="section-title">BROWSE BY STYLE</h2>
        
        <div className="categories-grid">
          {categories.map((category) => (
            <Link 
              to={`/category?type=${category.name.toLowerCase().replace(' ', '-')}`}
              key={category.id} 
              className="category-card"
            >
              <div className="category-image">
                <img 
                  src={category.image} 
                  alt={category.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/300x300?text=Category';
                  }}
                />
              </div>
              <div className="category-content">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;