import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import tmdbApi from '../api/axios';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../utils/translations';
import Hero from '../components/Hero/Hero';
import MovieGrid from '../components/MovieGrid/MovieGrid';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import './Home.scss';

const Home = () => {
  const { apiLanguage, language } = useLanguage();
  const [sections, setSections] = useState({});
  const [heroMovie, setHeroMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [trending, popular, topRated, nowPlaying, upcoming] =
        await Promise.all([
          tmdbApi.get('/trending/movie/week', { params: { language: apiLanguage } }),
          tmdbApi.get('/movie/popular', { params: { language: apiLanguage } }),
          tmdbApi.get('/movie/top_rated', { params: { language: apiLanguage } }),
          tmdbApi.get('/movie/now_playing', { params: { language: apiLanguage } }),
          tmdbApi.get('/movie/upcoming', { params: { language: apiLanguage } }),
        ]);

      setHeroMovie(trending.data.results[0]);
      setSections({
        trending: trending.data.results.slice(1),
        popular: popular.data.results,
        topRated: topRated.data.results,
        nowPlaying: nowPlaying.data.results,
        upcoming: upcoming.data.results,
      });
    } catch (err) {
      console.error('Failed to fetch movies:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [apiLanguage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sectionConfig = [
    { key: 'trending', label: 'trending' },
    { key: 'popular', label: 'popular' },
    { key: 'topRated', label: 'topRated' },
    { key: 'nowPlaying', label: 'nowPlaying' },
    { key: 'upcoming', label: 'upcoming' },
  ];

  if (loading) {
    return (
      <div className="page">
        <Loader variant="skeleton" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <ErrorMessage
          message={t(language, 'errorLoading')}
          onRetry={fetchData}
          retryLabel={t(language, 'retry')}
        />
      </div>
    );
  }

  return (
    <div className="home">
      <Hero movie={heroMovie} />
      <div className="container home__sections">
        {sectionConfig.map(({ key, label }, index) => (
          <motion.section
            key={key}
            className="home__section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h2 className="section-title">{t(language, label)}</h2>
            <MovieGrid movies={sections[key]} />
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default Home;
