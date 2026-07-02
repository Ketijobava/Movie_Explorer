import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { useGlobal } from '../context/useGlobal';
import { useLanguage } from '../context/useLanguage';
import { t } from '../utils/translations';
import MovieGrid from '../components/MovieGrid/MovieGrid';

const Favorites = () => {
  const { favorites } = useGlobal();
  const { language } = useLanguage();

  return (
    <motion.div
      className="page container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="section-title">{t(language, 'favorites')}</h1>
      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} />
      ) : (
        <div className="empty-state">
          <FaHeart />
          <h2>{t(language, 'emptyFavorites')}</h2>
        </div>
      )}
    </motion.div>
  );
};

export default Favorites;
