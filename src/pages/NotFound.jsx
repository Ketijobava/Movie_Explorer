import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFilm } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../utils/translations';
import './NotFound.scss';

const NotFound = () => {
  const { language } = useLanguage();

  return (
    <motion.div
      className="page not-found"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <FaFilm className="not-found__icon" />
      <h1>404</h1>
      <h2>{t(language, 'notFound')}</h2>
      <p>{t(language, 'notFoundText')}</p>
      <Link to="/" className="btn btn--primary">
        {t(language, 'goHome')}
      </Link>
    </motion.div>
  );
};

export default NotFound;
