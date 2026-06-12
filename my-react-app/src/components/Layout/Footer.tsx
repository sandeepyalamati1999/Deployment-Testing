import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">© {year} MyApp. All rights reserved.</p>
        <nav className="footer__links" aria-label="Footer navigation">
          <a href="#" className="footer__link">Privacy Policy</a>
          <a href="#" className="footer__link">Terms of Service</a>
          <a href="#" className="footer__link">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
