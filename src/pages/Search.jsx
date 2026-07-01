import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import tmdbApi from '../api/axios';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../utils/translations';
import SearchBar from '../components/SearchBar/SearchBar';
import MovieGrid from '../components/MovieGrid/MovieGrid';
import Loader from '../components/Loader/Loader';
import './Search.scss';

const Search = () => {
  const { apiLanguage, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const genreParam = searchParams.get('genre') || '';

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(queryParam);
  const [selectedGenre, setSelectedGenre] = useState(genreParam);

  useEffect(() => {
    tmdbApi
      .get('/genre/movie/list', { params: { language: apiLanguage } })
      .then((res) => setGenres(res.data.genres))
      .catch(console.error);
  }, [apiLanguage]);

  const searchMovies = useCallback(
    async (searchQuery, genreId) => {
      setLoading(true);
      try {
        let results = [];

        if (searchQuery.trim()) {
          const res = await tmdbApi.get('/search/movie', {
            params: { query: searchQuery, language: apiLanguage },
          });
          results = res.data.results;
        } else if (genreId) {
          const res = await tmdbApi.get('/discover/movie', {
            params: {
              with_genres: genreId,
              language: apiLanguage,
              sort_by: 'popularity.desc',
            },
          });
          results = res.data.results;
        }

        if (genreId && searchQuery.trim()) {
          results = results.filter((m) =>
            m.genre_ids?.includes(Number(genreId))
          );
        }

        setMovies(results);
      } catch (err) {
        console.error(err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    },
    [apiLanguage]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      searchMovies(query, selectedGenre);
      const params = {};
      if (query) params.q = query;
      if (selectedGenre) params.genre = selectedGenre;
      setSearchParams(params);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, selectedGenre, searchMovies, setSearchParams]);

  useEffect(() => {
    setQuery(queryParam);
    setSelectedGenre(genreParam);
  }, [queryParam, genreParam]);

  return (
    <motion.div
      className="page search-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="container">
        <h1 className="search-page__title">{t(language, 'searchResults')}</h1>
        <SearchBar onSearch={setQuery} initialQuery={query} />

        <div className="search-page__filters">
          <label>{t(language, 'filterByGenre')}</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">{t(language, 'allGenres')}</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {!loading && movies.length > 0 && (
          <p className="search-page__count">
            {movies.length} {t(language, 'moviesFound')}
          </p>
        )}

        {loading ? (
          <Loader variant="skeleton" />
        ) : movies.length > 0 ? (
          <MovieGrid movies={movies} />
        ) : (
          query && (
            <p className="search-page__empty">{t(language, 'noResults')}</p>
          )
        )}
      </div>
    </motion.div>
  );
};

export default Search;
