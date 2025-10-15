import "./Footer.css";
import instagram from "../../assets/instagram.svg";
// import twitter from "../../assets/icons/twitter.svg";
// import facebook from "../../assets/icons/facebook.svg";
// import youtube from "../../assets/icons/youtube.svg";
// import visa from "../../assets/visa.png";
// import paypal from "../../assets/paypal.png";
// import mastercard from "../../assets/mastercard.png";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <h2 className="footer-title">DONNA</h2>
          <p className="footer-text">
            We have bags that suit your style and which you’re proud to wear.
            From women to women.
          </p>

          <div className="social-icons">
            <a href="#"><img src={instagram} alt="Instagram" /></a>
            {/* <a href="#"><img src={twitter} alt="Twitter" /></a> */}
            {/* <a href="#"><img src={facebook} alt="Facebook" /></a> */}
            {/* <a href="#"><img src={youtube} alt="YouTube" /></a> */}
          </div>
        </div>

        <div className="footer-right">
          <ul className="footer-menu">
            <li><a href="#">Company</a></li>
            <li><a href="#">Help</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Resources</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 DONNA. All rights reserved.</p>
        <div className="payment-icons">
          {/* <img src={visa} alt="Visa" /> */}
          {/* <img src={paypal} alt="PayPal" /> */}
          {/* <img src={mastercard} alt="Mastercard" /> */}
        </div>
      </div>
    </footer>
  );
}
