import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaBookmark } from 'react-icons/fa';
import { getImageUrl } from '../../api/axios';
import { useGlobal } from '../../context/useGlobal';
import { formatRating } from '../../utils/helpers';
import './MovieCard.scss';

const MovieCard = ({ movie }) => {
  const { isFavorite, isInWatchlist, toggleFavorite, toggleWatchlist } =
    useGlobal();

  const posterUrl =
    getImageUrl(movie.poster_path) ||
    'https://via.placeholder.com/500x750/1a1a1a/666?text=No+Image';

  return (
    <motion.div
      className="movie-card"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link to={`/movie/${movie.id}`} className="movie-card__link">
        <div className="movie-card__poster">
          <img src={posterUrl} alt={movie.title} loading="lazy" />
          <div className="movie-card__overlay">
            <span className="movie-card__rating">
              <FaStar /> {formatRating(movie.vote_average)}
            </span>
          </div>
        </div>
        <h3 className="movie-card__title">{movie.title}</h3>
      </Link>
      <div className="movie-card__actions">
        <button
          className={`movie-card__action ${isFavorite(movie.id) ? 'active' : ''}`}
          onClick={() => toggleFavorite(movie)}
          aria-label="Toggle favorite"
        >
          <FaHeart />
        </button>
        <button
          className={`movie-card__action ${isInWatchlist(movie.id) ? 'active' : ''}`}
          onClick={() => toggleWatchlist(movie)}
          aria-label="Toggle watchlist"
        >
          <FaBookmark />
        </button>
      </div>
    </motion.div>
  );
};

export default MovieCard;
