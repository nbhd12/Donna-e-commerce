import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';
import { Product, Category } from '../types';
import './Home.css';

const Home: React.FC = () => {

  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [topSelling, setTopSelling] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');


  // search data to render page
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // search recent product (New Arrivals) (create api)

        const recentProducts = await productAPI.getRecent(4);
        setNewArrivals(recentProducts);

        // search top selling product (create api)


        const allProducts = await productAPI.getAll();
        setTopSelling(allProducts.slice(0, 4));

        // search by category (create api)

        const categoriesData = await categoryAPI.getAll();
        setCategories(categoriesData);


      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

 // function for newsletter

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    if (email) {
      alert(`Email cadastrado: ${email}`);
      setEmail(''); 
    }
  };

  // pics for types of bags

  const getCategoryIcon = (categoryName: string) => {
    const icons: { [key: string]: string } = {
      'Tote': 'Tote.png',
      'Handbag': 'Handbag.png',
      'Backpack': 'Backpack.png',
      'Sling': 'Sling.png'
    };
    return icons[categoryName] || 'Purses';
  };

  if (loading) {
    return <div className="loading">Charging...</div>;
  }

  return (

  // Main banner

    <div className="home-page">
      
      <section className="hero-banner">
        <div className="banner-content">
          <h1>Banner</h1>
        </div>
      </section>

// new Arrivals

      <section className="section">
        <h2 className="section-title">NEW ARRIVALS</h2>
        
        <div className="products-row">
          {newArrivals.map((product) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              className="product-card-simple"
            >

              //pic of product

              <div className="product-image-simple">
                <img 
                  src={product.image || '/placeholder.png'} 
                  alt={product.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.png';
                  }}
                />
              </div>
              
              // name and price

              <div className="product-info-simple">
                <p className="product-name-simple">{product.name}</p>
                <p className="product-price-simple">€{product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>


      <section className="section">
        <h2 className="section-title">TOP SELLING</h2>
        
        <div className="products-row">
          {topSelling.map((product) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              className="product-card-simple"
            >
              <div className="product-image-simple">
                <img 
                  src={product.image || '/placeholder.png'} 
                  alt={product.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.png';
                  }}
                />
              </div>
              
              <div className="product-info-simple">
                <p className="product-name-simple">{product.name}</p>
                <p className="product-price-simple">€{product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">BROWSE BY STYLE</h2>
        
        <div className="styles-grid">
          {categories.map((category) => (
            <Link 
              to={`/categories`} 
              key={category.id} 
              className="style-card"
            >
              <div className="style-image">
                <img 
                  src={category.image || '/image.png'} 
                  alt={category.name}
                />
              </div>
              // category name
              <div className="style-overlay">
                <span className="style-icon">{getCategoryIcon(category.name)}</span>
                <h3 className="style-name">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
// newsletter

      <section className="newsletter-section">
        <div className="newsletter-container">
          <h2 className="newsletter-title">
            STAY UPTO DATE ABOUT<br />
            OUR LATEST OFFERS
          </h2>
          
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <div className="input-group">
              <span className="input-icon">✉️</span>
              <input 
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
            </div>
            
            <button type="submit" className="newsletter-button">
              Subscribe to Newsletter
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default Home;