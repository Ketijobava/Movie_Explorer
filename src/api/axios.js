import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const IMAGE_BASE = 'https://image.tmdb.org/t/p';
export const POSTER_SIZE = 'w500';
export const BACKDROP_SIZE = 'w1280';
export const PROFILE_SIZE = 'w185';

export const getImageUrl = (path, size = POSTER_SIZE) =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

export default tmdbApi;
