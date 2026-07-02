import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import tmdbApi from '../api/axios';
import { useLanguage } from '../context/useLanguage';
import { t } from '../utils/translations';
import useDebounce from '../hooks/useDebounce';
import SearchBar from '../components/SearchBar/SearchBar';
import MovieGrid from '../components/MovieGrid/MovieGrid';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import './Search.scss';

const Search = () => {
  const { apiLanguage, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const genreParam = searchParams.get('genre') || '';

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState(queryParam);
  const [selectedGenre, setSelectedGenre] = useState(genreParam);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    tmdbApi
      .get('/genre/movie/list', { params: { language: apiLanguage } })
      .then((res) => setGenres(res.data.genres))
      .catch(console.error);
  }, [apiLanguage]);

  const searchMovies = useCallback(
    async (searchQuery, genreId) => {
      setLoading(true);
      setError(false);
      try {
        let results = [];

        if (searchQuery.trim()) {
          const res = await tmdbApi.get('/search/movie', {
            params: { query: searchQuery, language: apiLanguage },
          });
          results = res.data.results;
          sessionStorage.setItem('lastSearch', searchQuery.trim());
        } else if (genreId) {
          const res = await tmdbApi.get('/discover/movie', {
            params: {
              with_genres: genreId,
              language: apiLanguage,
              sort_by: 'popularity.desc',
            },
          });
          results = res.data.results;
        } else {
          const res = await tmdbApi.get('/movie/popular', {
            params: { language: apiLanguage },
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
        setError(true);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    },
    [apiLanguage]
  );

  useEffect(() => {
    searchMovies(debouncedQuery, selectedGenre);
    const params = {};
    if (debouncedQuery) params.q = debouncedQuery;
    if (selectedGenre) params.genre = selectedGenre;
    setSearchParams(params, { replace: true });
  }, [debouncedQuery, selectedGenre, searchMovies, setSearchParams]);

  useEffect(() => {
    setQuery(queryParam);
    setSelectedGenre(genreParam);
  }, [queryParam, genreParam]);

  const hasActiveFilter = debouncedQuery.trim() || selectedGenre;
  const showEmpty = !loading && !error && movies.length === 0 && hasActiveFilter;

  return (
    <div className="page search-page">
      <div className="container">
        <h1 className="search-page__title">{t(language, 'searchResults')}</h1>
        <SearchBar onSearch={setQuery} initialQuery={query} />

        <div className="search-page__filters">
          <label htmlFor="genre-filter">{t(language, 'filterByGenre')}</label>
          <select
            id="genre-filter"
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

        {!loading && !error && movies.length > 0 && (
          <p className="search-page__count">
            {movies.length} {t(language, 'moviesFound')}
          </p>
        )}

        {!hasActiveFilter && !loading && !error && (
          <p className="search-page__hint">{t(language, 'searchHint')}</p>
        )}

        {loading ? (
          <Loader variant="skeleton" />
        ) : error ? (
          <ErrorMessage
            message={t(language, 'errorLoading')}
            onRetry={() => searchMovies(debouncedQuery, selectedGenre)}
            retryLabel={t(language, 'retry')}
          />
        ) : movies.length > 0 ? (
          <>
            {!hasActiveFilter && (
              <h2 className="section-title">{t(language, 'browsePopular')}</h2>
            )}
            <MovieGrid movies={movies} />
          </>
        ) : showEmpty ? (
          <p className="search-page__empty">{t(language, 'noResults')}</p>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
