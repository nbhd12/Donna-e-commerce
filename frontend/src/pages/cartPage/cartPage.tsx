import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { cartState } from '../../types/cart';
import { cartApi } from '../../services/cartApi';
import './Cart.css';

const Cart: React.FC = () => {
  const [cart, setCart] = useState<cartState>({
    items: [],
    totalQuantity: 0,
    subTotal: 0,
  });
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // load cart when component mounts
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const cartData = await cartApi.getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  // calculations
  const subtotal = cart.subTotal;
  const discountAmount = (subtotal * discount) / 100;
  const deliveryFee = 15;
  const total = subtotal - discountAmount + deliveryFee;

  // increase quantity
  const increaseQuantity = async (productId: number) => {
    const item = cart.items.find(i => i.productId === productId);
    if (!item) return;

    try {
      const updatedCart = await cartApi.updateQuantity(productId, item.quantity + 1);
      setCart(updatedCart);
    } catch (error) {
      alert('Error updating quantity');
    }
  };

  // decrease quantity
  const decreaseQuantity = async (productId: number) => {
    const item = cart.items.find(i => i.productId === productId);
    if (!item || item.quantity <= 1) return;

    try {
      const updatedCart = await cartApi.updateQuantity(productId, item.quantity - 1);
      setCart(updatedCart);
    } catch (error) {
      alert('Error updating quantity');
    }
  };

  // remove item
  const removeItem = async (productId: number) => {
    if (window.confirm('Remove this item?')) {
      try {
        const updatedCart = await cartApi.removeFromCart(productId);
        setCart(updatedCart);
      } catch (error) {
        alert('Error removing item');
      }
    }
  };

  // apply promo code
  const applyPromoCode = () => {
    const promoCodes: { [key: string]: number } = {
      'SAVE20': 20,
      'SAVE10': 10,
      'WELCOME': 15,
    };

    const code = promoCode.toUpperCase();

    if (promoCodes[code]) {
      setDiscount(promoCodes[code]);
      alert(`Code applied! ${promoCodes[code]}% discount`);
    } else {
      alert('Invalid code');
      setDiscount(0);
    }
  };

  // place order
  const handlePlaceOrder = async () => {
    if (cart.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    try {
      setLoading(true);
      // order creation logic will be implemented later
      alert('Order confirmed!');
      navigate('/orders');
    } catch (error) {
      alert('Error creating order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-left">
          <h1 className="cart-title">YOUR CART</h1>

          {cart.items.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button
                onClick={() => navigate('/')}
                className="btn-continue-shopping"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.items.map((item) => (
                <div key={item.productId} className="cart-item">
                  
                  <div className="cart-item-image">
                    <img
                      src={item.photo || '/placeholder.png'}
                      alt={item.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.png';
                      }}
                    />
                  </div>

                  
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <div>
                        <h3 className="cart-item-name">{item.name}</h3>
                        <p className="cart-item-description">{item.description}</p>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="btn-remove"
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>

                    
                    <div className="cart-item-footer">
                      <p className="cart-item-price">
                        €{item.price.toFixed(2)}
                      </p>

                      
                      <div className="quantity-control">
                        <button
                          onClick={() => decreaseQuantity(item.productId)}
                          className="qty-btn"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.productId)}
                          className="qty-btn"
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

        
        <div className="cart-right">
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>

            
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">€{subtotal.toFixed(2)}</span>
            </div>

            
            {discount > 0 && (
              <div className="summary-row discount-row">
                <span className="summary-label">Discount (-{discount}%)</span>
                <span className="summary-value discount">
                  -€{discountAmount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="summary-row">
              <span className="summary-label">Delivery Fee</span>
              <span className="summary-value">€{deliveryFee.toFixed(2)}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span className="summary-label">Total</span>
              <span className="summary-value total">€{total.toFixed(2)}</span>
            </div>

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

            
            <button
              onClick={handlePlaceOrder}
              className="btn-place-order"
              disabled={loading || cart.items.length === 0}
            >
              {loading ? 'Processing...' : 'Place Order →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;