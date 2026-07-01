import { Link } from 'react-router-dom';
import { FaFilm } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../utils/translations';
import './Footer.scss';

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <FaFilm className="footer__icon" />
          <span>Movie<span className="accent">Explorer</span></span>
        </div>
        <nav className="footer__links">
          <Link to="/">{t(language, 'home')}</Link>
          <Link to="/search">{t(language, 'search')}</Link>
          <Link to="/favorites">{t(language, 'favorites')}</Link>
          <Link to="/about">{t(language, 'about')}</Link>
        </nav>
        <p className="footer__credit">{t(language, 'poweredBy')}</p>
      </div>
    </footer>
  );
};

export default Footer;
