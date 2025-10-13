
 import "./Footer.css"

export function Newsletter() {
  return (
    <section className="newsletter">
      <h3>Stay up to date about our latest offers</h3>
      <div className="subscribe">
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe to Newsletter</button>
      </div>
    </section>
  );
}


export function Footer() {
  return (
    <footer className="footer">
      <div className="social">
        <p>Follow us:</p>
        <div className="icons">
          <img src="/facebook.svg" alt="Facebook" />
          <img src="/instagram.svg" alt="Instagram" />
          <img src="/twitter.svg" alt="Twitter" />
        </div>
      </div>

      <div className="footer-links">
        <div>
          <h4>Company</h4>
          <p>About</p>
          <p>Careers</p>
        </div>
        <div>
          <h4>Help</h4>
          <p>Contact Us</p>
          <p>Shipping</p>
        </div>
        <div>
          <h4>FAQ</h4>
          <p>Returns</p>
          <p>Order Status</p>
        </div>
        <div>
          <h4>Resources</h4>
          <p>Blog</p>
          <p>Affiliate</p>
        </div>
      </div>

      <div className="payments">
        <img src="/visa.svg" alt="Visa" />
        <img src="/paypal.svg" alt="PayPal" />
        <img src="/applepay.svg" alt="Apple Pay" />
      </div>
    </footer>
  );
}
