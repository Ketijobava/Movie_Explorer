import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaPlay } from 'react-icons/fa';
import { getImageUrl, BACKDROP_SIZE } from '../../api/axios';
import { useLanguage } from '../../context/useLanguage';
import { t } from '../../utils/translations';
import { formatRating } from '../../utils/helpers';
import './Hero.scss';

const Hero = ({ movie }) => {
  const { language } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [movie?.id]);

  if (!movie) return null;

  const backdropUrl = getImageUrl(movie.backdrop_path, BACKDROP_SIZE);

  return (
    <section className="hero">
      {backdropUrl && (
        <img
          src={backdropUrl}
          alt=""
          className={`hero__backdrop ${loaded ? 'loaded' : ''}`}
          onLoad={() => setLoaded(true)}
        />
      )}
      <div className="hero__overlay" />
      <motion.div
        className="container hero__content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="hero__badge">{t(language, 'trending')}</span>
        <h1 className="hero__title">{movie.title}</h1>
        <p className="hero__overview">{movie.overview}</p>
        <div className="hero__meta">
          <span className="hero__rating">
            <FaStar /> {formatRating(movie.vote_average)}
          </span>
          {movie.release_date && (
            <span>{new Date(movie.release_date).getFullYear()}</span>
          )}
        </div>
        <div className="hero__actions">
          <Link to={`/movie/${movie.id}`} className="btn btn--primary">
            <FaPlay /> {t(language, 'heroWatch')}
          </Link>
          <Link to={`/movie/${movie.id}`} className="btn btn--outline">
            {t(language, 'heroMore')}
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
