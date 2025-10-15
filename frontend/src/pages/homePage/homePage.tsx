// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { productAPI, categoryAPI } from '../services/api';
// import { Category } from '../../../../backend/src/models/CategoryModel';
// import './Home.css';

// const HomePage: React.FC = () => {

//   const [newArrivals, setNewArrivals] = useState<Product[]>([]);
//   const [topSelling, setTopSelling] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);


//   // search data to render page
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // search recent product (New Arrivals) (create api)

//         const recentProducts = await productAPI.getRecent(4);
//         setNewArrivals(recentProducts);

//         // search top selling product (create api)


//         const allProducts = await productAPI.getAll();
//         setTopSelling(allProducts.slice(0, 4));

//         // search by category (create api)

//         const categoriesData = await categoryAPI.getAll();
//         setCategories(categoriesData);


//       } catch (error) {
//         console.error('Error', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []); 



//   // pics for types of bags

//   const getCategoryIcon = (categoryName: string) => {
//     const icons: { [key: string]: string } = {
//       'Tote': 'Tote.png',
//       'Handbag': 'Handbag.png',
//       'Backpack': 'Backpack.png',
//       'Sling': 'Sling.png'
//     };
//     return icons[categoryName] || 'Purses';
//   };

//   // Show loading while loading page

//   if (loading) {
//     return <div className="loading">Charging...</div>;
//   }

//  return (
//     <div className="home-container">

//       //main banner
      
//       <section className="banner-hero">
//         <img 
//           src="/images/banner-principal.jpg" 
//           alt="Banner Principal"
//           className="banner-image"
//           onError={(e) => {
//             // Se a imagem não carregar, mostra um banner com cor
//             (e.target as HTMLImageElement).style.display = 'none';
//             (e.target as HTMLImageElement).parentElement!.style.background = 
//               'linear-gradient(135deg, #9b7f9f 0%, #7d5f7f 100%)';
//           }}
//         />
//       </section>


// // new arrivals
//       <section className="content-section">
//         <h2 className="section-heading">NEW ARRIVALS</h2>
        
//         <div className="products-grid">
//           {newArrivals.map((product) => (
//             <Link 
//               to={`/product/${product.id}`} 
//               key={product.id} 
//               className="product-item"
//             >

//               // image/pic
//               <div className="product-img">
//                 <img 
//                   src={product.image || '/placeholder.png'} 
//                   alt={product.name}
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src = '/placeholder.png';
//                   }}
//                 />
//               </div>

//               // info
              
//               <div className="product-details">
//                 <p className="product-title">{product.name}</p>
//                 <p className="product-cost">€{product.price.toFixed(2)}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       // top selling

//       <section className="content-section">
//         <h2 className="section-heading">TOP SELLING</h2>
        
//         <div className="products-grid">
//           {topSelling.map((product) => (
//             <Link 
//               to={`/product/${product.id}`} 
//               key={product.id} 
//               className="product-item"
//             >
//               <div className="product-img">
//                 <img 
//                   src={product.image || '/placeholder.png'} 
//                   alt={product.name}
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src = '/placeholder.png';
//                   }}
//                 />
//               </div>
              
//               <div className="product-details">
//                 <p className="product-title">{product.name}</p>
//                 <p className="product-cost">€{product.price.toFixed(2)}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       //browse by style

//       <section className="content-section">
//         <h2 className="section-heading">BROWSE BY STYLE</h2>
        
//         <div className="categories-grid">
//           {categories.map((category) => (
//             <Link 
//               to="/categories" 
//               key={category.id} 
//               className="category-box"
//             >
//               //background image

//               <div className="category-bg">
//                 <img 
//                   src={category.image || '/placeholder.png'} 
//                   alt={category.name}
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src = '/placeholder.png';
//                   }}
//                 />
//               </div>
              
//               //text over image
//               <div className="category-info">
//                 <span className="category-emoji">{getCategoryIcon(category.name)}</span>
//                 <h3 className="category-label">{category.name}</h3>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>

//     </div>
//   );
// };

// export default HomePage;