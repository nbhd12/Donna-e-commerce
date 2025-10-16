import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { productAPI, orderAPI } from '../services/api';
import { Product } from '../types';
import './Cart.css';

interface CartItem {
  product: Product;
  quantity: number;
  color?: string; 
}

const Cart: React.FC = () => {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0); 
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // load card
  useEffect(() => {
    // save card at navigation
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // save card
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  //calculations:
  
  // Subtotal 
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);

  // discount 
  const discountAmount = (subtotal * discount) / 100;

  // delivery fixed price
  const deliveryFee = 15;

  // Total final
  const total = subtotal - discountAmount + deliveryFee;

  //functions
  //increase quantity
  const increaseQuantity = (productId: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.product.id === productId) {
        // stock verification
        if (item.quantity < item.product.stock) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          alert('Estoque máximo atingido!');
          return item;
        }
      }
      return item;
    });
    saveCart(updatedCart);
  };

  // quantity remove
  const decreaseQuantity = (productId: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.product.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    saveCart(updatedCart);
  };

  // remove item
  const removeItem = (productId: number) => {
    if (window.confirm('Remover este item do carrinho?')) {
      const updatedCart = cartItems.filter(
        item => item.product.id !== productId
      );
      saveCart(updatedCart);
    }
  };

  // apply codepromo
  
  const applyPromoCode = () => {
    // Codepromo
    const promoCodes: { [key: string]: number } = {
      'SAVE20': 20,  
      'SAVE10': 10,  
      'WELCOME': 15  
    };

    const code = promoCode.toUpperCase();
    
    if (promoCodes[code]) {
      setDiscount(promoCodes[code]);
      alert(`Code applied ! ${promoCodes[code]}% discount`);
    } else {
      alert('Invalid code');
      setDiscount(0);
    }
  };

  //finnish order

  const handlePlaceOrder = async () => {
    // to see if we have login
    if (!isAuthenticated) {
      alert('You need to login to finnish order');
      navigate('/login');
      return;
    }

    // to see if we have itens
    if (cartItems.length === 0) {
      alert('Your card is empty');
      return;
    }

    try {
      setLoading(true);

      // Create a order for each product
      
      for (const item of cartItems) {
        await orderAPI.create(item.product.id!, item.quantity);
      }

      // empty card
      localStorage.removeItem('cart');
      setCartItems([]);

      alert('Order confirmed !');
      navigate('/orders');

    } catch (error: any) {
      alert(error.message || 'Error to create product');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="cart-page">
      <div className="cart-container">
        

        <div className="cart-left">
          <h1 className="cart-title">YOUR CART</h1>

          {cartItems.length === 0 ? (
            // Empty card
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button 
                onClick={() => navigate('/')}
                className="btn-continue-shopping"
              >
                Continue buying
              </button>
            </div>
          ) : (
            // product list
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.product.id} className="cart-item">
                  
// product pic
                  <div className="cart-item-image">
                    <img 
                      src={item.product.image || '/placeholder.png'} 
                      alt={item.product.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.png';
                      }}
                    />
                  </div>

//product information
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <div>
                        <h3 className="cart-item-name">{item.product.name}</h3>
                        {item.color && (
                          <p className="cart-item-color">Color: {item.color}</p>
                        )}
                      </div>
                      

                      <button 
                        onClick={() => removeItem(item.product.id!)}
                        className="btn-remove"
                        title="Remover item"
                      >
                        Remove item
                      </button>
                    </div>

// price and control
                    <div className="cart-item-footer">
                      <p className="cart-item-price">
                        €{item.product.price.toFixed(2)}
                      </p>
// quantity control
                      <div className="quantity-control">
                        <button 
                          onClick={() => decreaseQuantity(item.product.id!)}
                          className="qty-btn"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button 
                          onClick={() => increaseQuantity(item.product.id!)}
                          className="qty-btn"
                          disabled={item.quantity >= item.product.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

//order summary
        <div className="cart-right">
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>

 //subtotal
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">€{subtotal.toFixed(2)}</span>
            </div>
//discount
            {discount > 0 && (
              <div className="summary-row discount-row">
                <span className="summary-label">Discount (-{discount}%)</span>
                <span className="summary-value discount">
                  -€{discountAmount.toFixed(2)}
                </span>
              </div>
            )}
//delivery

            <div className="summary-row">
              <span className="summary-label">Delivery Fee</span>
              <span className="summary-value">€{deliveryFee.toFixed(2)}</span>
            </div>

            <div className="summary-divider"></div>

 //total
            <div className="summary-row total-row">
              <span className="summary-label">Total</span>
              <span className="summary-value total">€{total.toFixed(2)}</span>
            </div>

//field for codepromo

            <div className="promo-code-section">
              <div className="promo-input-wrapper">
                <span className="promo-icon">🏷️</span>
                <input 
                  type="text"
                  placeholder="Add promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                />
              </div>
              <button 
                onClick={applyPromoCode}
                className="btn-apply"
                disabled={!promoCode}
              >
                Apply
              </button>
            </div>

      //button
            <button 
              onClick={handlePlaceOrder}
              className="btn-place-order"
              disabled={loading || cartItems.length === 0}
            >
              {loading ? 'Processando...' : 'Place Order →'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;