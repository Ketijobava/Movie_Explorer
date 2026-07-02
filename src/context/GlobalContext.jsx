import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { GlobalContext } from './GlobalContextObject';
import { useLanguage } from './useLanguage';
import { t } from '../utils/translations';

const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const GlobalProvider = ({ children }) => {
  const { language } = useLanguage();
  const [favorites, setFavorites] = useState(() => loadFromStorage('favorites'));
  const [watchlist, setWatchlist] = useState(() => loadFromStorage('watchlist'));

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const isFavorite = (id) => favorites.some((m) => m.id === id);
  const isInWatchlist = (id) => watchlist.some((m) => m.id === id);

  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      setFavorites((prev) => prev.filter((m) => m.id !== movie.id));
      toast.success(t(language, 'removeFavorite'));
    } else {
      setFavorites((prev) => [...prev, movie]);
      toast.success(t(language, 'addFavorite'));
    }
  };

  const toggleWatchlist = (movie) => {
    if (isInWatchlist(movie.id)) {
      setWatchlist((prev) => prev.filter((m) => m.id !== movie.id));
      toast.success(t(language, 'removeWatchlist'));
    } else {
      setWatchlist((prev) => [...prev, movie]);
      toast.success(t(language, 'addWatchlist'));
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        favorites,
        watchlist,
        isFavorite,
        isInWatchlist,
        toggleFavorite,
        toggleWatchlist,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
