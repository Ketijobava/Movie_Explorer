import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useLanguage } from '../../context/useLanguage';
import { t } from '../../utils/translations';
import './SearchBar.scss';

const SearchBar = ({ onSearch, initialQuery = '' }) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <FaSearch className="search-bar__icon" />
      <input
        type="text"
        className="search-bar__input"
        placeholder={t(language, 'searchPlaceholder')}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (onSearch) onSearch(e.target.value);
        }}
      />
    </form>
  );
};

export default SearchBar;
