import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaFilm,
  FaHeart,
  FaBookmark,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaSearch,
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../utils/translations';
import './Navbar.scss';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCompactNav, setIsCompactNav] = useState(
    () => window.matchMedia('(max-width: 1023px)').matches
  );
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: t(language, 'home'), icon: FaFilm },
    { to: '/search', label: t(language, 'search'), icon: FaSearch },
    { to: '/favorites', label: t(language, 'favorites'), icon: FaHeart },
    { to: '/watchlist', label: t(language, 'watchlist'), icon: FaBookmark },
    { to: '/about', label: t(language, 'about'), icon: null },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');

    const handleChange = (e) => {
      setIsCompactNav(e.matches);
      if (!e.matches) setMenuOpen(false);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <FaFilm className="navbar__logo-icon" />
          <span>Movie<span className="accent">Explorer</span></span>
        </Link>

        <ul className="navbar__links">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link to={to}>{label}</Link>
            </li>
          ))}
        </ul>

        <div className="navbar__controls">
          <button
            className="navbar__control-btn"
            onClick={toggleLanguage}
            title={t(language, 'language')}
          >
            {language.toUpperCase()}
          </button>
          <button
            className="navbar__control-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? t(language, 'lightMode') : t(language, 'darkMode')}
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          {isCompactNav && (
            <button
              className="navbar__menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isCompactNav && menuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <form className="navbar__mobile-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder={t(language, 'searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit"><FaSearch /></button>
            </form>
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
              >
                {Icon && <Icon />} {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
