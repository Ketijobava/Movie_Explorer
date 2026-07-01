import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaStar,
  FaHeart,
  FaBookmark,
  FaPlay,
  FaClock,
  FaCalendar,
} from 'react-icons/fa';
import tmdbApi, { getImageUrl, BACKDROP_SIZE, PROFILE_SIZE } from '../api/axios';
import { useLanguage } from '../context/LanguageContext';
import { useGlobal } from '../context/GlobalContext';
import { t } from '../utils/translations';
import { formatRuntime, formatDate, formatRating } from '../utils/helpers';
import Modal from '../components/Modal/Modal';
import MovieGrid from '../components/MovieGrid/MovieGrid';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import './MovieDetails.scss';

const MovieDetails = () => {
  const { id } = useParams();
  const { apiLanguage, language } = useLanguage();
  const { isFavorite, isInWatchlist, toggleFavorite, toggleWatchlist } =
    useGlobal();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchMovie = async () => {
    setLoading(true);
    setError(false);
    setNotFound(false);
    try {
      const [details, credits, similarRes, videos] = await Promise.all([
        tmdbApi.get(`/movie/${id}`, { params: { language: apiLanguage } }),
        tmdbApi.get(`/movie/${id}/credits`),
        tmdbApi.get(`/movie/${id}/similar`, {
          params: { language: apiLanguage },
        }),
        tmdbApi.get(`/movie/${id}/videos`, {
          params: { language: apiLanguage },
        }),
      ]);

      if (!details.data?.id) {
        setNotFound(true);
        return;
      }

      setMovie(details.data);
      setCast(credits.data.cast.slice(0, 10));
      setSimilar(similarRes.data.results.slice(0, 10));

      const ytTrailer = videos.data.results.find(
        (v) => v.site === 'YouTube' && v.type === 'Trailer'
      );
      setTrailer(ytTrailer?.key || null);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 404) {
        setNotFound(true);
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
    window.scrollTo(0, 0);
  }, [id, apiLanguage]);

  if (loading) {
    return (
      <div className="page">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <ErrorMessage
          message={t(language, 'errorLoading')}
          onRetry={fetchMovie}
          retryLabel={t(language, 'retry')}
        />
      </div>
    );
  }

  if (notFound || !movie) {
    return (
      <div className="page container empty-state">
        <h2>{t(language, 'movieNotFound')}</h2>
        <Link to="/" className="btn btn--primary">
          {t(language, 'goHome')}
        </Link>
      </div>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, BACKDROP_SIZE);
  const posterUrl =
    getImageUrl(movie.poster_path) ||
    'https://via.placeholder.com/500x750/1a1a1a/666?text=No+Image';

  return (
    <div className="movie-details">
      <div
        className="movie-details__backdrop"
        style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : {}}
      >
        <div className="movie-details__backdrop-overlay" />
      </div>

      <div className="container movie-details__content">
        <div className="movie-details__main">
          <motion.img
            src={posterUrl}
            alt={movie.title}
            className="movie-details__poster"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />

          <div className="movie-details__info">
            <h1>{movie.title}</h1>
            {movie.tagline && (
              <p className="movie-details__tagline">{movie.tagline}</p>
            )}

            <div className="movie-details__meta">
              <span>
                <FaStar className="star" /> {formatRating(movie.vote_average)}
              </span>
              <span>
                <FaCalendar /> {formatDate(movie.release_date, language)}
              </span>
              <span>
                <FaClock /> {formatRuntime(movie.runtime, language)}
              </span>
            </div>

            {movie.genres?.length > 0 && (
              <div className="movie-details__genres">
                {movie.genres.map((g) => (
                  <span key={g.id} className="genre-tag">
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <p className="movie-details__overview">{movie.overview}</p>

            <div className="movie-details__actions">
              {trailer && (
                <button
                  className="btn btn--primary"
                  onClick={() => setModalOpen(true)}
                >
                  <FaPlay /> {t(language, 'watchTrailer')}
                </button>
              )}
              <button
                className={`btn btn--ghost ${isFavorite(movie.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(movie)}
              >
                <FaHeart />{' '}
                {isFavorite(movie.id)
                  ? t(language, 'removeFavorite')
                  : t(language, 'addFavorite')}
              </button>
              <button
                className={`btn btn--ghost ${isInWatchlist(movie.id) ? 'active' : ''}`}
                onClick={() => toggleWatchlist(movie)}
              >
                <FaBookmark />{' '}
                {isInWatchlist(movie.id)
                  ? t(language, 'removeWatchlist')
                  : t(language, 'addWatchlist')}
              </button>
            </div>
          </div>
        </div>

        {cast.length > 0 && (
          <section className="movie-details__cast">
            <h2 className="section-title">{t(language, 'cast')}</h2>
            <div className="cast-grid">
              {cast.map((person) => (
                <div key={person.id} className="cast-card">
                  <img
                    src={
                      getImageUrl(person.profile_path, PROFILE_SIZE) ||
                      'https://via.placeholder.com/185x278/1a1a1a/666?text=?'
                    }
                    alt={person.name}
                    loading="lazy"
                  />
                  <h4>{person.name}</h4>
                  <p>{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {similar.length > 0 && (
          <section className="movie-details__similar">
            <h2 className="section-title">{t(language, 'similar')}</h2>
            <MovieGrid movies={similar} />
          </section>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {trailer && (
          <iframe
            className="trailer-iframe"
            src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </Modal>
    </div>
  );
};

export default MovieDetails;
