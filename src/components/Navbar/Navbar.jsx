import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
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
import useMediaQuery from '../../hooks/useMediaQuery';
import './Navbar.scss';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isCompactNav = useMediaQuery('(max-width: 1023px)');
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: t(language, 'home'), end: true },
    { to: '/search', label: t(language, 'search') },
    { to: '/favorites', label: t(language, 'favorites') },
    { to: '/watchlist', label: t(language, 'watchlist') },
    { to: '/about', label: t(language, 'about') },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src="/Movie.svg" alt="Movie Explorer" className="navbar__logo-icon" />
          <span>Movie<span className="accent">Explorer</span></span>
        </Link>

        <ul className="navbar__links">
          {navLinks.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar__controls">
          <button
            className="navbar__control-btn"
            onClick={toggleLanguage}
            title={t(language, 'language')}
            type="button"
          >
            {language.toUpperCase()}
          </button>
          <button
            className="navbar__control-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? t(language, 'lightMode') : t(language, 'darkMode')}
            type="button"
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          {isCompactNav && (
            <button
              className="navbar__menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              type="button"
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
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
