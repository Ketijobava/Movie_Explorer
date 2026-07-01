import { motion } from 'framer-motion';
import { FaBookmark } from 'react-icons/fa';
import { useGlobal } from '../context/GlobalContext';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../utils/translations';
import MovieGrid from '../components/MovieGrid/MovieGrid';

const Watchlist = () => {
  const { watchlist } = useGlobal();
  const { language } = useLanguage();

  return (
    <motion.div
      className="page container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="section-title">{t(language, 'watchlist')}</h1>
      {watchlist.length > 0 ? (
        <MovieGrid movies={watchlist} />
      ) : (
        <div className="empty-state">
          <FaBookmark />
          <h2>{t(language, 'emptyWatchlist')}</h2>
        </div>
      )}
    </motion.div>
  );
};

export default Watchlist;
