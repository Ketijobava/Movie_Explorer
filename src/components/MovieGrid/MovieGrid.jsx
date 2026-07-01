import MovieCard from '../MovieCard/MovieCard';
import './MovieGrid.scss';

const MovieGrid = ({ movies }) => {
  if (!movies?.length) return null;

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
